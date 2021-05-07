//Setups the most basic Quark funtionality
function setupbasicquarkstage(){
    player.quarkstage.quarks = new Currency("quark", "Quarks", "Quark", 10);
}

//Setup the producers for quarks
function setupquarkproducers(){
    player.quarkstage.producers = [];
    player.quarkstage.producers.push(new Producer("quarkgenone",     "Charger",       new ExponentialCost(player.quarkstage.quarks, "10", 1.07),    new LinearProduction(player.quarkstage.quarks, "1")  ,    null ,                                          "qp", [new AchievementRequirement("1e3quarkgenone")]));
    player.quarkstage.producers.push(new Producer("quarkgentwo",     "Spinner",       [new ExponentialCost(player.quarkstage.quarks, "100", 1.07)],   [new LinearProduction(player.quarkstage.quarks, "9")]  ,    [new AchievementRequirement("10quarkgenone")],  "qp", [new AchievementRequirement("1e3quarkgentwo")]));
    player.quarkstage.producers.push(new Producer("quarkgenthree",   "Flipper",       [new ExponentialCost(player.quarkstage.quarks, "1500", 1.07)],  [new LinearProduction(player.quarkstage.quarks, "100")],    [new AchievementRequirement("10quarkgentwo")],  "qp", [new AchievementRequirement("1e3quarkgenthree")]));
    player.quarkstage.producers.push(new Producer("quarkgenfour",    "Charmer",       [new ExponentialCost(player.quarkstage.quarks, "40000", 1.07)], [new LinearProduction(player.quarkstage.quarks, "2000")],   [new AchievementRequirement("10quarkgenthree")],"qp", [new AchievementRequirement("1e3quarkgenfour")]));
    player.quarkstage.producers.push(new Producer("quarkgenfive",    "Eightfold Way", [new ExponentialCost(player.quarkstage.quarks, "2e6", 1.07)],   [new LinearProduction(player.quarkstage.quarks, "50000")],  [new AchievementRequirement("10quarkgenfour")], "qp", [new AchievementRequirement("1e3quarkgenfive")]));
    player.quarkstage.producers.push(new Producer("quarkgensix",     "George",        [new ExponentialCost(player.quarkstage.quarks, "1e8", 1.07)],   [new LinearProduction(player.quarkstage.quarks, "2e6")],    [new AchievementRequirement("10quarkgenfive")], "qp", [new AchievementRequirement("1e3quarkgensix")]));
    player.quarkstage.producers.push(new Producer("quarkgenseven",   "Murray",        [new ExponentialCost(player.quarkstage.quarks, "1e10", 1.07)],  [new LinearProduction(player.quarkstage.quarks, "1e8")],    [new AchievementRequirement("10quarkgensix")],  "qp", [new AchievementRequirement("1e3quarkgenseven")]));
    player.quarkstage.producers.push(new Producer("quarkgeneight",   "Epoch",         [new ExponentialCost(player.quarkstage.quarks, "1e12", 1.07)],  [new LinearProduction(player.quarkstage.quarks, "8e9")],    [new AchievementRequirement("10quarkgenseven")],"qp", [new AchievementRequirement("1e3quarkgeneight")]));
    player.quarkstage.producers.push(new Producer("quarkgennine",    "Scattering",    [new ExponentialCost(player.quarkstage.quarks, "1e14", 1.07)],  [new LinearProduction(player.quarkstage.quarks, "5e11")],   [new AchievementRequirement("10quarkgeneight")],"qp", [new AchievementRequirement("1e3quarkgennine")]));
    player.quarkstage.producers.push(new Producer("quarkgenten",     "Big Bang",      [new ExponentialCost(player.quarkstage.quarks, "1e17", 1.07)],  [new LinearProduction(player.quarkstage.quarks, "5e13")],   [new AchievementRequirement("10quarkgennine")], "qp", [new AchievementRequirement("1e3quarkgenten")]));  
}

