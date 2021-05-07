var settings = {
    tickspersecond : 10,
    logictickspersecond : 10,
    gamespeedmodifier : 1,
    version: "Alpha v0.02",
    defaultoptions : {
        notation : "standard",
        notationdecimals : 3,
        theme : "dark",
        buyamounts : {qp: 1,qsp: 1,fep: 1,upg: 1,special: 1, challengedifficulty: 1, applyelectronpower: 1},
        toggleamounts: [1,10,25,100,-1],
        currentscreen: "producers",
        currentstatscreen: "general",
        currentproducersscreen: "quark",
        currentupgradesscreen: "quark",
        hotkeysenabled: true,
        doofflineprogress: true,
        doconsoleoutput: false,
        confirmations: {
          electrify: true,
          nucleonize: true
        }
    },
    defaultstats : {
      times : {game : Date.now()},
      prestigeamounts : {},
      past10prestiges : {}
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

function log(obj){
  if(player.options.doconsoleoutput){
    console.log(obj);
  }
}
