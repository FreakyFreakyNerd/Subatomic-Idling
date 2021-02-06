function setupGame(){
  //Currencies
  player.quarkstage.quarks = new Currency("quark", "Quarks", "Quark", 10);
  player.electronstage.electrons = new Currency("electron", "Electrons", "Electron", 0);
  player.nucleonstage.nucleons = new Currency("nucleon", "Nucleons", "Nucleon", 0);

  //Prestiges
  var electrongain = (amount) => {
    if(amount.lessThan(new Decimal("1e16")))
      return new Decimal();
    return Decimal.floor(Decimal.pow(amount.divide("1e16"), 1/3));
  }
  player.quarkstage.electrify = new Prestige("electrify","Electrify", (hadrequire, producedamounts) => { resetQuarkStage(); if(!hadrequire || producedamounts == undefined) return; player.stats.electrified += 1; player.stats.past10electrifies.unshift([player.stats.currentelectrifytime, producedamounts[0]]); player.stats.past10electrifies.pop(); player.stats.currentelectrifytime = 0;}, new NumRequirement(player.quarkstage.quarks, "1e16"), new PrestigeReward(player.electronstage.electrons, player.quarkstage.quarks, electrongain))
  
  var nucleongain = (amount) => {
    if(amount.lessThan("1e24"))
      return new Decimal();
    return Decimal.floor(Decimal.pow(amount.divide("1e24"), 1/4));
  }
  player.electronstage.nucleonize = new Prestige("nucleonize", "Nucleonize", (hadrequire, producedamounts) => {resetQuarkStage(); resetElectronStage();}, new NumRequirement(player.electronstage.electrons, "1e24"), new PrestigeReward(player.nucleonstage.nucleons, player.electronstage.electrons, nucleongain));

  //Base Quark Stage
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
 
  player.quarkstage.upgrades = [];
  //Acceleron Tree
  player.quarkstage.upgrades.push(new Upgrade("qu0", "Acceleron",           -1, [new AchievementRequirement("100quarkgenone")], [new LinearEffect(player.quarkstage.producers, 1, .1, EffectTypes.ProducerMultiplierProduction, null, (obj) => {return "Acceleron Power: +" + formatDecimalOverride(obj.increase, 2) + " || Quark Gain: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,100,1.5)], "qp"));
  player.quarkstage.upgrades.push(new Upgrade("qu1", "Accelerator",         -1, [new AchievementRequirement("100quarkgennine")],            [new LinearEffect(player.quarkstage.upgrades[0], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Accelerator Power: +" + formatDecimalOverride(obj.increase, 2) + " || Acceleron Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e5,5)], "qp"));
  player.quarkstage.upgrades.push(new Upgrade("qu2", "Acceleratron",        -1, [new AchievementRequirement("imp")],            [new LinearEffect(player.quarkstage.upgrades[1], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Acceleratron Power: +" + formatDecimalOverride(obj.increase, 2) + " || Accelerator Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e7,4)], "qp"));
  player.quarkstage.upgrades.push(new Upgrade("qu3", "Acceleration",        -1, [new AchievementRequirement("imp")],            [new LinearEffect(player.quarkstage.upgrades[2], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Acceleration Power: +" + formatDecimalOverride(obj.increase, 2) + " || Acceleratron Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e10,15)], "qp"));
  player.quarkstage.upgrades.push(new Upgrade("qu4", "Acceleration Boost",  -1, [new AchievementRequirement("100quarkgenfive")],[new LinearEffect(player.quarkstage.upgrades[0], 0, 5, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Acceleration Boost Power: +" + formatDecimalOverride(obj.increase, 2) + " || Free Accelerons: " + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e12,100)], "qp"));

  //Multor Tree
  player.quarkstage.upgrades.push(new DiminishingUpgrade("qu5", "Multor", -1, [new AchievementRequirement("100quarkgentwo")], [new ExponentialEffect(player.quarkstage.producers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => {return "Multor Power: x" + formatDecimalOverride(obj.increase, 2) + " || Quark Gain: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e5,10)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}));
  player.quarkstage.upgrades.push(new DiminishingUpgrade("qu6", "Multron", -1, [new AchievementRequirement("multronunlock")], [new LinearEffect(player.quarkstage.upgrades[5], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Multron Power: +" + formatDecimalOverride(obj.increase, 2) + " || Multor Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e55,15)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}));
  player.quarkstage.upgrades.push(new DiminishingUpgrade("qu7", "Multiplier", -1, [new AchievementRequirement("imp")], [new LinearEffect(player.quarkstage.upgrades[6], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Mutiplier Power: +" + formatDecimalOverride(obj.increase, 2) + " || Multron Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e80,250)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}));
  player.quarkstage.upgrades.push(new DiminishingUpgrade("qu8", "Multiplication", -1, [new AchievementRequirement("imp")], [new LinearEffect(player.quarkstage.upgrades[7], 1, .01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => {return "Multiplication Power: +" + formatDecimalOverride(obj.increase, 2) + " || Multiplier Power: x" + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e120,250)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}));
  player.quarkstage.upgrades.push(new DiminishingUpgrade("qu9", "Multiplication Boost", -1, [new AchievementRequirement("100quarkgenten")], [new LinearEffect(player.quarkstage.upgrades[5], 0, 5, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Multiplication Boost Power: +" + formatDecimalOverride(obj.increase, 2) + " || Free Multors: " + formatDecimalOverride(obj.value, 2)})], [new ExponentialCost(player.quarkstage.quarks,1e16,1000)], "qp", new Decimal(1000), (num) => {return Decimal.pow(Decimal.log(num,5),3)}));

  function productionmult(amount){
    return Decimal.pow(amount, 1/2);
  }
  player.quarkstage.singletonupgrades.push(new Upgrade("qsu12", "[q13] All Accelerons boost Quark production.", 1, null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => productionmult(player.quarkstage.upgrades[0].amount), (obj) => "Quark production x" + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e30")], "upg"));

  player.quarkstage.singletonupgrades.push(new Upgrade("qsu13", "[q14] Get 15 free Accelerons per bought Multor.", 1, null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => Decimal.floor(player.quarkstage.upgrades[5].bought),0,15, EffectTypes.UpgradeBonusLevels, null, (obj) => formatDecimalNormal(obj.value) + " Free Accelerons")], [new StaticCost(player.quarkstage.quarks, "1e35")], "upg"));
  player.quarkstage.singletonupgrades.push(new Upgrade("qsu14", "[q15] Get a free Multor per 15 bought Accelerons.", 1, null, [new LinkedLinearEffect(player.quarkstage.upgrades[5], () => Decimal.floor(player.quarkstage.upgrades[0].bought.divide(15)),0,1, EffectTypes.UpgradeBonusLevels, null, (obj) => formatDecimalNormal(obj.value) + " Free Multors")], [new StaticCost(player.quarkstage.quarks, "1e40")], "upg"));

  player.quarkstage.singletonupgrades.push(new Upgrade("qsu15", "[q16] Increase Quark production based on Quark Producers bought",      1, null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => boughtmult(), (obj) => "Quark Production x" + formatDecimalNormal(obj.value))], [new StaticCost(player.quarkstage.quarks, "1e50")], "upg"));

  //Long term loads of levels sort of thing
  player.quarkstage.singletonupgrades.push(new Upgrade("qsu16", "[q17] Quark Production +.01, Electron gain +.001, +.00001 More free Accelerons/Multors", "1e4", null, [new LinearEffect(player.quarkstage.producers, 1, .01, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Production x" + formatDecimalOverride(obj.value, 2)),new LinearEffect(player.quarkstage.electrify, 1, "1e-3", EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electron Gain x" + formatDecimalOverride(obj.value, 3)),new LinearEffect(player.quarkstage.upgrades[0], 1, "1e-5", EffectTypes.UpgradeBonusLevelMultiplier, null, (obj) => "Acceleron/Multor Free Levels x" + formatDecimalOverride(obj.value, 5)),new LinearEffect(player.quarkstage.upgrades[5], 1, "1e-5", EffectTypes.UpgradeBonusLevelMultiplier, null, undefined)], [new ExponentialCost(player.quarkstage.quarks, "1e60", "1.02")], "upg", {showall: true}));

  
  //Electron Stage
  player.electronstage.upgrades = [];

  player.electronstage.upgrades.push(new Upgrade("eu0", "[e1] Twice The Speed!", 1, null, [new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, null, ()=>"Quark Gain x2")], [new StaticCost(player.electronstage.electrons, 10)], "upg"));

  player.electronstage.upgrades.push(new Upgrade("eu1", "[e2] Get 5 free Acelerons.", 1, null, [new StaticEffect(player.quarkstage.upgrades[0], 5, EffectTypes.UpgradeBonusLevels, null, () => "Exactly what I told you above")], [new StaticCost(player.electronstage.electrons, 100)], "upg"))
  player.electronstage.upgrades.push(new Upgrade("eu2", "[e3] Get 2 free Multors.", 1, null, [new StaticEffect(player.quarkstage.upgrades[5], 2, EffectTypes.UpgradeBonusLevels, null, () => "Trust me I am not lying to yah")], [new StaticCost(player.electronstage.electrons, "1e3")], "upg"))
  player.electronstage.upgrades.push(new Upgrade("eu3", "[e4] Get 15 free Accelerons, and 3 free Multors.", 1, null, [new StaticEffect(player.quarkstage.upgrades[5], 3, EffectTypes.UpgradeBonusLevels, null, () => "I dont know go ahead and take some more"),new StaticEffect(player.quarkstage.upgrades[0], 15, EffectTypes.UpgradeBonusLevels, null, null)], [new StaticCost(player.electronstage.electrons, "1e4")], "upg"))
  player.electronstage.upgrades.push(new Upgrade("eu4", "[e5] Get a free Accelerator per 200 Quark Producers bought.", 1, null, [new LinkedLinearEffect(player.quarkstage.upgrades[1], () => Decimal.floor(totalproducerbought(player.quarkstage.producers).divide(200)), 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => "Free Accelerators: " + formatDecimalNormal(obj.value))], [new StaticCost(player.electronstage.electrons, "1e5")], "upg"))

  var electronmult = () => Decimal.pow(Decimal.log(player.electronstage.electrons.amount, 10), 5);
  player.electronstage.upgrades.push(new Upgrade("eu5", "[e6] Gain production based on unspent Electrons", 1, null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, electronmult, (obj)=>"Quark Gain x" + formatDecimalOverride(obj.value, 2))], [new StaticCost(player.electronstage.electrons, "1e6")], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu6", "[e7] Quark producers cost scales slower.", 1, null, [new StaticEffect(player.quarkstage.producers, .95, EffectTypes.PriceScaling, null, () => "Cost scales 5% slower.")], [new StaticCost(player.electronstage.electrons, "1e7")], "upg"))
  player.electronstage.upgrades.push(new Upgrade("eu7", "[e8] Boost quark production based on Electrified stat.", 1, null, [new LinkedLinearEffect(player.quarkstage.producers, () => player.stats.electrified, 1, 1,  EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark production x" + formatDecimalNormal(obj.value))], [new StaticCost(player.electronstage.electrons, "1e10")], "upg"))
  player.electronstage.upgrades.push(new Upgrade("eu8", "[e9] Get free Multors based on quarks gained this Electrify.", 1, null, [new FunctionEffect(player.quarkstage.upgrades[5], EffectTypes.UpgradeBonusLevels, () => Decimal.floor(Decimal.log(player.quarkstage.quarks.gained, 100)), (obj) => formatDecimalNormal(obj.value) + " Free Multors")], [new StaticCost(player.electronstage.electrons, "1e14")], "upg"))

  var spinmult = (amount) => {
    if(amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    var num = Decimal.pow(amount, 1/5);
    return num;
  }
  player.electronstage.quarkspin = new Upgrade("quarkspin", "Quark Spin", 0, null, new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, spinmult, (obj) => {return "You have " + formatDecimalNormal(obj.amount) + " Quark Spin, providing a x" + formatDecimal(obj.value) + " production boost to Quark Producers."}));

  player.electronstage.quarkspinproducers = [];
  player.electronstage.quarkspinproducers.push(new Producer("qs1", "Green Quark", [new ExponentialCost(player.electronstage.electrons, "1", 2)], [new LinearProduction(player.electronstage.quarkspin, "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs2", "Red Quark", [new ExponentialCost(player.electronstage.electrons, "10", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[0], "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs3", "Blue Quark", [new ExponentialCost(player.electronstage.electrons, "1e3", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[1], "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs4", "Antigreen Quark", [new ExponentialCost(player.electronstage.electrons, "1e6", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[2], "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs5", "Antired Quark", [new ExponentialCost(player.electronstage.electrons, "1e12", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[3], "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs6", "Antiblue Quark", [new ExponentialCost(player.electronstage.electrons, "1e24", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[4], "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs7", "Meson Quark", [new ExponentialCost(player.electronstage.electrons, "1e48", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[5], "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs8", "Baryon Quark", [new ExponentialCost(player.electronstage.electrons, "1e96", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[6], "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs9", "Antibaryon Quark", [new ExponentialCost(player.electronstage.electrons, "1e200", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[7], "1")], null, "qsp"));
  player.electronstage.quarkspinproducers.push(new Producer("qs10", "Metaphysical Quark", [new ExponentialCost(player.electronstage.electrons, "1e500", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[8], "1")], null, "qsp"));

  //Gotta Start The Challenges
  
  //Challenge 1
  var c1effect = new ExponentialEffect(player.quarkstage.producers, .9, .97, EffectTypes.ProducerExponentialProduction, null, (obj) => { return "Raise all quark production to the " + formatDecimalOverride(obj.value, 4);});
  var c1bonus1 = new ExponentialEffect(player.quarkstage.producers, 1, 1.5, EffectTypes.ProducerMultiplierProduction, null, (obj) => { return "x" + formatDecimalOverride(obj.increase, 2) + ' more Quarks produced || Current: Quark Production *' + formatDecimalOverride(obj.value, 2)});
  var c1bonus2 = new ExponentialEffect(player.electronstage.quarkspinproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => { return "x" + formatDecimalOverride(obj.increase, 2) + ' more Quark Spin produced || Current: Quark Spin Production *' + formatDecimalOverride(obj.value, 2)});
  var c1bonus3 = new LinearEffect(player.quarkstage.electrify, 1, .002, EffectTypes.PrestigeExponentialGain, null, (obj) => { return "+" + formatDecimalOverride(obj.increase, 3) + ' Electron exponent || Current: Electron Gain ^' + formatDecimalOverride(obj.value, 3)});
  player.challenges.push(new Challenge("c1", "[c1] Quark Cut", "Electrify and reach the goal, but quark production is reduced heavily.", c1effect , [c1bonus1, c1bonus2, c1bonus3], new ExponentialNumRequirement(player.quarkstage.quarks, "1e16", "10"), 100, () => {player.quarkstage.electrify.prestige();}));
  
  //Challenge 2
  var c2bonus1 = new LinearEffect(player.quarkstage.upgrades[0], 1, .125, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "+" + formatDecimalOverride(obj.increase, 3) + " Acceleron Power Multiplier || Acceleron power *" + formatDecimalOverride(obj.value, 3))
  var c2bonus2 = new LinearEffect(player.quarkstage.upgrades[5], 1, .05, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "+" + formatDecimalOverride(obj.increase, 2) + " Multor Power Multiplier || Multor power *" + formatDecimalOverride(obj.value, 2))
  var c2bonus3 = new LinearEffect(player.quarkstage.upgrades[5], 0, 3, EffectTypes.UpgradeBonusLevels, null, (obj) => formatDecimalOverride(obj.increase, 1) + " Free Multors || +" + formatDecimalNormal(obj.value) + " Free Multors")
  player.challenges.push(new Challenge("c2", "[c2] Cutting Down Down Down", "Electrify and reach the goal, but Acceleron and Multor have a weakened effect", new ExponentialEffect([player.quarkstage.upgrades[0],player.quarkstage.upgrades[5]], .5, .9,EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Multors and Accelerons effect x" + formatDecimalOverride(obj.value, 4)), [c2bonus1,c2bonus2,c2bonus3], new ExponentialNumRequirement(player.quarkstage.quarks, "1e20", "1e4"), 100, () => {player.quarkstage.electrify.prestige();}));


  //Challenge 3
  var c3bonus1 = new ExponentialEffect(player.quarkstage.producers, 1, 2, EffectTypes.ProducerMultiplierProduction, null, (obj) => "x" + formatDecimal(obj.increase, 0) + " Quark Production || Quark Production *" + formatDecimal(obj.value))
  var c3bonus2 = new LinearEffect(player.quarkstage.upgrades[1], 1, .25, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "+" + formatDecimalOverride(obj.increase, 2) + " Accelerator Power Multiplier || Accelerator power *" + formatDecimalOverride(obj.value, 2))
  var c3bonus3 = new LinearEffect(player.quarkstage.upgrades[1], 0, 6, EffectTypes.UpgradeBonusLevels, null, (obj) => formatDecimalOverride(obj.increase, 1) + " Free Accelerators || +" + formatDecimalNormal(obj.value) + " Free Accelerators")
  player.challenges.push(new Challenge("c3", "[c3] Only 1", "Electrify and reach the goal, but you only can buy 1 Charger.", [new StaticEffect(player.quarkstage.producers[0], 1,EffectTypes.ForceLimit, null, (obj) => "Max Chargers Buyable : 1"),new StaticEffect(player.quarkstage.producers.slice(1), 0, EffectTypes.ForceLimit, null, (obj) => "Max Quark Producers(Excluding Charger) Buyable : 0")], [c3bonus1,c3bonus2,c3bonus3], new ExponentialNumRequirement(player.quarkstage.quarks, "1e32", "1e4"), 100, () => {player.quarkstage.electrify.prestige();}));

  //And Now quark spin upgrades
  player.electronstage.quarkspinupgrades = [];
  player.electronstage.quarkspinupgrades.push(new Upgrade("su1", "Respinner", -1, null, [new ExponentialEffect(player.electronstage.quarkspinproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Respinner Power x" + formatDecimalOverride(obj.increase, 1) + " | Quark Spin Production x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.electronstage.quarkspin, "1e3", 10)], "qsp"));
  player.electronstage.quarkspinupgrades.push(new Upgrade("su2", "Aceleron Plus", -1, null, [new LinearEffect(player.quarkstage.upgrades[0], 1, .5, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Acceleron Power +" + formatDecimalOverride(obj.increase,1) + " | Acceleron power x" + formatDecimalOverride(obj.value, 1))], [new ExponentialCost(player.electronstage.quarkspin, "1e6", 25)], "qsp"));
  player.electronstage.quarkspinupgrades.push(new Upgrade("su3", "Multor Plus", -1, null, [new LinearEffect(player.quarkstage.upgrades[0], 1, .1, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Multor Power +" + formatDecimalOverride(obj.increase,1) + " | Multor power x" + formatDecimalOverride(obj.value, 1))], [new ExponentialCost(player.electronstage.quarkspin, "1e12", 100)], "qsp"));
  player.electronstage.quarkspinupgrades.push(new Upgrade("su4", "Easier Challenges", -1, null, [new ExponentialEffect([player.challenges[0],player.challenges[1],player.challenges[2]], 1, .9, EffectTypes.RequirementMult, null, (obj) => "Challenge 1-3 Requirement x" + formatDecimalOverride(obj.value, 3))], [new ExponentialCost(player.electronstage.quarkspin, "1e20", "1e5")], "qsp"));

  //And Yep Now I need to add Quark upgrades down here
  player.quarkstage.singletonupgrades.push(new Upgrade("qsu17", "[q18] Increase Quark Spin Production * 1(+.05/level)", 80, null, [new LinearEffect(player.electronstage.quarkspinproducers, 1,.05,EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Spin production x" + formatDecimalOverride(obj.value,2))], [new StaticCost(player.quarkstage.quarks, "1e60")], "upg"));
  player.quarkstage.singletonupgrades.push(new Upgrade("qsu18", "[q19] Quark Spin multiplier is slightly better.", "1", null, [new StaticEffect(player.electronstage.quarkspin, 1.5, EffectTypes.UpgradeValuePower, null, () => "Quark Spin Multiplier ^1.5")], [new StaticCost(player.quarkstage.quarks, "1e76")], "upg"));

  player.electronstage.upgrades.push(new Upgrade("eu9", "[e10] Time to make the quark spin production faster, x2.5(+.01/Level)", 250, null, [new LinearEffect(player.electronstage.quarkspinproducers, 2.5, .01, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark spin production x" + formatDecimalOverride(obj.value, 2))], new LinearCost(player.electronstage.electrons, "1e16", "1e16"), "upg"));
  player.electronstage.upgrades.push(new Upgrade("eu10", "[e11] Quark Production +.1, Electron Production +.01, +.0001x Accelerator/Multron Power ", 1e4, null, [new LinearEffect(player.quarkstage.producers, 1, .1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark production x" + formatDecimalOverride(obj.value, 1)),new LinearEffect(player.quarkstage.electrify, 1, .01, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electrons x" + formatDecimalOverride(obj.value, 2)),new LinearEffect([player.quarkstage.upgrades[1],player.quarkstage.upgrades[6]], 1, .0001, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Accelerator/Multron Power x" + formatDecimalOverride(obj.value, 4))], new ExponentialCost(player.electronstage.electrons, "1e16", 1.02), "upg", {"showall":true}));

  player.electronstage.clouds = {};
  player.electronstage.clouds.power = new AppliableUpgrade("electronpower", "Electron Power", -1, null, null, new ExponentialCost(player.electronstage.electrons, "1e24", 10), "epower");

  player.electronstage.clouds.orbitals = [];
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("1s", "Orbital 1S", new LinearEffect(player.quarkstage.producers, 1, .01, EffectTypes.ProducerMultiplierProductionm, null, (obj) => "Quark Production x" + formatDecimalOverride(obj.value,2) + "(+" + formatDecimalOverride(obj.increase,2) + ")"), new ExponentialCost(null, "100", "1.5"), player.electronstage.clouds.power));

  //Post Nucleonize
  var freeelectronmult = (amount) => {
    if(amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    var num = Decimal.pow(amount, 1/3);
    return num;
  }
  player.nucleonstage.freeelectrons = new Upgrade("freeelectrons", "Free Electrons", 0, null, new FunctionEffect(player.quarkstage.producers.concat(player.electronstage.quarkspinproducers), EffectTypes.ProducerMultiplierProduction, freeelectronmult, (obj) => {return "You have " + formatDecimalNormal(obj.amount) + " Free Electrons, providing a x" + formatDecimal(obj.value) + " production boost to Quark and Quark Spin Producers."}));

  player.nucleonstage.freeelectronproducers = [];
  player.nucleonstage.freeelectronproducers.push(new Producer("fep0", "Temp 1", new ExponentialCost(player.nucleonstage.nucleons, 1, 2), new LinearProduction(player.nucleonstage.freeelectrons, 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep1", "Temp 2", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[0], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep2", "Temp 3", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[1], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep3", "Temp 4", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[2], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep4", "Temp 5", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[3], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep5", "Temp 6", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[4], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep6", "Temp 7", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[5], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep7", "Temp 8", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[6], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep8", "Temp 9", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[7], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep9", "Temp 10", new ExponentialCost(player.nucleonstage.nucleons, 10, 2), new LinearProduction(player.nucleonstage.freeelectronproducers[8], 1, 0), null, "fep", null));

  player.nucleonstage.freeelectronupgrades = [];
  player.nucleonstage.freeelectronupgrades.push(new Upgrade("feu0", "Temp Upg 1", -1, null, [new ExponentialEffect(player.nucleonstage.freeelectronproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "[TEMP UPG 1] Power x" + formatDecimalOverride(obj.increase, 1) + " | Free Electron Production x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.freeelectrons, "1e3", 10)], "qsp"));

  player.nucleonstage.autoelectronproducer = new Producer("autoe", "Auto E", null, new LinearProduction(player.electronstage.electrons, 0));
  player.nucleonstage.autoelectronproducer.add(1);

  player.nucleonstage.upgrades = [];
  player.nucleonstage.upgrades.push(new Upgrade("pu3", "Electrify?",  1, null, new FunctionEffect(player.nucleonstage.autoelectronproducer, EffectTypes.ProducerBaseProduction, () => player.quarkstage.electrify.rewards[0].producedamount.divide(100), () => "Produce 1% of electron gain on electrify every second."), new StaticCost(player.nucleonstage.nucleons, "1e3"), "upg"));
}

function resetQuarkStage(){
  player.quarkstage.quarks.reset();
  player.quarkstage.producers.forEach((prod, i) => {
    prod.reset();
  });
  player.quarkstage.upgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
  player.quarkstage.singletonupgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
  updateeffects();
}

function resetElectronStage(){
  player.electronstage.electrons.reset();
  player.electronstage.upgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
  player.electronstage.quarkspin.reset();
  player.electronstage.quarkspinproducers.forEach((prod, i) => {
    prod.reset();
  });
  player.electronstage.quarkspinupgrades.forEach((prod, i) => {
    prod.reset();
  });
  updateeffects();
}

function totalproducerbought(producers){
  var amt = new Decimal();
  producers.forEach(prod => {
    amt = amt.add(prod.bought);
  });
  return amt;
}

function togglechallenge(challenge){
  console.log("Starting: " + challenge);
  if(challenge.in)
    challenge.exit();
  else
    challenge.start();
}

function resetchallenges(startind, endind){
  for(var i = startind; i < endind; i++){
    player.challenges[i].reset();
  }
  updateeffects();
}