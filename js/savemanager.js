var savedata = {}
var loadeddata = {}

function saveplayer() {
  saveQuarkStage();
  saveoptions();
  savestats();
  saveachievements();
  savechallenges();
  savedata["lastplaytime"] = Date.now().toFixed();
}

function saveachievements() {
  var achievements = [];
  achievementregistry.forEach((achieve, i) => {
    if (achieve.unlocked) {
      achievements.push(achieve.id);
    }
  });
  savedata["achievements"] = achievements;
}

function savechallenges() {
  var challenges = {};
  player.challenges.forEach((chal, i) => {
    challenges[chal.id] = chal.save();
  });
  savedata["chal"] = challenges;
}

function loadchallenges() {
  var challenges = loadeddata["chal"]
  if (challenges == undefined)
    return;
  player.challenges.forEach((chal, i) => {
    if (challenges[chal.id] != undefined)
      chal.parse(challenges[chal.id]);
  });
}

function saveQuarkStage() {
  var data = {};
  data.currencies = {};
  data.producers = {};
  data.upgrades = {};
  currencyregistry.forEach(element => {
    data.currencies[element.id.toString()] = element.saveData;
  });
  producerregistry.forEach(element => {
    data.producers[element.id.toString()] = element.saveData;
  });
  upgraderegistry.forEach((upgrade, i) => {
    data.upgrades[upgrade.id.toString()] = upgrade.saveData;
  });

  savedata["game"] = data;
}

function loadQuarkStage() {
  var data = loadeddata["game"];
  if (data == undefined)
    return;
  if (data.currencies != undefined) {
    currencyregistry.forEach(element => {
      element.parse(data.currencies[element.id]);
    });
  }
  if (data.producers != undefined) {
    producerregistry.forEach(element => {
      element.parse(data.producers[element.id]);
    });
  }
  if (data.upgrades != undefined) {
    upgraderegistry.forEach(element => {
      element.parse(data.upgrades[element.id]);
    });
  }
}

function loadplayer() {
  loadoptions();
  loadstats();
  loadQuarkStage();
  loadachievements();
  loadchallenges();
  handleoffline();
}

function loadachievements() {
  var achievements = loadeddata["achievements"]
  if (achievements != null && achievements != undefined)
    achievementregistry.forEach((achieve, i) => {
      achieve.parse(achievements);
    });
}

function saveoptions() {
  savedata["playeroptions"] = player.options;
}

function savestats() {
  savedata["playerstats"] = player.stats;
}

function loadoptions() {
  var options = loadeddata["playeroptions"]
  player.options = shallowcopy(settings.defaultoptions);
  if (options != null && options != undefined)
    for (let [key, value] of Object.entries(options)) {
      if (key in player.options)
        player.options[key] = value;
    }
  player.options.buyamounts = settings.defaultoptions.buyamounts;
  if (options != undefined) {
    if (options.buyamounts != undefined) {
      for (let [key, value] of Object.entries(options.buyamounts)) {
        if (key in player.options.buyamounts)
          player.options.buyamounts[key] = parseInt(value);
      }
    }
  }
}

function loadstats() {
  var stats = loadeddata["playerstats"]
  player.stats = shallowcopy(settings.defaultstats);
  if (stats != null && stats != undefined)
    for (let [key, value] of Object.entries(stats)) {
      if (player.stats[key] == undefined)
        continue;
      for(let [key2, value2] of Object.entries(value)){
        if(player.stats[key][key2] != undefined)
          player.stats[key][key2] = value2
      }
    }
  for (let [key, value] of Object.entries(player.stats.times)) {
    if(value == 0)
      player.stats.times[key] = player.stats.times.game;
  }
}

//Important
function save() {
  savedata = {}
  saveplayer()
  localStorage.setItem('subatomicidlingsave', Base64.encode(JSON.stringify(savedata)))

  console.log("Saved");
}

function savetofile() {
  savedata = {};
  saveplayer();
  var text = Base64.encode(JSON.stringify(savedata));

  downloadtofile(text, getsavename(), "text/plain");
}
function loadsavefromfile(file) {
  var data = "";
  var fr = new FileReader();
  fr.onload = function () { safeload(fr.result); };
  fr.readAsText(file.files[0])
}

function getsavename() {
  return new Date().toLocaleDateString("en-US") + "_Subatomic Idling.txt"
}
const downloadtofile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

function load() {
  loadfrom64(localStorage.getItem("subatomicidlingsave"));
}

function loadfrom64(data) {
  try {
    loadeddata = JSON.parse(Base64.decode(data));
  } catch {
    console.log("Save Broken");
    loadeddata = undefined;
  }
  if (loadeddata == undefined) {
    loadeddata = {};
  }
  loadplayer();
  updateafterplayer();
}

function safeload(data) {
  var savedata = {};
  saveplayer();
  var textbackup = Base64.encode(JSON.stringify(savedata));

  try {
    resetgame();
    loadfrom64(data);
  } catch {
    console.log("Can not load save file");
    resetgame();
    loadfrom64(textbackup);
  }
}

function fixsave() {
  clearInterval(gameLogicIntervalID);
  localStorage.removeItem('subatomicidlingsave');
  window.location.reload(false);
}

function resetSettings() {
  console.log("Settings");
  openproducersscreen("quark");
  openupgradesscreen("quark");
}

async function resetsave() {
  if (await confirmtest("Completely Reset Save?")) {
    resetgame();
  }
}

function resetgame() {
  resetQuarkStage(true);
  resetElectronStage(true);
  resetnucleonstage(true);
  resetstats();
  resetachievements();
  resetchallenges(0, player.challenges.length);
  resetSettings();
}

function handleoffline() {
  if (loadeddata["lastplaytime"] != undefined && player.options.doofflineprogress) {
    var now = Date.now();
    var old = loadeddata["lastplaytime"];
    var dif = now - old;
    var time = dif / 2;
    produce(time / 1000);
  }
}
