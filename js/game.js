currencyregistry = []
producerregistry = []
upgraderegistry = []
achievementregistry = []
updaterequiredregistry = []

player = {
  quarkstage : {
  },
  electronstage : {
  },
  options : {
    buyamount : new Decimal(1)
  },
  achievements : [],
  stats : {
  }
}
//End UI

function formatDecimal(num){
  return notations[player.options.notation].format(num, player.options.notationdecimals, 0);
}

function formatDecimalOverride(num,dec){
  return notations[player.options.notation].format(num, dec, dec);
}

function setupQuarkStage(){
  player.quarkstage.quarks = new Currency("quarks", "Quarks", "Quark", 10);
  player.quarkstage.producers = [];
  player.quarkstage.producers.push(new Producer("quarkgenone",     "Generator 1",  [new ExponentialCost(player.quarkstage.quarks, 10, 1.1)],          [new LinearProduction(player.quarkstage.quarks, .5)]));
  player.quarkstage.producers.push(new Producer("quarkgentwo",     "Generator 2",  [new ExponentialCost(player.quarkstage.quarks, 100, 1.1)],         [new LinearProduction(player.quarkstage.quarks, 1)],      [new NumRequirement(player.quarkstage.producers[0], new Decimal(10))]));
  player.quarkstage.producers.push(new Producer("quarkgenthree",   "Generator 3",  [new ExponentialCost(player.quarkstage.quarks, 1000, 1.1)],        [new LinearProduction(player.quarkstage.quarks, 2)],      [new NumRequirement(player.quarkstage.producers[1], new Decimal(10))]));
  player.quarkstage.producers.push(new Producer("quarkgenfour",    "Generator 4",  [new ExponentialCost(player.quarkstage.quarks, 10000, 1.1)],       [new LinearProduction(player.quarkstage.quarks, 10)],     [new NumRequirement(player.quarkstage.producers[2], new Decimal(10))]));
  player.quarkstage.producers.push(new Producer("quarkgenfive",    "Generator 5",  [new ExponentialCost(player.quarkstage.quarks, 100000, 1.1)],      [new LinearProduction(player.quarkstage.quarks, 50)],     [new NumRequirement(player.quarkstage.producers[3], new Decimal(10))]));
  player.quarkstage.producers.push(new Producer("quarkgensix",     "Generator 6",  [new ExponentialCost(player.quarkstage.quarks, 1000000, 1.1)],     [new LinearProduction(player.quarkstage.quarks, 100)],    [new NumRequirement(player.quarkstage.producers[4], new Decimal(10))]));
  player.quarkstage.producers.push(new Producer("quarkgenseven",   "Generator 7",  [new ExponentialCost(player.quarkstage.quarks, 10000000, 1.1)],    [new LinearProduction(player.quarkstage.quarks, 500)],    [new NumRequirement(player.quarkstage.producers[5], new Decimal(10))]));
  player.quarkstage.producers.push(new Producer("quarkgeneight",   "Generator 8",  [new ExponentialCost(player.quarkstage.quarks, 100000000, 1.1)],   [new LinearProduction(player.quarkstage.quarks, 5000)],   [new NumRequirement(player.quarkstage.producers[6], new Decimal(10))]));
  player.quarkstage.producers.push(new Producer("quarkgennine",    "Generator 9",  [new ExponentialCost(player.quarkstage.quarks, 1000000000, 1.1)],  [new LinearProduction(player.quarkstage.quarks, 25000)],  [new NumRequirement(player.quarkstage.producers[7], new Decimal(10))]));
  player.quarkstage.producers.push(new Producer("quarkgenten",     "Generator 10", [new ExponentialCost(player.quarkstage.quarks, 10000000000, 1.1)], [new LinearProduction(player.quarkstage.quarks, 100000)], [new NumRequirement(player.quarkstage.producers[8], new Decimal(10))]));

  player.quarkstage.upgrades = [];
  player.quarkstage.upgrades.push(new Upgrade("allquarkgenupgradelinearone", "Multiplier 1", -1, [new NumRequirement(player.quarkstage.producers[0],25)], [new LinearEffect(player.quarkstage.producers, 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,100,1.5)]));
  player.quarkstage.upgrades.push(new Upgrade("allquarkgenupgradelineartwo", "Multiplier 2", -1, [new NumRequirement(player.quarkstage.upgrades[0],10)], [new LinearEffect(player.quarkstage.producers, 1, 10, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e5,1.5)]));
  player.quarkstage.upgrades.push(new Upgrade("allquarkgenupgradeexponentialone", "Multiplier 3", -1, [new NumRequirement(player.quarkstage.upgrades[1],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 1.25, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e7,3)]));
  player.quarkstage.upgrades.push(new Upgrade("quarkgen1,2upgradeexponentialone", "Multiplier 4", -1, [new NumRequirement(player.quarkstage.upgrades[2],10)], [new ExponentialEffect([player.quarkstage.producers[0],player.quarkstage.producers[1]], 1, 5, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e10,10)]));
  player.quarkstage.upgrades.push(new Upgrade("quarkgen3,4upgradeexponentialone", "Multiplier 5", -1, [new NumRequirement(player.quarkstage.upgrades[3],10)], [new ExponentialEffect([player.quarkstage.producers[2],player.quarkstage.producers[3]], 1, 25, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e16,50)]));
}

