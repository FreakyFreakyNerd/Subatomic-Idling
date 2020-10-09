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

function getevery(list, stepsize, step, offset){
  var temp = [];
  list.forEach((item, i) => {
    if((i+offset)%stepsize == step){
      temp.push(item);
    }
  });
  return temp;
}

function shallowcopy(obj){
  return JSON.parse(JSON.stringify(obj));
}

setupQuarkStage();
setupElectronStage();
setupachievements();

tickspersecactual = 0

gameLogicIntervalID = 0;
ticks = 0;
function gameLogicTick(){
  starttime = new Date().getTime();
  player.stats.currentelectrifytime += 1;
  achievementtick();
  produce();
  //lengthCalculator();
  calculatePerSecond(player.quarkstage.quarks);
  updaterequiredregistry.forEach((item, i) => {
    item.tick();
  });
  tickspersecactual = Math.min(1000/(((new Date()).getTime()-starttime)+1),20);
}

function produce(){
  producerregistry.forEach(element => {
    element.produce();
  });
}

load()
recalculateCurrencyPerSec();

gameLogicIntervalID = setInterval(() => {
  gameLogicTick();
  save();
}, 1000/settings.logictickspersecond);

updateafterplayer();

function reset(){
  if(confirm("Completely Reset Save?")){
    resetQuarkStage();
    resetElectronStage();
    resetstats();
    resetachievements();
  }
}
