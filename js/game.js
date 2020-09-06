currencyregistry = []
producerregistry = []
upgraderegistry = []
achievementregistry = []
updaterequiredregistry = []

function clamp(val1, val2){
  val1 = new Decimal(val1)
  if(val1.greaterThan(val2))
    return new Decimal(val2)

  else
    return val1
}

player = {
  quarkstage : {
  },
  electronstage : {
  },
  options : {
    buyamount : new Decimal(1)
  },
  achievements : [],
  stats : {
  }
}
//End UI

function formatDecimal(num){
  return notations[player.options.notation].format(num, player.options.notationdecimals, 2);
}

function formatDecimalOverride(num,dec){
  return notations[player.options.notation].format(num, dec, dec);
}

function formatDecimalNormal(num,dec){
  if(dec != undefined)
    return notations[player.options.notation].format(num, dec, 0);
  return notations[player.options.notation].format(num, 2, 0);
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

function setupQuarkStage(){
  player.quarkstage.quarks = new Currency("quark", "Quarks", "Quark", 10);
  player.quarkstage.producers = [];
  player.quarkstage.producers.push(new Producer("quarkgenone",     "Generator 1",  [new ExponentialCost(player.quarkstage.quarks, "10", 1.1)],          [new LinearProduction(player.quarkstage.quarks, "1")],null , "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgentwo",     "Generator 2",  [new ExponentialCost(player.quarkstage.quarks, "1e2", 1.1)],         [new LinearProduction(player.quarkstage.quarks, "9")],      [new NumRequirement(player.quarkstage.producers[0], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenthree",   "Generator 3",  [new ExponentialCost(player.quarkstage.quarks, "2.5e3", 1.1)],        [new LinearProduction(player.quarkstage.quarks, "225")],      [new NumRequirement(player.quarkstage.producers[1], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenfour",    "Generator 4",  [new ExponentialCost(player.quarkstage.quarks, "1e6", 1.1)],       [new LinearProduction(player.quarkstage.quarks, "5e3")],     [new NumRequirement(player.quarkstage.producers[2], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenfive",    "Generator 5",  [new ExponentialCost(player.quarkstage.quarks, "1e9", 1.1)],      [new LinearProduction(player.quarkstage.quarks, "1e6")],     [new NumRequirement(player.quarkstage.producers[3], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgensix",     "Generator 6",  [new ExponentialCost(player.quarkstage.quarks, "1e13", 1.1)],     [new LinearProduction(player.quarkstage.quarks, "8e8")],    [new NumRequirement(player.quarkstage.producers[4], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenseven",   "Generator 7",  [new ExponentialCost(player.quarkstage.quarks, "1e20", 1.1)],    [new LinearProduction(player.quarkstage.quarks, "1e13")],    [new NumRequirement(player.quarkstage.producers[5], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgeneight",   "Generator 8",  [new ExponentialCost(player.quarkstage.quarks, "1e40", 1.1)],   [new LinearProduction(player.quarkstage.quarks, "1e21")],   [new NumRequirement(player.quarkstage.producers[6], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgennine",    "Generator 9",  [new ExponentialCost(player.quarkstage.quarks, "1e75", 1.1)],  [new LinearProduction(player.quarkstage.quarks, "1e24")],  [new NumRequirement(player.quarkstage.producers[7], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenten",     "Generator 10", [new ExponentialCost(player.quarkstage.quarks, "1e120", 1.1)], [new LinearProduction(player.quarkstage.quarks, "1e30")], [new NumRequirement(player.quarkstage.producers[8], new Decimal(10))], "quarkgen"));

  player.quarkstage.upgrades = [];
  player.quarkstage.upgrades.push(new Upgrade("qu0", "Multiplier 1", -1, [new NumRequirement(player.quarkstage.producers[0],25)], [new LinearEffect(player.quarkstage.producers, 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,100,2)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu1", "Multiplier 2", -1, [new NumRequirement(player.quarkstage.producers[1],25),new NumRequirement(player.quarkstage.upgrades[0],10)], [new LinearEffect(player.quarkstage.producers, 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e5,2)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu2", "Multiplier 3", -1, [new NumRequirement(player.quarkstage.upgrades[1],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 1.25, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e7,4)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu3", "Multiplier 4", -1, [new NumRequirement(player.quarkstage.upgrades[2],10)], [new ExponentialEffect([player.quarkstage.producers[0],player.quarkstage.producers[1],player.quarkstage.producers[2],player.quarkstage.producers[3],player.quarkstage.producers[4]], 1, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-5")], [new ExponentialCost(player.quarkstage.quarks,1e10,15)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu4", "Multiplier 5", -1, [new NumRequirement(player.quarkstage.upgrades[3],10)], [new ExponentialEffect([player.quarkstage.producers[5],player.quarkstage.producers[6],player.quarkstage.producers[7],player.quarkstage.producers[8],player.quarkstage.producers[9]], 1, 4, EffectTypes.ProducerMultiplierProduction, "Quark Generators 6-10")], [new ExponentialCost(player.quarkstage.quarks,1e16,150)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu5", "Multiplier 6", -1, [new NumRequirement(player.quarkstage.upgrades[4],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e30,100)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu6", "Multiplier 7", -1, [new NumRequirement(player.quarkstage.upgrades[4],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 3, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e55,125)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu7", "Multiplier 8", -1, [new NumRequirement(player.quarkstage.upgrades[4],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 4, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e80,250)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu8", "Multiplier 9", -1, [new NumRequirement(player.quarkstage.upgrades[4],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 5, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e120,250)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("qu9", "Multiplier 10", -1, [new NumRequirement(player.quarkstage.upgrades[4],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 6, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e160,300)], "quarkupg"));
}

function resetQuarkStage(){
  player.quarkstage.quarks.reset();
  player.quarkstage.producers.forEach((prod, i) => {
    prod.reset();
  });
  player.quarkstage.upgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
}

function setupElectronStage(){
  player.electronstage.electrons = new Currency("electron", "Electrons", "Electron", 0);

  var electrongain = (amount) => {
    if(amount.lessThan(new Decimal("1e16")))
      return new Decimal();
    num = Decimal.floor(Decimal.max(Decimal.log(amount.divide(new Decimal("1e20")), 10), 1));
    num = Decimal.pow(num, Decimal.max(Decimal.log(amount.divide(new Decimal("1e40")), 100), 1))
    return num;
  }
  player.quarkstage.electrify = new Prestige("Electrify",player.electronstage.electrons, player.quarkstage.quarks, electrongain, (producedamount) => {if(producedamount.equals(0)) return; resetQuarkStage(); player.stats.electrified += 1; player.stats.past10electrifies.unshift([player.stats.currentelectrifytime, producedamount]); player.stats.past10electrifies.pop(); player.stats.currentelectrifytime = 0;})
  player.electronstage.upgradetree = [];

  player.electronstage.upgradetree.push(new Upgrade("eu0", "Twice The Speed!", 1, null, [new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators")], [new StaticCost(player.electronstage.electrons, 1)], null, {xpos: 0, ypos: 0, label: "x2", recbuy: true}));

  //Starts out at upgrade slot 1
  player.electronstage.upgradetree.push(new Upgrade("eu1", "A One", -1, [new NumRequirement(player.electronstage.upgradetree[0], 1)], [new LinearEffect(player.quarkstage.producers[0], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 1")], [new LinearCost(player.electronstage.electrons, 1, 1)], null, {xpos: 156, ypos: -112, label: "1+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu2", "A Two", -1, [new NumRequirement(player.electronstage.upgradetree[1], 1)], [new LinearEffect(player.quarkstage.producers[1], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 2")], [new LinearCost(player.electronstage.electrons, 2, 2)], null, {xpos: 454, ypos: -209, label: "2+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu3", "A Three", -1, [new NumRequirement(player.electronstage.upgradetree[2], 1)], [new LinearEffect(player.quarkstage.producers[2], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 3")], [new LinearCost(player.electronstage.electrons, 3, 3)], null, {xpos: 707, ypos: -393, label: "3+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu4", "A Four", -1, [new NumRequirement(player.electronstage.upgradetree[3], 1)], [new LinearEffect(player.quarkstage.producers[3], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 4")], [new LinearCost(player.electronstage.electrons, 4, 4)], null, {xpos: 891, ypos: -646, label: "4+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu5", "A Five", -1, [new NumRequirement(player.electronstage.upgradetree[4], 1)], [new LinearEffect(player.quarkstage.producers[4], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 5")], [new LinearCost(player.electronstage.electrons, 5, 5)], null, {xpos: 988, ypos: -944, label: "5+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu6", "A Six", -1, [new NumRequirement(player.electronstage.upgradetree[5], 1)], [new LinearEffect(player.quarkstage.producers[5], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 6")], [new LinearCost(player.electronstage.electrons, 6, 6)], null, {xpos: 988, ypos: -1256, label: "6+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu7", "A Seven", -1, [new NumRequirement(player.electronstage.upgradetree[6], 1)], [new LinearEffect(player.quarkstage.producers[6], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 7")], [new LinearCost(player.electronstage.electrons, 7, 7)], null, {xpos: 891, ypos: -1554, label: "7+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu8", "A Eight", -1, [new NumRequirement(player.electronstage.upgradetree[7], 1)], [new LinearEffect(player.quarkstage.producers[7], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 8")], [new LinearCost(player.electronstage.electrons, 8, 8)], null, {xpos: 707, ypos: -1807, label: "8+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu9", "A Nine", -1, [new NumRequirement(player.electronstage.upgradetree[8], 1)], [new LinearEffect(player.quarkstage.producers[8], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 9")], [new LinearCost(player.electronstage.electrons, 9, 9)], null, {xpos: 454, ypos: -1991, label: "9+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu10", "A Ten", -1, [new NumRequirement(player.electronstage.upgradetree[9], 1)], [new LinearEffect(player.quarkstage.producers[9], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 10")], [new LinearCost(player.electronstage.electrons, 10, 10)], null, {xpos: 156, ypos: -2088
, label: "10+"}));

  //Starts out at upgrade slot 11
  player.electronstage.upgradetree.push(new Upgrade("eu11", "Price Decrease 1", 1, [new NumRequirement(player.electronstage.upgradetree[0], 1)], new StaticEffect(player.quarkstage.producers[0], .9, EffectTypes.PriceScaling, "Quark Generator 1"), new StaticCost(player.electronstage.electrons, 5), null, {xpos: -156, ypos: -112, label: "1d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu12", "Price Decrease 2", 1, [new NumRequirement(player.electronstage.upgradetree[11], 1)], new StaticEffect(player.quarkstage.producers[1], .9, EffectTypes.PriceScaling, "Quark Generator 2"), new StaticCost(player.electronstage.electrons, 10), null, {xpos: -454, ypos: -209, label: "2d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu13", "Price Decrease 3", 1, [new NumRequirement(player.electronstage.upgradetree[12], 1)], new StaticEffect(player.quarkstage.producers[2], .9, EffectTypes.PriceScaling, "Quark Generator 3"), new StaticCost(player.electronstage.electrons, 15), null, {xpos: -707, ypos: -393, label: "3d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu14", "Price Decrease 4", 1, [new NumRequirement(player.electronstage.upgradetree[13], 1)], new StaticEffect(player.quarkstage.producers[3], .9, EffectTypes.PriceScaling, "Quark Generator 4"), new StaticCost(player.electronstage.electrons, 20), null, {xpos: -891, ypos: -646, label: "4d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu15", "Price Decrease 5", 1, [new NumRequirement(player.electronstage.upgradetree[14], 1)], new StaticEffect(player.quarkstage.producers[4], .9, EffectTypes.PriceScaling, "Quark Generator 5"), new StaticCost(player.electronstage.electrons, 25), null, {xpos: -988, ypos: -944, label: "5d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu16", "Price Decrease 6", 1, [new NumRequirement(player.electronstage.upgradetree[15], 1)], new StaticEffect(player.quarkstage.producers[5], .9, EffectTypes.PriceScaling, "Quark Generator 6"), new StaticCost(player.electronstage.electrons, 30), null, {xpos: -988, ypos: -1256, label: "6d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu17", "Price Decrease 7", 1, [new NumRequirement(player.electronstage.upgradetree[16], 1)], new StaticEffect(player.quarkstage.producers[6], .9, EffectTypes.PriceScaling, "Quark Generator 7"), new StaticCost(player.electronstage.electrons, 35), null, {xpos: -891, ypos: -1554, label: "7d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu18", "Price Decrease 8", 1, [new NumRequirement(player.electronstage.upgradetree[17], 1)], new StaticEffect(player.quarkstage.producers[7], .9, EffectTypes.PriceScaling, "Quark Generator 8"), new StaticCost(player.electronstage.electrons, 40), null, {xpos: -707, ypos: -1807, label: "8d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu19", "Price Decrease 9", 1, [new NumRequirement(player.electronstage.upgradetree[18], 1)], new StaticEffect(player.quarkstage.producers[8], .9, EffectTypes.PriceScaling, "Quark Generator 9"), new StaticCost(player.electronstage.electrons, 45), null, {xpos: -454, ypos: -1991, label: "9d"}));
  player.electronstage.upgradetree.push(new Upgrade("eu20", "Price Decrease 10", 1, [new NumRequirement(player.electronstage.upgradetree[19], 1)], new StaticEffect(player.quarkstage.producers[9], .9, EffectTypes.PriceScaling, "Quark Generator 10"), new StaticCost(player.electronstage.electrons, 50), null, {xpos: -156, ypos: -2088
, label: "10d"}));

  player.electronstage.upgradetree.push(new Upgrade("eu21", "EVENS?", 1, [new NumRequirement(player.electronstage.upgradetree[2], 1),new NumRequirement(player.electronstage.upgradetree[12], 1)], [new LinkedLinearEffect(getevery(player.quarkstage.producers,2,0,1), () => {return player.stats.electrified}, 1, .25, EffectTypes.ProducerMultiplierProduction, "Even Quark Generators", (obj) => {return "Multiplies even quark generators by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";})], [new StaticCost(player.electronstage.electrons, 12)], null, {xpos: 0, ypos: -224, label: "E+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu22", "ODDS?", 1, [new NumRequirement(player.electronstage.upgradetree[1], 1),new NumRequirement(player.electronstage.upgradetree[11], 1)], [new LinkedLinearEffect(getevery(player.quarkstage.producers,2,1,1), () => {return player.stats.electrified}, 1, .25, EffectTypes.ProducerMultiplierProduction, "Even Quark Generators", (obj) => {return "Multiplies odd quark generators by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";})], [new StaticCost(player.electronstage.electrons, 9)], null, {xpos: 0, ypos: -150, label: "O+"}));

  var allelextronringrequirements = () => {var arr = []; for(i = 1; i < 21;i++ )arr.push(new NumRequirement(player.electronstage.upgradetree[i], 1)); return arr;}
  player.electronstage.upgradetree.push(new Upgrade("eu23", "New Layer", 1, allelextronringrequirements(), [new FlavorEffect("Unlocks Protify")], [new StaticCost(player.electronstage.electrons, "1e24")], null, {xpos: 0, ypos: -1100, label: "PP"}));

  //starts at index 24
  player.electronstage.upgradetree.push(new Upgrade("eu24", "Getting Spicy", -1, new NumRequirement(player.electronstage.upgradetree[0], 1), new LinearEffect(player.quarkstage.producers, 1, .1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 1, 1), null, {xpos: 156, ypos: 112, label: "a1+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu25", "Getting Spicier", -1, new NumRequirement(player.electronstage.upgradetree[24], 1), new LinearEffect(player.quarkstage.producers, 1, .2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 2, 2), null, {xpos: 454, ypos: 209, label: "a2+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu26", "Getting Spiciest", -1, new NumRequirement(player.electronstage.upgradetree[25], 1), new LinearEffect(player.quarkstage.producers, 1, .3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 3, 3), null, {xpos: 707, ypos: 393, label: "a3+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu27", "Getting Spiciestest", -1, new NumRequirement(player.electronstage.upgradetree[26], 1), new LinearEffect(player.quarkstage.producers, 1, .4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 4, 4), null, {xpos: 891, ypos: 646, label: "a4+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu28", "Getting Spiciestestest", -1, new NumRequirement(player.electronstage.upgradetree[27], 1), new LinearEffect(player.quarkstage.producers, 1, .5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 5, 5), null, {xpos: 988, ypos: 944, label: "a5+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu29", "Getting Spiciest(est)x3", -1, new NumRequirement(player.electronstage.upgradetree[28], 1), new LinearEffect(player.quarkstage.producers, 1, .6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 6, 6), null, {xpos: 988, ypos: 1256, label: "a6+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu30", "Getting Spiciest(est)x4", -1, new NumRequirement(player.electronstage.upgradetree[29], 1), new LinearEffect(player.quarkstage.producers, 1, .7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 7, 7), null, {xpos: 891, ypos: 1554, label: "a7+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu31", "Getting Spiciest(est)x5", -1, new NumRequirement(player.electronstage.upgradetree[30], 1), new LinearEffect(player.quarkstage.producers, 1, .8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 8, 8), null, {xpos: 707, ypos: 1807, label: "a8+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu32", "Getting Spiciest(est)x6", -1, new NumRequirement(player.electronstage.upgradetree[31], 1), new LinearEffect(player.quarkstage.producers, 1, .9, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 9, 9), null, {xpos: 454, ypos: 1991, label: "a9+"}));
  player.electronstage.upgradetree.push(new Upgrade("eu33", "Getting Spiciest(est)x7", -1, new NumRequirement(player.electronstage.upgradetree[32], 1), new LinearEffect(player.quarkstage.producers, 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 10, 10), null, {xpos: 156, ypos: 2088, label: "a10+"}));

  //starts at index 34
  player.electronstage.upgradetree.push(new Upgrade("eu34", "Truly Getting Spicy", -1, new NumRequirement(player.electronstage.upgradetree[0], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 10, 2), null, {xpos: -156, ypos: 112, label: "a1x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu35", "Truly Getting Spicier", -1, new NumRequirement(player.electronstage.upgradetree[34], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 20, 3), null, {xpos: -454, ypos: 209, label: "a2x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu36", "Truly Getting Spiciest", -1, new NumRequirement(player.electronstage.upgradetree[35], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 30, 4), null, {xpos: -707, ypos: 393, label: "a3x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu37", "Truly Getting Spiciestest", -1, new NumRequirement(player.electronstage.upgradetree[36], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 40, 5), null, {xpos: -891, ypos: 646, label: "a4x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu38", "Truly Getting Spiciestestest", -1, new NumRequirement(player.electronstage.upgradetree[37], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 50, 6), null, {xpos: -988, ypos: 944, label: "a5x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu39", "Truly Getting Spiciest(est)x3", -1, new NumRequirement(player.electronstage.upgradetree[38], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 60, 7), null, {xpos: -988, ypos: 1256, label: "a6x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu40", "Truly Getting Spiciest(est)x4", -1, new NumRequirement(player.electronstage.upgradetree[39], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 70, 8), null, {xpos: -891, ypos: 1554, label: "a7x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu41", "Truly Getting Spiciest(est)x5", -1, new NumRequirement(player.electronstage.upgradetree[40], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 80, 9), null, {xpos: -707, ypos: 1807, label: "a8x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu42", "Truly Getting Spiciest(est)x6", -1, new NumRequirement(player.electronstage.upgradetree[41], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.9, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 90, 10), null, {xpos: -454, ypos: 1991, label: "a9x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu43", "Truly Getting Spiciest(est)x7", -1, new NumRequirement(player.electronstage.upgradetree[42], 1), new ExponentialEffect(player.quarkstage.producers, 1, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 100, 11), null, {xpos: -156, ypos: 2088, label: "a10x"}));

  //starts at index 44
  player.electronstage.upgradetree.push(new Upgrade("eu44", "x1.5 POG", 1, new NumRequirement(player.electronstage.upgradetree[34], 1), new StaticEffect(player.quarkstage.producers, 1.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e6"), null, {xpos: -141, ypos: 211, label: "1.5x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu45", "x2 POG", 1, [new NumRequirement(player.electronstage.upgradetree[35], 1),new NumRequirement(player.electronstage.upgradetree[44], 1)], new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e7"), null, {xpos: -409, ypos: 298, label: "2x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu46", "x2.5 POG", 1, [new NumRequirement(player.electronstage.upgradetree[36], 1),new NumRequirement(player.electronstage.upgradetree[45], 1)], new StaticEffect(player.quarkstage.producers, 2.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e8"), null, {xpos: -636, ypos: 464, label: "2.5x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu47", "x3 POG", 1, [new NumRequirement(player.electronstage.upgradetree[37], 1),new NumRequirement(player.electronstage.upgradetree[46], 1)], new StaticEffect(player.quarkstage.producers, 3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e9"), null, {xpos: -802, ypos: 691, label: "3x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu48", "x3.5 POG", 1, [new NumRequirement(player.electronstage.upgradetree[38], 1),new NumRequirement(player.electronstage.upgradetree[47], 1)], new StaticEffect(player.quarkstage.producers, 3.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "5e10"), null, {xpos: -889, ypos: 959, label: "3.5x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu49", "x4 POG", 1, [new NumRequirement(player.electronstage.upgradetree[39], 1),new NumRequirement(player.electronstage.upgradetree[48], 1)], new StaticEffect(player.quarkstage.producers, 4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e12"), null, {xpos: -889, ypos: 1241, label: "4x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu50", "x5 POG", 1, [new NumRequirement(player.electronstage.upgradetree[40], 1),new NumRequirement(player.electronstage.upgradetree[49], 1)], new StaticEffect(player.quarkstage.producers, 5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e14"), null, {xpos: -802, ypos: 1509, label: "5x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu51", "x6 POG", 1, [new NumRequirement(player.electronstage.upgradetree[41], 1),new NumRequirement(player.electronstage.upgradetree[50], 1)], new StaticEffect(player.quarkstage.producers, 6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e16"), null, {xpos: -636, ypos: 1736, label: "6x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu52", "x7 POG", 1, [new NumRequirement(player.electronstage.upgradetree[42], 1),new NumRequirement(player.electronstage.upgradetree[51], 1)], new StaticEffect(player.quarkstage.producers, 7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e18"), null, {xpos: -409, ypos: 1902, label: "7x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu53", "x8 POG", 1, [new NumRequirement(player.electronstage.upgradetree[43], 1),new NumRequirement(player.electronstage.upgradetree[52], 1)], new StaticEffect(player.quarkstage.producers, 8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e21"), null, {xpos: -141, ypos: 1989, label: "8x"}));
  player.electronstage.upgradetree.push(new Upgrade("eu54", "x10 POG", 1, [new NumRequirement(player.electronstage.upgradetree[53], 1)], new StaticEffect(player.quarkstage.producers, 10, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e24"), null, {xpos: 0, ypos: 1989, label: "10x"}));

  //starts at index 55
  player.electronstage.upgradetree.push(new Upgrade("eu56", "Ahh Take Another", 1, [new NumRequirement(player.electronstage.upgradetree[24], 1)], new StaticEffect(player.quarkstage.electrify, 1, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "1"), null, {xpos: 141, ypos: 211, label: "+1e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu55", "Add A Litte Flavor", 1, [new NumRequirement(player.electronstage.upgradetree[25], 1),new NumRequirement(player.electronstage.upgradetree[55], 1)], new LinkedLinearEffect(player.quarkstage.electrify, () => { return player.stats.electrified }, 0, .1, EffectTypes.PrestigeCurrencyBaseGain, "", (obj) => {return "Electrons gained on electify +" + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";}), new StaticCost(player.electronstage.electrons, "25"), null, {xpos: 409, ypos: 298, label: "+1e"}));
  //player.electronstage.upgradetree.push(new Upgrade("eu56", "Add A Litte Flavor", 1, new NumRequirement(player.electronstage.upgradetree[24], 1), new StaticEffect(player.quarkstage.electrify, 1, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "2"), null, {xpos: 141, ypos: 211, label: "+1e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu57", "Heh Its Better", 1, [new NumRequirement(player.electronstage.upgradetree[26], 1),new NumRequirement(player.electronstage.upgradetree[56], 1)], new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "50"), null, {xpos: 636, ypos: 464, label: "+2e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu58", "Once Again Better", 1, [new NumRequirement(player.electronstage.upgradetree[27], 1),new NumRequirement(player.electronstage.upgradetree[57], 1)], new StaticEffect(player.quarkstage.electrify, 5, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "250"), null, {xpos: 802, ypos: 691, label: "+5e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu59", "Slightly More, But Is It Required", 1, [new NumRequirement(player.electronstage.upgradetree[28], 1),new NumRequirement(player.electronstage.upgradetree[58], 1)], new StaticEffect(player.quarkstage.electrify, 10, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e3"), null, {xpos: 889, ypos: 959, label: "+10e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu60", "Spoiler Yes Yes It Is", 1, [new NumRequirement(player.electronstage.upgradetree[29], 1),new NumRequirement(player.electronstage.upgradetree[59], 1)], new StaticEffect(player.quarkstage.electrify, 10, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "2.5e3"), null, {xpos: 889, ypos: 1241, label: "+10e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu61", "Electron Multipliers Nice", 1, [new NumRequirement(player.electronstage.upgradetree[30], 1),new NumRequirement(player.electronstage.upgradetree[60], 1)], new StaticEffect(player.quarkstage.electrify, 1.1, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e5"), null, {xpos: 802, ypos: 1509, label: "x1.1e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu62", "Its Getting There", 1, [new NumRequirement(player.electronstage.upgradetree[31], 1),new NumRequirement(player.electronstage.upgradetree[61], 1)], new StaticEffect(player.quarkstage.electrify, 1.25, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e7"), null, {xpos: 636, ypos: 1736, label: "x1.25e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu63", "Slightly Better Than The Last", 1, [new NumRequirement(player.electronstage.upgradetree[32], 1),new NumRequirement(player.electronstage.upgradetree[62], 1)], new StaticEffect(player.quarkstage.electrify, 1.5, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e11"), null, {xpos: 409, ypos: 1902, label: "x1.5e"}));
  player.electronstage.upgradetree.push(new Upgrade("eu64", "And This One Grows", 1, [new NumRequirement(player.electronstage.upgradetree[33], 1),new NumRequirement(player.electronstage.upgradetree[63], 1)], new ExponentialEffect(player.quarkstage.electrify, 1, 2, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new ExponentialCost(player.electronstage.electrons, "1e20", 10), null, {xpos: 141, ypos: 1989, label: "x2e"}));


  player.electronstage.upgradetree.push(new Upgrade("eu65", "Add A Litte Flavor", 1, new NumRequirement(player.electronstage.upgradetree[0], 1), new LinkedLinearEffect(player.quarkstage.producers, () => { num = new Decimal(); player.quarkstage.producers.forEach((prod, i) => {num = num.add(prod.bought)}); return num; }, 1, .01, EffectTypes.ProducerMultiplierProduction, "", (obj) => {return "Multiply Quark Generators production by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per bought quark generator).";}), new StaticCost(player.electronstage.electrons, "10"), null, {xpos: 0, ypos: 224, label: "QG"}));
  player.electronstage.upgradetree.push(new Upgrade("eu66", "Add A Litte Flavor", 1, new NumRequirement(player.electronstage.upgradetree[65], 1), new LinkedExponentialEffect(player.quarkstage.producers, () => { num = new Decimal(); player.quarkstage.producers.forEach((prod, i) => {num = num.add(prod.bought)}); return num; }, 1, 1.001, EffectTypes.ProducerMultiplierProduction, "", (obj) => {return "Multiply Quark Generators production by " + formatDecimalOverride(obj.value, 3) + "(x" + formatDecimalOverride(obj.increase, 3) +" per bought quark generator).";}), new StaticCost(player.electronstage.electrons, "1000"), null, {xpos: 0, ypos: 324, label: "*QG"}));

  player.electronstage.upgradetree.push(new Upgrade("eu67", "Yep Something Newwwww", 1, new NumRequirement(player.electronstage.upgradetree[0], 1), new FlavorEffect("Unlocks some new producers (only buy if you have at least 11 electrons)"), new StaticCost(player.electronstage.electrons, "1"), null, {xpos: -1500, ypos: 0, label: "QS"}));

  var spinmult = (amount) => {
    num = new Decimal(1).add(Decimal.log(amount,10));
    num = Decimal.pow(num,3);
    num = Decimal.pow(num, Decimal.max(Decimal.log(amount.divide(new Decimal(1e10))), 1));
    return num;
  }
  player.electronstage.quarkspin = new Upgrade("quarkspin", "Quark Spin", 0, [new NumRequirement(player.electronstage.upgradetree[67], 1)], new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, spinmult, (obj) => {return "You have " + formatDecimalNormal(obj.amount) + " Quark Spin, providing a x" + formatDecimal(obj.value) + " to Quark Producers."}));

  player.electronstage.quarkspinproducers = [];
  player.electronstage.quarkspinproducers.push(new Producer("qs1", "Spinner 1", [new ExponentialCost(player.electronstage.electrons, "10", 4)], [new LinearProduction(player.electronstage.quarkspin, "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs2", "Spinner 2", [new ExponentialCost(player.electronstage.electrons, "1e5", 4)], [new LinearProduction(player.electronstage.quarkspinproducers[0], ".001")], null, "spingen"));

  player.electronstage.electronupgradelinetree = new LineTree(dumplines(player.electronstage.upgradetree, 64), "electronupgrades");
}

function resetElectronStage(){
  player.electronstage.electrons.reset();
  player.electronstage.upgradetree.forEach((upgrade, i) => {
    upgrade.reset();
  });
}

function resetstats(){
  player.stats = shallowcopy(settings.defaultstats);
}

function shallowcopy(obj){
  return JSON.parse(JSON.stringify(obj));
}

function setupachievements(){
  player.achievements.push(new Achievement("onequarkgenone", "Get A Quark Gen 1", [new NumRequirement(player.quarkstage.producers[0], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgentwo", "Get A Quark Gen 2", [new NumRequirement(player.quarkstage.producers[1], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenthree", "Get A Quark Gen 3", [new NumRequirement(player.quarkstage.producers[2], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenfour", "Get A Quark Gen 4", [new NumRequirement(player.quarkstage.producers[3], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenfive", "Get A Quark Gen 5", [new NumRequirement(player.quarkstage.producers[4], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgensix", "Get A Quark Gen 6", [new NumRequirement(player.quarkstage.producers[5], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenseven", "Get A Quark Gen 7", [new NumRequirement(player.quarkstage.producers[6], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgeneight", "Get A Quark Gen 8", [new NumRequirement(player.quarkstage.producers[7], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgennine", "Get A Quark Gen 9", [new NumRequirement(player.quarkstage.producers[8], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenten", "Get A Quark Gen 10", [new NumRequirement(player.quarkstage.producers[9], 1)], null, [new FlavorEffect("IDK a fleeting sense of accomplishment! Maybe?")], ["hiderequirements"]));
  player.achievements.push(new Achievement("electrifyunlock", "Electrify", [new NumRequirement(player.quarkstage.quarks, "1e16")], null, [new FlavorEffect("Unlocks electrify for all your wonderful electron needs!")]));
}

function resetachievements(){
  achievementregistry.forEach((achieve, i) => {
    achieve.reset();
  });

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

setupQuarkStage();
setupElectronStage();
setupachievements();

function setbuyamount(type, num){
  player.options.buyamounts[type] = new Decimal(num);
  producerregistry.forEach((prod, i) => {
    prod.recalculatecosts();
  });
  upgraderegistry.forEach((upgr, i) => {
    upgr.recalculatecosts();
  });
}

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
  player.stats.currentelectrifytime += 1;
  achievementtick();
  produce();
  //lengthCalculator();
  calculatePerSecond(player.quarkstage.quarks);
  updaterequiredregistry.forEach((item, i) => {
    item.tick();
  });
  tickspersecactual = Math.min(1000/(((new Date()).getTime()-starttime)+1),20);
}

function hasachievement(achieveid){
  var has = false
  achievementregistry.forEach((achieve, i) => {
    if(achieve.id == achieveid){
      has = achieve.unlocked;
      return;
    }
  });
  return has;
}

function achievementtick(){
  achievementregistry.forEach((achieve, i) => {
    achieve.check();
  });

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
  savestats();
  saveachievements();
}

function saveachievements(){
  achievements = [];
  achievementregistry.forEach((achieve, i) => {
    if(achieve.unlocked){
      achievements.push(achieve.id);
    }
  });
  savedata["achievements"] = achievements;
}

function saveQuarkStage(){
  data = {};
  data.currencies = {};
  data.producers = {};
  data.upgrades = {};
  currencyregistry.forEach(element => {
    data.currencies[element.id.toString()] = element.saveData;
  });
  producerregistry.forEach(element => {
    data.producers[element.id.toString()] = element.saveData;
  });
  upgraderegistry.forEach((upgrade, i) => {
    data.upgrades[upgrade.id.toString()] = upgrade.saveData;
  });

  savedata["game"] = data;
}

function loadQuarkStage(){
  data = loadeddata["game"]
  if(data == undefined)
  return;
  if(data.currencies != undefined){
    currencyregistry.forEach(element => {
      element.parse(data.currencies[element.id]);
    });
  }
  if(data.producers != undefined){
    producerregistry.forEach(element => {
      element.parse(data.producers[element.id]);
    });
  }
  if(data.upgrades != undefined){
    upgraderegistry.forEach(element => {
      element.parse(data.upgrades[element.id]);
    });
  }
}

function loadplayer(){
  loadoptions();
  loadstats();
  loadQuarkStage();
  loadachievements();
}

function loadachievements(){
  achievements = loadeddata["achievements"]
  if(achievements != null && achievements != undefined)
    achievementregistry.forEach((achieve, i) => {
      achieve.parse(achievements);
    });
}

function saveoptions(){
  savedata["playeroptions"] = player.options;
}

function savestats(){
  savedata["playerstats"] = player.stats;
}

function loadoptions(){
  options = loadeddata["playeroptions"]
  player.options = shallowcopy(settings.defaultoptions);
  if(options != null && options != undefined)
    for(let [key,value] of Object.entries(options)){
      if(key in player.options)
        player.options[key] = value;
    }
  player.options.buyamounts = settings.defaultoptions.buyamounts;
  if(options != undefined){
    if(options.buyamounts != undefined){
      for(let [key,value] of Object.entries(options.buyamounts)){
        if(key in player.options.buyamounts)
          player.options.buyamounts[key] = Decimal.fromString(value);
      }
    }
  }
}

function loadstats(){
  stats = loadeddata["playerstats"]
  player.stats = shallowcopy(settings.defaultstats);
  if(stats != null && stats != undefined)
    for(let [key,value] of Object.entries(stats)){
      player.stats[key] = value;
    }
}

scrollingscale = .001;
function scalediv(event, id){
  event.preventDefault();

  element = document.getElementById(id + "content");
  translatelist = gettranslate(element);
  scalelist = getscale(element);
  scalelist[0] = Math.min(Math.max(.125, scalelist[0] + -scrollingscale * event.deltaY), 4);
  scalelist[1] = Math.min(Math.max(.125, scalelist[1] + -scrollingscale * event.deltaY), 4);

  transform = getnewtransform(scalelist, translatelist);

  element.style.transform = transform;
  element.style.webkitTransform = transform;
  element.style.msTransform = transform;
}

movingobjid = "";
movingobjx = 0;
movingobjy = 0;

function startmovingobject(event, id){
  movingobjid = id;
  movingobjx = event.x;
  movingobjy = event.y;
}

function stopmovingobject(id){
  if(movingobjid == id)
    movingobjid = "";
}

function movingobject(event, id){
  event.preventDefault();
  if(id == movingobjid){
    element = document.getElementById(id + "content");
    translatelist = gettranslate(element);
    translatelist[0] += event.x - movingobjx;
    translatelist[1] += event.y - movingobjy;
    movingobjx = event.x;
    movingobjy = event.y;
    scalelist = getscale(element);

    transform = getnewtransform(scalelist, translatelist);

    element.style.transform = transform;
    element.style.webkitTransform = transform;
    element.style.msTransform = transform;
  }
}

function recenter(id){
  element = document.getElementById(id + "content");
  translatelist = [0,0];
  scalelist = [1,1];

  transform = getnewtransform(scalelist, translatelist);

  element.style.transform = transform;
  element.style.webkitTransform = transform;
  element.style.msTransform = transform;
}

function getscale(element){
  var matrix = window.getComputedStyle(element).transform;
  var matrixarray = matrix.replace("matrix(", "").split(",");
  var scalex = parseFloat(matrixarray[0]);
  if(Number.isNaN(scalex))
    scalex = 1;
  var scaley = parseFloat(matrixarray[3]);
  if(Number.isNaN(scaley))
    scaley = 1;
  return [scalex, scaley];
}

function gettranslate(element){
  var matrix = window.getComputedStyle(element).transform;
  var matrixarray = matrix.replace("matrix(", "").split(",");
  var translatex = parseFloat(matrixarray[4]);
  if(Number.isNaN(translatex))
    translatex = 0;
  var translatey = parseFloat(matrixarray[5]);
  if(Number.isNaN(translatey))
    translatey = 0;
  return [translatex, translatey];
}

function getnewtransform(scalelist, translatelist){
  return `matrix(${scalelist[0]}, 0, 0, ${scalelist[1]}, ${translatelist[0]}, ${translatelist[1]})`
}

function save(){
  savedata = {}
  saveplayer()
  localStorage.setItem('subatomicidlingsave',JSON.stringify(savedata))
}

function load(){
  loadeddata = JSON.parse(localStorage.getItem('subatomicidlingsave'))
  if(loadeddata == undefined){
    loadeddata = {};
  }
  loadplayer();
  updateafterplayer();
}

load()

recalculateCurrencyPerSec();

gameLogicIntervalID = setInterval(() => {
  gameLogicTick();
  save();
  highlightOptimalQuarkBuy();
}, 1000/settings.logictickspersecond);

function reset(){
  if(confirm("Completely Reset Save?")){
    resetQuarkStage();
    resetElectronStage();
    resetstats();
    resetachievements();
  }
}

updateafterplayer();

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

function fixsave(){
  clearInterval(gameLogicIntervalID);
  localStorage.removeItem('subatomicidlingsave');
  window.location.reload(false);
}
