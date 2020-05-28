player = {
    temp : {
        currencyraise : new Decimal(0),
        currencymultiplierpertick : 1.001,
        currencymultiplierpersec : 1.001
    }
}

savedata = {}
loadeddata = {}

tickspersecactual = 0

gameLogicIntervalID = 0;
ticks = 0;
function gameLogicTick(){
    starttime = new Date().getTime()
    player.currencyone = player.currencyone.times(player.temp.currencymultiplierpertick)
    ticks += 1
    updateMultipliersForCurrencyOne()
    if(player.options.valuesinticks){
        player.temp.currencyraise = player.currencyone.times(player.temp.currencymultiplierpertick-1)
    }else{
        player.temp.currencyraise = player.currencyone.times(Math.pow(player.temp.currencymultiplierpertick, settings.tickspersecond)-1)
    }
    /*if (player.currencyone.greaterThan(1e308)){
        console.log("Ticks: " + ticks);
        console.log("Seconds: " + ticks/20);
        console.log("Hours: " + ticks/20/3600);

        
        //clearInterval(gameLogicIntervalID);
    }*/
    safeCheckValues();
    tickspersecactual = Math.min(1000/(((new Date()).getTime()-starttime)+1),20)
}

function safeCheckValues(){
    if(player.currencyone.lessThan(1))
        player.currencyone = new Decimal(1)
}

function updateMultipliersForCurrencyOne(){
    multpertick = settings.basecurrencyonemultpertick
    if(player.currencyone.lessThan(settings.currencyonemultiplierdecaystartingthreshold)){
        multpertick = multpertick
    }
    else{
        multpertick = multpertick.divideBy(Decimal.max(Decimal.log(player.currencyone.divide(settings.currencyonemultiplierdecaystartingthreshold), 10),1))
    }

    multpertick = multpertick.add(1)

    player.temp.currencymultiplierpertick = multpertick
    player.temp.currencymultiplierpersec = Math.pow(multpertick, settings.tickspersecond)

}

function saveplayer(){
    savedata["currencyone"] = player.currencyone.toString()
    savedata["currencyoneshards"] = player.currencyoneshards.toString()
}

function loadplayer(){
    curone = loadeddata["currencyone"]
    curoneshards = loadeddata["currencyoneshards"]
    if(curone != undefined){
        player["currencyone"] = (new Decimal(0)).fromString(curone)
    }else{
        player["currencyone"] = new Decimal(settings.defaultcurrencyone)
    }
    if(curoneshards != undefined){
        player["currencyoneshards"] = (new Decimal(0)).fromString(curoneshards)
    }else{
        player["currencyoneshards"] = new Decimal(0)
    }
}

function saveoptions(){
    savedata["playeroptions"] = player.options
}

function loadoptions(){
    options = loadeddata["playeroptions"]
    if(options != undefined)
        player.options = options
    else
        player.options = settings.defaultoptions
}

function save(){
    savedata = {}
    saveplayer()
    saveoptions()
    localStorage.setItem('SubstanceGameSave',JSON.stringify(savedata))
}

function load(){
    loadeddata = JSON.parse(localStorage.getItem('SubstanceGameSave'))
    if(loadeddata == undefined){
        loadeddata = {}
        console.log(loadeddata)
    }
    loadplayer()
    loadoptions()
    
}

console.log(loadeddata)

load()

gameLogicIntervalID = setInterval(() => {
    gameLogicTick();
    save();
}, 1000/settings.tickspersecond);

updateAfterPlayer()
