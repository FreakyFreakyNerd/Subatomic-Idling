var currencyregistry = []
var producerregistry = []
var upgraderegistry = []
var achievementregistry = []
var prestigeregistry = []
var runningchallenges = [];
var autobuyerregistry = [];

var updaterequiredregistry = []
var effectneedsrecalculated = []

var player = {
  quarkstage : {
  },
  electronstage : {
  },
  nucleonstage : {

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

setupGame();
setupachievements();

var lastticktime = new Date().getTime();
let gameLogicIntervalID = 0;
function gameLogicTick(){
  achievementtick();
  var timenow = new Date().getTime();
  var timedif = timenow - lastticktime;
  lastticktime = timenow;
  updateeffects();
  this.updaterequiredregistry.forEach((item, i) => {
    item.tick();
  });
  produce(timedif/1000 * settings.gamespeedmodifier);
  if(Date.now() > nextaddtime)
    updatetimes();
}

function updatelogictickspersec(amount){
  settings.logictickspersecond = amount;
  clearInterval(gameLogicIntervalID);
  startgamelogictick();
}

var last = performance.now();
function gameLogic(timestamp){
  var elapsed = timestamp-last;
  last = timestamp;
  var prodratio = elapsed/1000;
  produce(prodratio);
  this.updaterequiredregistry.forEach((item, i) => {
    item.tick();
  });

  requestAnimationFrame(gameLogic);
}
//requestAnimationFrame(gameLogic);

function updateeffects(){
  this.effectneedsrecalculated.forEach(item => {
    item.updateeffects();
  });
}

function forceeffectsupdate(){
  upgraderegistry.forEach(item => {
    item.updateeffects();
  });
  producerregistry.forEach(item => {
    item.updateeffects();
  });
}

var lasttimeadded = Date.now();
var nextaddtime = Date.now() + 1000;
function updatetimes(){
  var now = Date.now();
  for(var i = 0; i < player.stats.times.length; i++){
    player.stats.times[i] += Date.now() - lasttimeadded;
  }
  lasttimeadded = now;
  nextaddtime = now + 1000;
}

function produce(prodratio){
  this.producerregistry.forEach(element => {
    element.produce(prodratio);
  });
}

load();

function startgamelogictick(){
  gameLogicIntervalID = setInterval(() => {
    gameLogicTick();
  }, 1000/settings.logictickspersecond);
}

var gameSaveIntervalID = setInterval(() => {
  save();
}, 10000);

startgamelogictick();