//Setup the infinitely buyable quark upgrades in producers tab
function setupbasicquarkupgrades(){
    player.quarkstage.upgrades = [];
    //Acceleron Tree
    player.quarkstage.upgrades.push(new Upgrade("qu0", "Acceleron",           -1, [new AchievementRequirement("100quarkgenone")], [new LinearEffect(player.quarkstage.producers, 1, .1, EffectTypes.ProducerMultiplierProduction, null, (obj) => {return "Acceleron Power: +" + formatDecimalOverride(obj.increase, 2) + " || Quark Gain: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,100,1.5)], "qp", new AchievementRequirement("quarkupgradesauto")));
    player.quarkstage.upgrades.push(new Upgrade("qu1", "Accelerator",         -1, [new AchievementRequirement("100quarkgennine")],            [new LinearEffect(player.quarkstage.upgrades[0], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Accelerator Power: +" + formatDecimalOverride(obj.increase, 2) + " || Acceleron Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e5,5)], "qp", new AchievementRequirement("quarkupgradesauto")));
    player.quarkstage.upgrades.push(new Upgrade("qu2", "Acceleratron",        -1, [new AchievementRequirement("quarkupgradesunlock")],            [new LinearEffect(player.quarkstage.upgrades[1], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Acceleratron Power: +" + formatDecimalOverride(obj.increase, 2) + " || Accelerator Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e25,25)], "qp", new AchievementRequirement("quarkupgradesauto")));
    player.quarkstage.upgrades.push(new Upgrade("qu3", "Acceleration",        -1, [new AchievementRequirement("imp")],            [new LinearEffect(player.quarkstage.upgrades[2], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Acceleration Power: +" + formatDecimalOverride(obj.increase, 2) + " || Acceleratron Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e10,15)], "qp", new AchievementRequirement("quarkupgradesauto")));
    player.quarkstage.upgrades.push(new Upgrade("qu4", "Acceleration Boost",  -1, [new AchievementRequirement("100quarkgenfive")],[new LinearEffect(player.quarkstage.upgrades[0], 0, 5, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Acceleration Boost Power: +" + formatDecimalOverride(obj.increase, 2) + " || Free Accelerons: " + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e12,100)], "qp", new AchievementRequirement("quarkupgradesauto")));
    //Multor Tree
    player.quarkstage.upgrades.push(new DiminishingUpgrade("qu5", "Multor", -1, [new AchievementRequirement("100quarkgentwo")], [new ExponentialEffect(player.quarkstage.producers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => {return "Multor Power: x" + formatDecimalOverride(obj.increase, 2) + " || Quark Gain: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e5,10)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}, new AchievementRequirement("quarkupgradesauto")));
    player.quarkstage.upgrades.push(new DiminishingUpgrade("qu6", "Multron", -1, [new AchievementRequirement("multronunlock")], [new LinearEffect(player.quarkstage.upgrades[5], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Multron Power: +" + formatDecimalOverride(obj.increase, 2) + " || Multor Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e40,15)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}, new AchievementRequirement("quarkupgradesauto")));
    player.quarkstage.upgrades.push(new DiminishingUpgrade("qu7", "Multiplier", -1, [new AchievementRequirement("quarkupgradesunlock")], [new LinearEffect(player.quarkstage.upgrades[6], 1, .001, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Mutiplier Power: +" + formatDecimalOverride(obj.increase, 3) + " || Multron Power: x" + formatDecimalOverride(obj.value, 3)})], [new ExponentialCost(player.quarkstage.quarks,1e80,1e4)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}, new AchievementRequirement("quarkupgradesauto")));
    player.quarkstage.upgrades.push(new DiminishingUpgrade("qu8", "Multiplication", -1, [new AchievementRequirement("imp")], [new LinearEffect(player.quarkstage.upgrades[7], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Multiplication Power: +" + formatDecimalOverride(obj.increase, 2) + " || Multiplier Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e120,250)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}, new AchievementRequirement("quarkupgradesauto")));
    player.quarkstage.upgrades.push(new DiminishingUpgrade("qu9", "Multiplication Boost", -1, [new AchievementRequirement("100quarkgenten")], [new LinearEffect(player.quarkstage.upgrades[5], 0, 5, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Multiplication Boost Power: +" + formatDecimalOverride(obj.increase, 2) + " || Free Multors: " + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e16,1000)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}, new AchievementRequirement("quarkupgradesauto")));
}

//Setup most basic quark singleton upgrades
function setupbasicquarksingletonupgrades(){
    player.quarkstage.singletonupgrades = [];
    function boughtmult() 
    {
      var val = Decimal.pow(totalproducerbought(player.quarkstage.producers), .9);
      return val;
    }
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu0", "[q1] Increase Charger production based on Quark Producers bought",        1, null, [new FunctionEffect(player.quarkstage.producers[0], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Charger Production x"       + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e6")] , "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu1", "[q2] Increase Spinner production based on Quark Producers bought",        1, null, [new FunctionEffect(player.quarkstage.producers[1], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Spinner Production x"       + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e8")] , "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu2", "[q3] Increase Flipper production based on Quark Producers bought",        1, null, [new FunctionEffect(player.quarkstage.producers[2], EffectTypes.ProducerMultiplierProduction, () => boughtmult(),  (obj) => "Flipper Production x"      + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e10")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu3", "[q4] Increase Charmer production based on Quark Producers bought",        1, null, [new FunctionEffect(player.quarkstage.producers[3], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Charmer Production x"       + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e12")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu4", "[q5] Increase Eightfold way production based on Quark Producers bought",  1, null, [new FunctionEffect(player.quarkstage.producers[4], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Eightfold Way Production x" + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e14")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu5", "[q6] Increase George production based on Quark Producers bought",         1, null, [new FunctionEffect(player.quarkstage.producers[5], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "George Production x"        + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e16")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu6", "[q7] Increase Murray production based on Quark Producers bought",         1, null, [new FunctionEffect(player.quarkstage.producers[6], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Murray Production x"        + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e18")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu7", "[q8] Increase Epoch production based on Quark Producers bought",          1, null, [new FunctionEffect(player.quarkstage.producers[7], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Epoch Production x"         + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e20")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu8", "[q9] Increase Scattering production based on Quark Producers bought",     1, null, [new FunctionEffect(player.quarkstage.producers[8], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Scattering Production x"    + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e22")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu9", "[q10] Increase Big Bang production based on Quark Producers bought",      1, null, [new FunctionEffect(player.quarkstage.producers[9], EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Big Bang Production x"      + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e24")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu10", "[q11] Acceleron is 1.25(+.03/level) times as powerful", 25, null, [new LinearEffect(player.quarkstage.singletonupgrades[9], 1.25, .03, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Acceleron Power x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.quarkstage.quarks, "1e25", "10")], "upg"));
    function valuemult(amount){
      return Decimal.pow(Decimal.log(amount,10), 2).divide(10).add(1);
    }
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu11", "[q12] Boost Quark production based on Quarks generated this Electrify", 5, null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, (amount) => valuemult(Decimal.pow(player.quarkstage.quarks.gained, (new Decimal(1).add(amount.divide(5))))), (obj) => "Quark production x" + formatDecimalNormal(obj.value))], [new ExponentialCost(player.quarkstage.quarks, "1e27", "4e6")], "upg"));
    function productionmult(amount){
        return Decimal.pow(amount, 1/2);
    }
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu12", "[q13] All Accelerons boost Quark production.", 1, null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => productionmult(player.quarkstage.upgrades[0].amount), (obj) => "Quark production x" + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e30")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu13", "[q14] Get 15 free Accelerons per bought Multor.", 1, null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => Decimal.floor(player.quarkstage.upgrades[5].bought),0,15, EffectTypes.UpgradeBonusLevels, null, (obj) => formatDecimalNormal(obj.value) + " Free Accelerons")], [new StaticCost(player.quarkstage.quarks, "1e35")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu14", "[q15] Get a free Multor per 15 bought Accelerons.", 1, null, [new LinkedLinearEffect(player.quarkstage.upgrades[5], () => Decimal.floor(player.quarkstage.upgrades[0].bought.divide(15)),0,1, EffectTypes.UpgradeBonusLevels, null, (obj) => formatDecimalNormal(obj.value) + " Free Multors")], [new StaticCost(player.quarkstage.quarks, "1e40")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu15", "[q16] Increase Quark production based on Quark Producers bought",      1, null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Quark Production x" + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e50")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu16", "[q17] Quark Production +.01, Electron gain +.001, +.00001 More free Accelerons/Multors", "1e4", null, [new LinearEffect(player.quarkstage.producers, 1, .01, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Production x" + formatDecimalOverride(obj.value, 2)),new LinearEffect(player.quarkstage.electrify, 1, "1e-3", EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electron Gain x" + formatDecimalOverride(obj.value, 3)),new LinearEffect(player.quarkstage.upgrades[0], 1, "1e-5", EffectTypes.UpgradeBonusLevelMultiplier, null, (obj) => "Acceleron/Multor Free Levels x" + formatDecimalOverride(obj.value, 5)),new LinearEffect(player.quarkstage.upgrades[5], 1, "1e-5", EffectTypes.UpgradeBonusLevelMultiplier, null, undefined)], [new ExponentialCost(player.quarkstage.quarks, "1e60", "1.01")], "upg", null, {showall: true}));
}

//Quark singleton upgrades needed after electron setup
function setupstage2quarksingletonupgrades(){
    //And Yep Now I need to add Quark upgrades down here
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu17", "[q18] Increase Quark Spin Production * 1(+.05/level)", 80, null, [new LinearEffect(player.electronstage.quarkspinproducers, 1,.05,EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Spin production *" + formatDecimalOverride(obj.value,2))], [new StaticCost(player.quarkstage.quarks, "1e60")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu18", "[q19] Quark Spin multiplier is slightly better.", "1", null, [new StaticEffect(player.electronstage.quarkspin, 1.2, EffectTypes.UpgradeValuePower, null, () => "Quark Spin Multiplier ^1.2")], [new StaticCost(player.quarkstage.quarks, "1e75")], "upg"));

    function timebonus(amount){
      return new Decimal(amount);
    }
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu19", "[q20] Quark Production Multiplier based on time this electrify.", "1", null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => timebonus(player.stats?.times ? player.stats?.times["electrify"] : 1), (obj) => "Quark Gain *" + formatDecimalOverride(obj.value,2))], [new StaticCost(player.quarkstage.quarks, "1e100")], "upg"));
    player.quarkstage.singletonupgrades.push(new Upgrade("qsu20", "[q21] Increase Effective Multor Amount", "100", null, [new LinearEffect(player.quarkstage.upgrades[5], 1.05, .0005, EffectTypes.UpgradeAmountMultiplier, null, (obj) => "Multor Amount *" + formatDecimalOverride(obj.value, 3) + "(+" + formatDecimalOverride(obj.increase, 3) + ")")], [new ExponentialCost(player.quarkstage.quarks, "1e150", "5")], "upg"));
}

function resetQuarkStage(hard){
  player.quarkstage.quarks.reset();
  player.quarkstage.producers.forEach((prod, i) => {
    prod.reset(hard);
  });
  player.quarkstage.upgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
  player.quarkstage.singletonupgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
  updateeffects();
}