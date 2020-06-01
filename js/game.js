currencyregistry = []
producerregistry = []
upgraderegistry = []

player = {
    quarkstage : {
    },
    electronstage : {
    },
    temp : {
        currencyraise : new Decimal(0)
    }
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
    player.quarkstage.upgrades.push(new Upgrade("quarkupgrade1", "Multiplier 1", -1, null, [new LinearEffect(player.quarkstage.producers, 1, EffectTypes.ProducerMultiplierProduction, 1)], [new ExponentialCost(player.quarkstage.quarks,100,1000)]))
}

function setupElectronStage(){
    player.electronstage.electrons = new Currency("electrons", "Electrons", "Electron", 0)
}

setupQuarkStage();

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
    highlightOptimalQuarkBuy();
}, 1000/settings.tickspersecond);

updateAfterPlayer()

function reset(){
    currencyregistry = [];
    producerregistry = [];
    setupQuarkStage();
}

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