function resetQuarkStage(){
  player.quarkstage.quarks.reset();
  player.quarkstage.producers.forEach((prod, i) => {
    prod.reset();
  });
  player.quarkstage.upgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
}

function setupElectronStage(){
  player.electronstage.electrons = new Currency("electrons", "Electrons", "Electron", 0);
  player.quarkstage.electrify = new Prestige(player.electronstage.electrons, player.quarkstage.quarks, (amount) => {if(amount.lessThan(new Decimal("1e12"))) return new Decimal(); if(!hasachievement("breakelectrolize")) return new Decimal(1)}, () => {resetQuarkStage(); player.stats.electrified += 1;})
  player.electronstage.upgradetree = [];

  //q -> quarks, g -> generator, e -> electron, p -> production, d -> scaling price decrease

  player.electronstage.upgradetree.push(new Upgrade("qgep1", "Twice The Speed!", 1, null, [new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators")], [new StaticCost(player.electronstage.electrons, 1)], {xpos: 0, ypos: 0, label: "x2"}));

  //Starts out at upgrade slot 1
  player.electronstage.upgradetree.push(new Upgrade("qg1ep1", "A One", -1, [new NumRequirement(player.electronstage.upgradetree[0], 1)], [new LinearEffect(player.quarkstage.producers[0], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 1")], [new LinearCost(player.electronstage.electrons, 1, 1)], {xpos: 150, ypos: -150, label: "1+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg2ep1", "A Two", -1, [new NumRequirement(player.electronstage.upgradetree[1], 1)], [new LinearEffect(player.quarkstage.producers[1], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 2")], [new LinearCost(player.electronstage.electrons, 2, 2)], {xpos: 150, ypos: -224, label: "2+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg3ep1", "A Three", -1, [new NumRequirement(player.electronstage.upgradetree[2], 1)], [new LinearEffect(player.quarkstage.producers[2], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 3")], [new LinearCost(player.electronstage.electrons, 3, 3)], {xpos: 150, ypos: -298, label: "3+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg4ep1", "A Four", -1, [new NumRequirement(player.electronstage.upgradetree[3], 1)], [new LinearEffect(player.quarkstage.producers[3], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 4")], [new LinearCost(player.electronstage.electrons, 4, 4)], {xpos: 150, ypos: -372, label: "4+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg5ep1", "A Five", -1, [new NumRequirement(player.electronstage.upgradetree[4], 1)], [new LinearEffect(player.quarkstage.producers[4], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 5")], [new LinearCost(player.electronstage.electrons, 5, 5)], {xpos: 150, ypos: -446, label: "5+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg6ep1", "A Six", -1, [new NumRequirement(player.electronstage.upgradetree[5], 1)], [new LinearEffect(player.quarkstage.producers[5], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 6")], [new LinearCost(player.electronstage.electrons, 6, 6)], {xpos: 150, ypos: -520, label: "6+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg7ep1", "A Seven", -1, [new NumRequirement(player.electronstage.upgradetree[6], 1)], [new LinearEffect(player.quarkstage.producers[6], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 7")], [new LinearCost(player.electronstage.electrons, 7, 7)], {xpos: 150, ypos: -594, label: "7+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg8ep1", "A Eight", -1, [new NumRequirement(player.electronstage.upgradetree[7], 1)], [new LinearEffect(player.quarkstage.producers[7], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 8")], [new LinearCost(player.electronstage.electrons, 8, 8)], {xpos: 150, ypos: -668, label: "8+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg9ep1", "A Nine", -1, [new NumRequirement(player.electronstage.upgradetree[8], 1)], [new LinearEffect(player.quarkstage.producers[8], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 9")], [new LinearCost(player.electronstage.electrons, 9, 9)], {xpos: 150, ypos: -742, label: "9+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg10ep1", "A Ten", -1, [new NumRequirement(player.electronstage.upgradetree[9], 1)], [new LinearEffect(player.quarkstage.producers[9], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 10")], [new LinearCost(player.electronstage.electrons, 10, 10)], {xpos: 150, ypos: -816, label: "10+"}));

  //Starts out at upgrade slot 11
  player.electronstage.upgradetree.push(new Upgrade("qg1ed", "Price Decrease 1", 1, [new NumRequirement(player.electronstage.upgradetree[0], 1)], new StaticEffect(player.quarkstage.producers[0], .9, EffectTypes.PriceScaling, "NULL", () => {return "Test"}), new StaticCost(player.electronstage.electrons, 1), {xpos: -150, ypos: -150, label: "1d"}));

  player.electronstage.upgradetree.push(new Upgrade("evenquarkgenelectronupgradeone", "EVENS?", 1, [new NumRequirement(player.electronstage.upgradetree[0], 1)], [new LinkedLinearEffect(player.quarkstage.producers, () => {return player.stats.electrified}, 1, .25, EffectTypes.ProducerMultiplierProduction, "Even Quark Generators", (obj) => {return "Multiplies even quark generators by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";})], [new StaticCost(player.electronstage.electrons, 1)], {xpos: -200, ypos: 0}));
  player.electronstage.upgradetree.push(new Upgrade("oddquarkgenelectronupgradeone", "ODDS?", 1, [new NumRequirement(player.electronstage.upgradetree[0], 1)], [new LinkedLinearEffect(player.quarkstage.producers, () => {return player.stats.electrified}, 1, .25, EffectTypes.ProducerMultiplierProduction, "Even Quark Generators", () => {return "apple";})], [new StaticCost(player.electronstage.electrons, 1)], {xpos: 100, ypos: 100}));

  player.electronstage.electronupgradelinetree = new LineTree(dumplines(player.electronstage.upgradetree, 64), "electronupgrades");
}

function resetElectronStage(){
  player.electronstage.electrons.reset();
  player.electronstage.upgradetree.forEach((upgrade, i) => {
    upgrade.reset();
  });

}

function resetstats(){
  player.stats = shallowcopy(settings.defaultstats);
}

function shallowcopy(obj){
  return JSON.parse(JSON.stringify(obj));
}

function setupachievements(){
  player.achievements.push(new Achievement("onequarkgenone", "Get A Quark Gen 1", [new NumRequirement(player.quarkstage.producers[0], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgentwo", "Get A Quark Gen 2", [new NumRequirement(player.quarkstage.producers[1], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenthree", "Get A Quark Gen 3", [new NumRequirement(player.quarkstage.producers[2], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenfour", "Get A Quark Gen 4", [new NumRequirement(player.quarkstage.producers[3], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenfive", "Get A Quark Gen 5", [new NumRequirement(player.quarkstage.producers[4], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgensix", "Get A Quark Gen 6", [new NumRequirement(player.quarkstage.producers[5], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenseven", "Get A Quark Gen 7", [new NumRequirement(player.quarkstage.producers[6], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgeneight", "Get A Quark Gen 8", [new NumRequirement(player.quarkstage.producers[7], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgennine", "Get A Quark Gen 9", [new NumRequirement(player.quarkstage.producers[8], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenten", "Get A Quark Gen 10", [new NumRequirement(player.quarkstage.producers[9], 1)], null, [new FlavorEffect("IDK a fleeting sense of accomplishment! Maybe?")], ["hiderequirements"]));
  player.achievements.push(new Achievement("electrifyunlock", "Electrify", [new NumRequirement(player.quarkstage.quarks, "1e12")], null, [new FlavorEffect("Unlocks electrify for all your wonderful electron needs!")]));
}

function resetachievements(){
  achievementregistry.forEach((achieve, i) => {
    achieve.reset();
  });

}

function getbuyamount(object){
  if(!player.options.buyamount.equals(-1))
  return player.options.buyamount;
  if(object == undefined)
  return "max"
  return object.getmaxbuyable();
}

setupQuarkStage();
setupElectronStage();
setupachievements();

function setbuyamount(num){
  player.options.buyamount = new Decimal(num);
  producerregistry.forEach((prod, i) => {
    prod.recalculatecosts();
  });

  console.log(num);
}

player.quarkstage.upgrades[0].buy();

function calculatePerSecond(currency){
  amount = new Decimal(0);
  producerregistry.forEach(element =>{
    amount = amount.add(element.getpersec(currency.id));
  });
  currency.temp.persec = amount;
}

function recalculateCurrencyPerSec(){
  currencyregistry.forEach(element =>{
    calculatePerSecond(element);
  });
}

savedata = {}
loadeddata = {}

tickspersecactual = 0

gameLogicIntervalID = 0;
ticks = 0;
function gameLogicTick(){
  starttime = new Date().getTime();
  player.stats.electrifyticks += 1;
  achievementtick();
  produce();
  //lengthCalculator();
  calculatePerSecond(player.quarkstage.quarks);
  updaterequiredregistry.forEach((item, i) => {
    item.tick();
  });
  tickspersecactual = Math.min(1000/(((new Date()).getTime()-starttime)+1),20);
}

function hasachievement(achieveid){
  var has = false
  achievementregistry.forEach((achieve, i) => {
    if(achieve.id == achieveid){
      has = achieve.unlocked;
      return;
    }
  });
  return has;
}

function achievementtick(){
  achievementregistry.forEach((achieve, i) => {
    achieve.check();
  });

}

function lengthCalculator(){
  ticks += 1;
  if(player.quarkstage.quarks.has(new Decimal("1e12"))){
    clearInterval(gameLogicIntervalID);
    console.log(ticks + " Ticks");
    console.log(ticks/20 + " Seconds");
    console.log(ticks/20/3600 + " Hours");
    console.log(ticks/20/3600/24 + " Days")
  }
}

function logTime(){
  console.log(ticks + " Ticks");
  console.log(ticks/20 + " Seconds");
  console.log(ticks/20/3600 + " Hours");
  console.log(ticks/20/3600/24 + " Days")
}

function produce(){
  producerregistry.forEach(element => {
    element.produce();
  });
}

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
  if(options != undefined){
    player.options = options
    if(player.options.buyamount == undefined){
      player.options.buyamount = settings.defaultoptions.buyamount;
    }else{
      player.options.buyamount = Decimal.fromString(options.buyamount);
    }
  }
  else
    player.options = settings.defaultoptions;
}

scrollingscale = .001;
function scalediv(event, id){
  event.preventDefault();

  element = document.getElementById(id + "content");
  translatelist = gettranslate(element);
  scalelist = getscale(element);
  scalelist[0] = Math.min(Math.max(.125, scalelist[0] + -scrollingscale * event.deltaY), 4);
  scalelist[1] = Math.min(Math.max(.125, scalelist[1] + -scrollingscale * event.deltaY), 4);

  transform = getnewtransform(scalelist, translatelist);

  element.style.transform = transform;
  element.style.webkitTransform = transform;
  element.style.msTransform = transform;
}

movingobjid = "";
movingobjx = 0;
movingobjy = 0;
function startmovingobject(event, id){
  movingobjid = id;
  movingobjx = event.x;
  movingobjy = event.y;
}
function stopmovingobject(id){
  if(movingobjid == id)
    movingobjid = "";
}

function movingobject(event, id){
  event.preventDefault();
  if(id == movingobjid){
    element = document.getElementById(id + "content");
    translatelist = gettranslate(element);
    translatelist[0] += event.x - movingobjx;
    translatelist[1] += event.y - movingobjy;
    movingobjx = event.x;
    movingobjy = event.y;
    scalelist = getscale(element);

    transform = getnewtransform(scalelist, translatelist);

    element.style.transform = transform;
    element.style.webkitTransform = transform;
    element.style.msTransform = transform;
  }
}

function getscale(element){
  var matrix = window.getComputedStyle(element).transform;
  var matrixarray = matrix.replace("matrix(", "").split(",");
  var scalex = parseFloat(matrixarray[0]);
  if(Number.isNaN(scalex))
    scalex = 1;
  var scaley = parseFloat(matrixarray[3]);
  if(Number.isNaN(scaley))
    scaley = 1;
  return [scalex, scaley];
}

function gettranslate(element){
  var matrix = window.getComputedStyle(element).transform;
  var matrixarray = matrix.replace("matrix(", "").split(",");
  var translatex = parseFloat(matrixarray[4]);
  if(Number.isNaN(translatex))
    translatex = 0;
  var translatey = parseFloat(matrixarray[5]);
  if(Number.isNaN(translatey))
    translatey = 0;
  return [translatex, translatey];
}

function getnewtransform(scalelist, translatelist){
  return `matrix(${scalelist[0]}, 0, 0, ${scalelist[1]}, ${translatelist[0]}, ${translatelist[1]})`
}

function loadstats(){
  stats = loadeddata["playerstats"]
  player.stats = shallowcopy(settings.defaultstats);
  for(let [key,value] of Object.entries(stats)){
    player.stats[key] = value;
  }
}

function save(){
  savedata = {}
  saveplayer()
  localStorage.setItem('subatomicidlingsave',JSON.stringify(savedata))
}

function load(){
  loadeddata = JSON.parse(localStorage.getItem('subatomicidlingsave'))
  if(loadeddata == undefined){
    loadeddata = {}
    console.log(loadeddata)
  }
  loadplayer()

}

load()

recalculateCurrencyPerSec();

gameLogicIntervalID = setInterval(() => {
  gameLogicTick();
  save();
  highlightOptimalQuarkBuy();
}, 1000/settings.logictickspersecond);

function reset(){
  if(confirm("Completely Reset Save?")){
    resetQuarkStage();
    resetElectronStage();
    resetstats();
    resetachievements();
  }
}

updateafterplayer();

function simticks(amount){
  count = 0
  running = true;
  time = (new Date()).getTime()
  while(running){
    count += 1
    if (count > amount){
      running = false;
      console.log("Time " + ((new Date()).getTime() - time))
    }
    gameLogicTick();
    //highlightOptimalQuarkBuy();
  }
}

function fixsave(){
  clearInterval(gameLogicIntervalID);
  localStorage.removeItem('subatomicidlingsave');
  window.location.reload(false);
}
