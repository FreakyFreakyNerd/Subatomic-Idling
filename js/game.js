currencyregistry = []
producerregistry = []
upgraderegistry = []
achievementregistry = []
prestigeregistry = []

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
  challenges : [],
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
setupchallenges();

tickspersecactual = 0

gameLogicIntervalID = 0;
ticks = 0;
function gameLogicTick(){
  starttime = new Date().getTime();
  player.stats.currentelectrifytime += 1;
  player.stats.playtime += 1;
  achievementtick();
  produce();
  //lengthCalculator();
  //calculatePerSecond(player.quarkstage.quarks);
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
}, 1000/settings.logictickspersecond);

gameSaveIntervalID = setInterval(() => {
  save();
}, 10000);

updateafterplayer();

function reset(){
  if(confirm("Completely Reset Save?")){
    resetQuarkStage();
    resetElectronStage();
    resetstats();
    resetachievements();
  }
}
