savedata = {}
loadeddata = {}

function saveplayer(){
  saveQuarkStage();
  saveoptions();
  savestats();
  saveachievements();
}

function saveachievements(){
  achievements = [];
  achievementregistry.forEach((achieve, i) => {
    if(achieve.unlocked){
      achievements.push(achieve.id);
    }
  });
  savedata["achievements"] = achievements;
}

function saveQuarkStage(){
  data = {};
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

function loadQuarkStage(){
  data = loadeddata["game"]
  if(data == undefined)
  return;
  if(data.currencies != undefined){
    currencyregistry.forEach(element => {
      element.parse(data.currencies[element.id]);
    });
  }
  if(data.producers != undefined){
    producerregistry.forEach(element => {
      element.parse(data.producers[element.id]);
    });
  }
  if(data.upgrades != undefined){
    upgraderegistry.forEach(element => {
      element.parse(data.upgrades[element.id]);
    });
  }
}

function loadplayer(){
  loadoptions();
  loadstats();
  loadQuarkStage();
  loadachievements();
}

function loadachievements(){
  achievements = loadeddata["achievements"]
  if(achievements != null && achievements != undefined)
    achievementregistry.forEach((achieve, i) => {
      achieve.parse(achievements);
    });
}

function saveoptions(){
  savedata["playeroptions"] = player.options;
}

function savestats(){
  savedata["playerstats"] = player.stats;
}

function loadoptions(){
  options = loadeddata["playeroptions"]
  player.options = shallowcopy(settings.defaultoptions);
  if(options != null && options != undefined)
    for(let [key,value] of Object.entries(options)){
      if(key in player.options)
        player.options[key] = value;
    }
  player.options.buyamounts = settings.defaultoptions.buyamounts;
  if(options != undefined){
    if(options.buyamounts != undefined){
      for(let [key,value] of Object.entries(options.buyamounts)){
        if(key in player.options.buyamounts)
          player.options.buyamounts[key] = Decimal.fromString(value);
      }
    }
  }
}

function loadstats(){
  stats = loadeddata["playerstats"]
  player.stats = shallowcopy(settings.defaultstats);
  if(stats != null && stats != undefined)
    for(let [key,value] of Object.entries(stats)){
      player.stats[key] = value;
    }
}

//Important
function save(){
  savedata = {}
  saveplayer()
  localStorage.setItem('subatomicidlingsave',Base64.encode(JSON.stringify(savedata)))
}

function load(){
  try{
    loadeddata = JSON.parse(Base64.decode(localStorage.getItem('subatomicidlingsave')));
  }catch{
    console.log("Save Broken");
    loadeddata = undefined;
  }
    if(loadeddata == undefined){
      loadeddata = {};
    }
    loadplayer();
    updateafterplayer();
}

function fixsave(){
  clearInterval(gameLogicIntervalID);
  localStorage.removeItem('subatomicidlingsave');
  window.location.reload(false);
}
