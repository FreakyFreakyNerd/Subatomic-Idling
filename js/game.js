currencyregistry = []
producerregistry = []

player = {
    quarkstage : {
    },
    temp : {
        currencyraise : new Decimal(0)
    }
}

function setupQuarkStage(){
    player.quarkstage.quarks = new Currency("quarks", "Quarks", "Quark", 10),
    player.quarkstage.producers = [
        new Producer("quarkgenone",     "Generator 1",  player.quarkstage.quarks, player.quarkstage.quarks, 10,             1.1, .5),
        new Producer("quarkgentwo",     "Generator 2",  player.quarkstage.quarks, player.quarkstage.quarks, 100,            1.1, 1),
        new Producer("quarkgenthree",   "Generator 3",  player.quarkstage.quarks, player.quarkstage.quarks, 1000,           1.1, 2),
        new Producer("quarkgenfour",    "Generator 4",  player.quarkstage.quarks, player.quarkstage.quarks, 10000,          1.1, 10),
        new Producer("quarkgenfive",    "Generator 5",  player.quarkstage.quarks, player.quarkstage.quarks, 100000,         1.25, 20),
        new Producer("quarkgensix",     "Generator 6",  player.quarkstage.quarks, player.quarkstage.quarks, 1000000,        1.25, 50),
        new Producer("quarkgenseven",   "Generator 7",  player.quarkstage.quarks, player.quarkstage.quarks, 10000000,       1.25, 100),
        new Producer("quarkgeneight",   "Generator 8",  player.quarkstage.quarks, player.quarkstage.quarks, 100000000,      1.25, 500),
        new Producer("quarkgennine",    "Generator 9",  player.quarkstage.quarks, player.quarkstage.quarks, 1000000000,     1.25, 1000),
        new Producer("quarkgenten",     "Generator 10", player.quarkstage.quarks, player.quarkstage.quarks, 10000000000,    1.25, 10000)
    ]
}

setupQuarkStage();

function calculatePerSecond(currency){
    amount = new Decimal(0);
    producerregistry.forEach(element =>{
        if (element.productionobject.id == currency.id){
            amount = amount.add(element.productionPerSec);
        }
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
    ticks += 1;
    produce();
    tickspersecactual = Math.min(1000/(((new Date()).getTime()-starttime)+1),20);
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
    data.quarks = player.quarkstage.quarks.saveData;
    data.producers = {};
    player.quarkstage.producers.forEach(element => {
        data.producers[element.id.toString()] = element.saveData;
    });
    savedata["quarkstage"] = data;
}

function loadQuarkStage(){
    data = loadeddata["quarkstage"]
    if(data == undefined)
        return;
    console.log(data)
    player.quarkstage.quarks.parse(data.quarks);
    player.quarkstage.producers.forEach(element => {
        console.log(data.producers[element.id])
        element.parse(data.producers[element.id]);
    });
}

function loadplayer(){
    loadQuarkStage();
    loadoptions();
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
    localStorage.setItem('SubstanceGameSave',JSON.stringify(savedata))
}

function load(){
    loadeddata = JSON.parse(localStorage.getItem('SubstanceGameSave'))
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
}, 1000/settings.tickspersecond);

updateAfterPlayer()

function reset(){
    currencyregistry = [];
    producerregistry = [];
    setupQuarkStage();
}