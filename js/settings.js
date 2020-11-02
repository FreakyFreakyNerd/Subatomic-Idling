settings = {
    tickspersecond : 10,
    logictickspersecond : 10,
    version: "Alpha v0.01",
    defaultoptions : {
        uidelay : 50,
        notation : "standard",
        notationdecimals : 3,
        theme : "light",
        buyamounts : {qp: 1,quarkupg: 1,qsp: 1,eupg: 1},
        autochallengeretry : false,
        toggleamounts: [1,10,25,100,-1]
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
  if(buyamount == undefined){
    player.options.buyamounts[type] = 1;
    return 1;
  }
  if(buyamount != -1)
    return buyamount;
  if(object == undefined)
    return "Max"
  return object.buyamount;
}

function setbuyamount(type, num){
  player.options.buyamounts[type] = num;
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

function togglebuyamount(type){
  var buyamount = getbuyamount(type);
  var ind = player.options.toggleamounts.indexOf(buyamount);
  if(ind == undefined || ind == player.options.toggleamounts.length-1){
    setbuyamount(type, player.options.toggleamounts[0]);
  }
  else{
    setbuyamount(type, player.options.toggleamounts[ind+1])
    console.log("Yepp Changed To Next In Line: " + player.options.toggleamounts[ind+1])
    console.log("Buy Amount: " + getbuyamount(type))
  }
}
