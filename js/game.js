currencyregistry = []
producerregistry = []
upgraderegistry = []

player = {
  quarkstage : {
  },
  electronstage : {
  },
  options : {
    buyamount : new Decimal(1)
  }
}
//End UI

function formatDecimal(num){
  return notations[player.options.notation].format(num, player.options.notationdecimals, player.options.notationdecimals);
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
  player.quarkstage.upgrades.push(new Upgrade("quarkupgrade1", "Multiplier 1", -1, [new NumRequirement(player.quarkstage.producers[0],25)], [new LinearEffect(player.quarkstage.producers, 1, EffectTypes.ProducerMultiplierProduction, 1, "Quark Generators 1-10", (effect) => {return "Multiplies Quark Generators 1-10 production by " + formatDecimal(effect.value) + "(+" + formatDecimal(effect.increase) + " per level)."} )], [new ExponentialCost(player.quarkstage.quarks,100,2)]));
  player.quarkstage.upgrades.push(new Upgrade("quarkupgrade2", "Multiplier 2", -1, [new NumRequirement(player.quarkstage.producers[1],25)], [new ExponentialEffect(player.quarkstage.producers, 1.25, EffectTypes.ProducerMultiplierProduction, 1, "Quark Generators 1-10", (effect) => {return "Multiplies Quark Generators 1-10 production by " + formatDecimal(effect.value) + "(x" + formatDecimal(effect.increase) + " per level)."})], [new ExponentialCost(player.quarkstage.quarks,10000,5)]));
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

  player.quarkstage.electrify = new Prestige(player.electronstage.electrons, player.quarkstage.quarks, (amount) => {return amount}, () => {resetQuarkStage()})
}

function resetElectronStage(){
  player.electronstage.electrons.reset();
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
  produce();
  //lengthCalculator();
  calculatePerSecond(player.quarkstage.quarks);
  tickspersecactual = Math.min(1000/(((new Date()).getTime()-starttime)+1),20);
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
  loadQuarkStage();
}

function saveoptions(){
  savedata["playeroptions"] = player.options;
}

function loadoptions(){
  options = loadeddata["playeroptions"]
  if(options != undefined)
  player.options = options
  else
  player.options = settings.defaultoption;
  if(player.options.buyamount == undefined){
    player.options.buyamount = settings.defaultoptions.buyamount;
  }else{
    player.options.buyamount = Decimal.fromString(options.buyamount);
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
}, 1000/settings.tickspersecond);

function reset(){
  if(confirm("Completely Reset Save?")){
    resetQuarkStage();
    resetElectronStage();
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
