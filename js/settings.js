settings = {
    tickspersecond : 10,
    logictickspersecond : 10,
    version: "Alpha v0.01",
    defaultoptions : {
        uidelay : 50,
        notation : "standard",
        notationdecimals : 3,
        theme : "light",
        buyamounts : {quarkgen: new Decimal(1),quarkupg: new Decimal(1),spingen: new Decimal(1),eupg: new Decimal(1)}
    },
    defaultstats : {
      currentelectrifytime : 0,
      electrified : 0,
      past10electrifies : [[],[],[],[],[],[],[],[],[],[]],
      playtime: 0
    }
}

function getbuyamount(type,object){
  if(type == undefined)
    return "type Undefined"
  var buyamount = player.options.buyamounts[type];
  if(buyamount == undefined || buyamount.equals == undefined){
    player.options.buyamounts[type] = new Decimal(1);
    return new Decimal(1);
  }
  if(!buyamount.equals(-1))
    return buyamount;
  if(object == undefined)
    return "Max"
  return object.buyamount;
}

function setbuyamount(type, num){
  player.options.buyamounts[type] = new Decimal(num);
  producerregistry.forEach((prod, i) => {
    prod.recalculatecosts();
  });
  upgraderegistry.forEach((upgr, i) => {
    upgr.recalculatecosts();
  });
}

function resetstats(){
  player.stats = shallowcopy(settings.defaultstats);
}
