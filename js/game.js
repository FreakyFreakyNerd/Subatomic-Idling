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

function setupQuarkStage(){
  player.quarkstage.quarks = new Currency("quarks", "Quarks", "Quark", 10);
  player.quarkstage.producers = [];
  player.quarkstage.producers.push(new Producer("quarkgenone",     "Generator 1",  [new ExponentialCost(player.quarkstage.quarks, 5, 1.1)],          [new LinearProduction(player.quarkstage.quarks, .5)],null , "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgentwo",     "Generator 2",  [new ExponentialCost(player.quarkstage.quarks, 50, 1.1)],         [new LinearProduction(player.quarkstage.quarks, 1)],      [new NumRequirement(player.quarkstage.producers[0], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenthree",   "Generator 3",  [new ExponentialCost(player.quarkstage.quarks, 500, 1.1)],        [new LinearProduction(player.quarkstage.quarks, 2)],      [new NumRequirement(player.quarkstage.producers[1], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenfour",    "Generator 4",  [new ExponentialCost(player.quarkstage.quarks, 5000, 1.1)],       [new LinearProduction(player.quarkstage.quarks, 10)],     [new NumRequirement(player.quarkstage.producers[2], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenfive",    "Generator 5",  [new ExponentialCost(player.quarkstage.quarks, 50000, 1.1)],      [new LinearProduction(player.quarkstage.quarks, 50)],     [new NumRequirement(player.quarkstage.producers[3], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgensix",     "Generator 6",  [new ExponentialCost(player.quarkstage.quarks, 500000, 1.1)],     [new LinearProduction(player.quarkstage.quarks, 100)],    [new NumRequirement(player.quarkstage.producers[4], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenseven",   "Generator 7",  [new ExponentialCost(player.quarkstage.quarks, 5000000, 1.1)],    [new LinearProduction(player.quarkstage.quarks, 500)],    [new NumRequirement(player.quarkstage.producers[5], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgeneight",   "Generator 8",  [new ExponentialCost(player.quarkstage.quarks, 50000000, 1.1)],   [new LinearProduction(player.quarkstage.quarks, 5000)],   [new NumRequirement(player.quarkstage.producers[6], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgennine",    "Generator 9",  [new ExponentialCost(player.quarkstage.quarks, 500000000, 1.1)],  [new LinearProduction(player.quarkstage.quarks, 25000)],  [new NumRequirement(player.quarkstage.producers[7], new Decimal(10))], "quarkgen"));
  player.quarkstage.producers.push(new Producer("quarkgenten",     "Generator 10", [new ExponentialCost(player.quarkstage.quarks, 5000000000, 1.1)], [new LinearProduction(player.quarkstage.quarks, 100000)], [new NumRequirement(player.quarkstage.producers[8], new Decimal(10))], "quarkgen"));

  player.quarkstage.upgrades = [];
  player.quarkstage.upgrades.push(new Upgrade("allquarkgenupgradelinearone", "Multiplier 1", -1, [new NumRequirement(player.quarkstage.producers[0],25)], [new LinearEffect(player.quarkstage.producers, 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,100,2)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("allquarkgenupgradelineartwo", "Multiplier 2", -1, [new NumRequirement(player.quarkstage.upgrades[0],10)], [new LinearEffect(player.quarkstage.producers, 1, 10, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e5,2)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("allquarkgenupgradeexponentialone", "Multiplier 3", -1, [new NumRequirement(player.quarkstage.upgrades[1],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 1.25, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e7,4)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("quarkgen1-5upgradeexponentialone", "Multiplier 4", -1, [new NumRequirement(player.quarkstage.upgrades[2],10)], [new ExponentialEffect([player.quarkstage.producers[0],player.quarkstage.producers[1],player.quarkstage.producers[2],player.quarkstage.producers[3],player.quarkstage.producers[4]], 1, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-5")], [new ExponentialCost(player.quarkstage.quarks,1e10,10)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("quarkgen6-10upgradeexponentialone", "Multiplier 5", -1, [new NumRequirement(player.quarkstage.upgrades[3],10)], [new ExponentialEffect([player.quarkstage.producers[5],player.quarkstage.producers[6],player.quarkstage.producers[7],player.quarkstage.producers[8],player.quarkstage.producers[9]], 1, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators 6-10")], [new ExponentialCost(player.quarkstage.quarks,1e16,100)], "quarkupg"));
  player.quarkstage.upgrades.push(new Upgrade("allquarkgenupgradeexponentialtwo", "Multiplier 6", -1, [new NumRequirement(player.quarkstage.upgrades[4],10)], [new ExponentialEffect(player.quarkstage.producers, 1, 2.2, EffectTypes.ProducerMultiplierProduction, "Quark Generators 1-10")], [new ExponentialCost(player.quarkstage.quarks,1e30,100)], "quarkupg"));
}

function resetQuarkStage(){
  console.log(player.quarkstage.producers)
  player.quarkstage.quarks.reset();
  player.quarkstage.producers.forEach((prod, i) => {
    prod.reset();
  });
  player.quarkstage.upgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
}

function setupElectronStage(){
  player.electronstage.electrons = new Currency("electrons", "Electrons", "Electron", 0);
  player.quarkstage.electrify = new Prestige("Electrify",player.electronstage.electrons, player.quarkstage.quarks, (amount) => {if(amount.lessThan(new Decimal("1e16"))) return new Decimal(); return Decimal.floor(new Decimal(1).add(Decimal.max(Decimal.log(amount.divide(new Decimal("1e20")), 10), 0)))}, (producedamount) => {if(producedamount.equals(0)) return; resetQuarkStage(); player.stats.electrified += 1; player.stats.past10electrifies.unshift([player.stats.electrifyticks, this.producedcurrencyamount]); player.stats.past10electrifies.pop(); player.stats.currentelectrifytime = 0;})
  player.electronstage.upgradetree = [];

  //q -> quarks, g -> generator, e -> electron, p -> production, d -> scaling price decrease

  player.electronstage.upgradetree.push(new Upgrade("qgep1", "Twice The Speed!", 1, null, [new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators")], [new StaticCost(player.electronstage.electrons, 1)], null, {xpos: 0, ypos: 0, label: "x2"}));

  //Starts out at upgrade slot 1
  player.electronstage.upgradetree.push(new Upgrade("qg1ep1", "A One", -1, [new NumRequirement(player.electronstage.upgradetree[0], 1)], [new LinearEffect(player.quarkstage.producers[0], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 1")], [new LinearCost(player.electronstage.electrons, 1, 1)], null, {xpos: 156, ypos: -112, label: "1+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg2ep1", "A Two", -1, [new NumRequirement(player.electronstage.upgradetree[1], 1)], [new LinearEffect(player.quarkstage.producers[1], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 2")], [new LinearCost(player.electronstage.electrons, 2, 2)], null, {xpos: 454, ypos: -209, label: "2+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg3ep1", "A Three", -1, [new NumRequirement(player.electronstage.upgradetree[2], 1)], [new LinearEffect(player.quarkstage.producers[2], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 3")], [new LinearCost(player.electronstage.electrons, 3, 3)], null, {xpos: 707, ypos: -393, label: "3+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg4ep1", "A Four", -1, [new NumRequirement(player.electronstage.upgradetree[3], 1)], [new LinearEffect(player.quarkstage.producers[3], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 4")], [new LinearCost(player.electronstage.electrons, 4, 4)], null, {xpos: 891, ypos: -646, label: "4+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg5ep1", "A Five", -1, [new NumRequirement(player.electronstage.upgradetree[4], 1)], [new LinearEffect(player.quarkstage.producers[4], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 5")], [new LinearCost(player.electronstage.electrons, 5, 5)], null, {xpos: 988, ypos: -944, label: "5+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg6ep1", "A Six", -1, [new NumRequirement(player.electronstage.upgradetree[5], 1)], [new LinearEffect(player.quarkstage.producers[5], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 6")], [new LinearCost(player.electronstage.electrons, 6, 6)], null, {xpos: 988, ypos: -1256, label: "6+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg7ep1", "A Seven", -1, [new NumRequirement(player.electronstage.upgradetree[6], 1)], [new LinearEffect(player.quarkstage.producers[6], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 7")], [new LinearCost(player.electronstage.electrons, 7, 7)], null, {xpos: 891, ypos: -1554, label: "7+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg8ep1", "A Eight", -1, [new NumRequirement(player.electronstage.upgradetree[7], 1)], [new LinearEffect(player.quarkstage.producers[7], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 8")], [new LinearCost(player.electronstage.electrons, 8, 8)], null, {xpos: 707, ypos: -1807, label: "8+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg9ep1", "A Nine", -1, [new NumRequirement(player.electronstage.upgradetree[8], 1)], [new LinearEffect(player.quarkstage.producers[8], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 9")], [new LinearCost(player.electronstage.electrons, 9, 9)], null, {xpos: 454, ypos: -1991, label: "9+"}));
  player.electronstage.upgradetree.push(new Upgrade("qg10ep1", "A Ten", -1, [new NumRequirement(player.electronstage.upgradetree[9], 1)], [new LinearEffect(player.quarkstage.producers[9], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 10")], [new LinearCost(player.electronstage.electrons, 10, 10)], null, {xpos: 156, ypos: -2088
, label: "10+"}));

  //Starts out at upgrade slot 11
  player.electronstage.upgradetree.push(new Upgrade("qg1ed", "Price Decrease 1", 1, [new NumRequirement(player.electronstage.upgradetree[0], 1)], new StaticEffect(player.quarkstage.producers[0], .01, EffectTypes.PriceScaling, "Quark Generator 1"), new StaticCost(player.electronstage.electrons, 5), null, {xpos: -156, ypos: -112, label: "1d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg2ed", "Price Decrease 2", 1, [new NumRequirement(player.electronstage.upgradetree[11], 1)], new StaticEffect(player.quarkstage.producers[1], .9, EffectTypes.PriceScaling, "Quark Generator 2"), new StaticCost(player.electronstage.electrons, 10), null, {xpos: -454, ypos: -209, label: "2d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg3ed", "Price Decrease 3", 1, [new NumRequirement(player.electronstage.upgradetree[12], 1)], new StaticEffect(player.quarkstage.producers[2], .9, EffectTypes.PriceScaling, "Quark Generator 3"), new StaticCost(player.electronstage.electrons, 15), null, {xpos: -707, ypos: -393, label: "3d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg4ed", "Price Decrease 4", 1, [new NumRequirement(player.electronstage.upgradetree[13], 1)], new StaticEffect(player.quarkstage.producers[3], .9, EffectTypes.PriceScaling, "Quark Generator 4"), new StaticCost(player.electronstage.electrons, 20), null, {xpos: -891, ypos: -646, label: "4d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg5ed", "Price Decrease 5", 1, [new NumRequirement(player.electronstage.upgradetree[14], 1)], new StaticEffect(player.quarkstage.producers[4], .9, EffectTypes.PriceScaling, "Quark Generator 5"), new StaticCost(player.electronstage.electrons, 25), null, {xpos: -988, ypos: -944, label: "5d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg6ed", "Price Decrease 6", 1, [new NumRequirement(player.electronstage.upgradetree[15], 1)], new StaticEffect(player.quarkstage.producers[5], .9, EffectTypes.PriceScaling, "Quark Generator 6"), new StaticCost(player.electronstage.electrons, 30), null, {xpos: -988, ypos: -1256, label: "6d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg7ed", "Price Decrease 7", 1, [new NumRequirement(player.electronstage.upgradetree[16], 1)], new StaticEffect(player.quarkstage.producers[6], .9, EffectTypes.PriceScaling, "Quark Generator 7"), new StaticCost(player.electronstage.electrons, 35), null, {xpos: -891, ypos: -1554, label: "7d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg8ed", "Price Decrease 8", 1, [new NumRequirement(player.electronstage.upgradetree[17], 1)], new StaticEffect(player.quarkstage.producers[7], .9, EffectTypes.PriceScaling, "Quark Generator 8"), new StaticCost(player.electronstage.electrons, 40), null, {xpos: -707, ypos: -1807, label: "8d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg9ed", "Price Decrease 9", 1, [new NumRequirement(player.electronstage.upgradetree[18], 1)], new StaticEffect(player.quarkstage.producers[8], .9, EffectTypes.PriceScaling, "Quark Generator 9"), new StaticCost(player.electronstage.electrons, 45), null, {xpos: -454, ypos: -1991, label: "9d"}));
  player.electronstage.upgradetree.push(new Upgrade("qg10ed", "Price Decrease 10", 1, [new NumRequirement(player.electronstage.upgradetree[19], 1)], new StaticEffect(player.quarkstage.producers[9], .9, EffectTypes.PriceScaling, "Quark Generator 10"), new StaticCost(player.electronstage.electrons, 50), null, {xpos: -156, ypos: -2088
, label: "10d"}));

  player.electronstage.upgradetree.push(new Upgrade("eqgep1", "EVENS?", 1, [new NumRequirement(player.electronstage.upgradetree[2], 1),new NumRequirement(player.electronstage.upgradetree[12], 1)], [new LinkedLinearEffect(player.quarkstage.producers, () => {return player.stats.electrified}, 1, .25, EffectTypes.ProducerMultiplierProduction, "Even Quark Generators", (obj) => {return "Multiplies even quark generators by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";})], [new StaticCost(player.electronstage.electrons, 25)], null, {xpos: 0, ypos: -224, label: "E+"}));
  player.electronstage.upgradetree.push(new Upgrade("oqgep1", "ODDS?", 1, [new NumRequirement(player.electronstage.upgradetree[1], 1),new NumRequirement(player.electronstage.upgradetree[11], 1)], [new LinkedLinearEffect(player.quarkstage.producers, () => {return player.stats.electrified}, 1, .25, EffectTypes.ProducerMultiplierProduction, "Even Quark Generators", (obj) => {return "Multiplies odd quark generators by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";})], [new StaticCost(player.electronstage.electrons, 25)], null, {xpos: 0, ypos: -150, label: "O+"}));

  var allelextronringrequirements = () => {var arr = []; for(i = 1; i < 21;i++ )arr.push(new NumRequirement(player.electronstage.upgradetree[i], 1)); return arr;}
  player.electronstage.upgradetree.push(new Upgrade("protontime", "ODDS?", 1, allelextronringrequirements(), [new FlavorEffect("Unlocks Protify")], [new StaticCost(player.electronstage.electrons, "1e24")], null, {xpos: 0, ypos: -1100, label: "PP"}));

  //starts at index 24
  player.electronstage.upgradetree.push(new Upgrade("qgep2", "Getting Spicy", -1, new NumRequirement(player.electronstage.upgradetree[0], 1), new LinearEffect(player.quarkstage.producers, 1, .1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 1, 1), null, {xpos: 156, ypos: 112, label: "a1+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep3", "Getting Spicier", -1, new NumRequirement(player.electronstage.upgradetree[24], 1), new LinearEffect(player.quarkstage.producers, 1, .2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 2, 2), null, {xpos: 454, ypos: 209, label: "a2+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep4", "Getting Spiciest", -1, new NumRequirement(player.electronstage.upgradetree[25], 1), new LinearEffect(player.quarkstage.producers, 1, .3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 3, 3), null, {xpos: 707, ypos: 393, label: "a3+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep5", "Getting Spiciestest", -1, new NumRequirement(player.electronstage.upgradetree[26], 1), new LinearEffect(player.quarkstage.producers, 1, .4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 4, 4), null, {xpos: 891, ypos: 646, label: "a4+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep6", "Getting Spiciestestest", -1, new NumRequirement(player.electronstage.upgradetree[27], 1), new LinearEffect(player.quarkstage.producers, 1, .5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 5, 5), null, {xpos: 988, ypos: 944, label: "a5+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep7", "Getting Spiciest(est)x3", -1, new NumRequirement(player.electronstage.upgradetree[28], 1), new LinearEffect(player.quarkstage.producers, 1, .6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 6, 6), null, {xpos: 988, ypos: 1256, label: "a6+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep8", "Getting Spiciest(est)x4", -1, new NumRequirement(player.electronstage.upgradetree[29], 1), new LinearEffect(player.quarkstage.producers, 1, .7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 7, 7), null, {xpos: 891, ypos: 1554, label: "a7+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep9", "Getting Spiciest(est)x5", -1, new NumRequirement(player.electronstage.upgradetree[30], 1), new LinearEffect(player.quarkstage.producers, 1, .8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 8, 8), null, {xpos: 707, ypos: 1807, label: "a8+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep10", "Getting Spiciest(est)x6", -1, new NumRequirement(player.electronstage.upgradetree[31], 1), new LinearEffect(player.quarkstage.producers, 1, .9, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 9, 9), null, {xpos: 454, ypos: 1991, label: "a9+"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep11", "Getting Spiciest(est)x7", -1, new NumRequirement(player.electronstage.upgradetree[32], 1), new LinearEffect(player.quarkstage.producers, 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new LinearCost(player.electronstage.electrons, 10, 10), null, {xpos: 156, ypos: 2088, label: "a10+"}));

  //starts at index 34
  player.electronstage.upgradetree.push(new Upgrade("qgep12", "Truly Getting Spicy", -1, new NumRequirement(player.electronstage.upgradetree[0], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 10, 2), null, {xpos: -156, ypos: 112, label: "a1x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep13", "Truly Getting Spicier", -1, new NumRequirement(player.electronstage.upgradetree[34], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 20, 3), null, {xpos: -454, ypos: 209, label: "a2x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep14", "Truly Getting Spiciest", -1, new NumRequirement(player.electronstage.upgradetree[35], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 30, 4), null, {xpos: -707, ypos: 393, label: "a3x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep15", "Truly Getting Spiciestest", -1, new NumRequirement(player.electronstage.upgradetree[36], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 40, 5), null, {xpos: -891, ypos: 646, label: "a4x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep16", "Truly Getting Spiciestestest", -1, new NumRequirement(player.electronstage.upgradetree[37], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 50, 6), null, {xpos: -988, ypos: 944, label: "a5x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep17", "Truly Getting Spiciest(est)x3", -1, new NumRequirement(player.electronstage.upgradetree[38], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 60, 7), null, {xpos: -988, ypos: 1256, label: "a6x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep18", "Truly Getting Spiciest(est)x4", -1, new NumRequirement(player.electronstage.upgradetree[39], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 70, 8), null, {xpos: -891, ypos: 1554, label: "a7x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep19", "Truly Getting Spiciest(est)x5", -1, new NumRequirement(player.electronstage.upgradetree[40], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 80, 9), null, {xpos: -707, ypos: 1807, label: "a8x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep20", "Truly Getting Spiciest(est)x6", -1, new NumRequirement(player.electronstage.upgradetree[41], 1), new ExponentialEffect(player.quarkstage.producers, 1, 1.9, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 90, 10), null, {xpos: -454, ypos: 1991, label: "a9x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep21", "Truly Getting Spiciest(est)x7", -1, new NumRequirement(player.electronstage.upgradetree[42], 1), new ExponentialEffect(player.quarkstage.producers, 1, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 100, 11), null, {xpos: -156, ypos: 2088, label: "a10x"}));

  //starts at index 44
  player.electronstage.upgradetree.push(new Upgrade("qgep22", "x1.5 POG", 1, new NumRequirement(player.electronstage.upgradetree[34], 1), new StaticEffect(player.quarkstage.producers, 1.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e6"), null, {xpos: -141, ypos: 211, label: "1.5x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep23", "x2 POG", 1, [new NumRequirement(player.electronstage.upgradetree[35], 1),new NumRequirement(player.electronstage.upgradetree[44], 1)], new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e7"), null, {xpos: -409, ypos: 298, label: "2x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep24", "x2.5 POG", 1, [new NumRequirement(player.electronstage.upgradetree[36], 1),new NumRequirement(player.electronstage.upgradetree[45], 1)], new StaticEffect(player.quarkstage.producers, 2.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e8"), null, {xpos: -636, ypos: 464, label: "2.5x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep25", "x3 POG", 1, [new NumRequirement(player.electronstage.upgradetree[37], 1),new NumRequirement(player.electronstage.upgradetree[46], 1)], new StaticEffect(player.quarkstage.producers, 3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e9"), null, {xpos: -802, ypos: 691, label: "3x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep26", "x3.5 POG", 1, [new NumRequirement(player.electronstage.upgradetree[38], 1),new NumRequirement(player.electronstage.upgradetree[47], 1)], new StaticEffect(player.quarkstage.producers, 3.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "5e10"), null, {xpos: -889, ypos: 959, label: "3.5x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep27", "x4 POG", 1, [new NumRequirement(player.electronstage.upgradetree[39], 1),new NumRequirement(player.electronstage.upgradetree[48], 1)], new StaticEffect(player.quarkstage.producers, 4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e12"), null, {xpos: -889, ypos: 1241, label: "4x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep28", "x5 POG", 1, [new NumRequirement(player.electronstage.upgradetree[40], 1),new NumRequirement(player.electronstage.upgradetree[49], 1)], new StaticEffect(player.quarkstage.producers, 5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e14"), null, {xpos: -802, ypos: 1509, label: "5x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep29", "x6 POG", 1, [new NumRequirement(player.electronstage.upgradetree[41], 1),new NumRequirement(player.electronstage.upgradetree[50], 1)], new StaticEffect(player.quarkstage.producers, 6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e16"), null, {xpos: -636, ypos: 1736, label: "6x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep30", "x7 POG", 1, [new NumRequirement(player.electronstage.upgradetree[42], 1),new NumRequirement(player.electronstage.upgradetree[51], 1)], new StaticEffect(player.quarkstage.producers, 7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e18"), null, {xpos: -409, ypos: 1902, label: "7x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep31", "x8 POG", 1, [new NumRequirement(player.electronstage.upgradetree[43], 1),new NumRequirement(player.electronstage.upgradetree[52], 1)], new StaticEffect(player.quarkstage.producers, 8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e21"), null, {xpos: -141, ypos: 1989, label: "8x"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep32", "x10 POG", 1, [new NumRequirement(player.electronstage.upgradetree[53], 1)], new StaticEffect(player.quarkstage.producers, 10, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e24"), null, {xpos: 0, ypos: 1989, label: "10x"}));

  //starts at index 55
  player.electronstage.upgradetree.push(new Upgrade("qgep33", "Add A Litte Flavor", 1, new NumRequirement(player.electronstage.upgradetree[24], 1), new StaticEffect(player.quarkstage.electrify, 1, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "2"), null, {xpos: 141, ypos: 211, label: "+1e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep34", "Ahh Take Another", 1, [new NumRequirement(player.electronstage.upgradetree[25], 1),new NumRequirement(player.electronstage.upgradetree[55], 1)], new StaticEffect(player.quarkstage.electrify, 1, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "50"), null, {xpos: 409, ypos: 298, label: "+1e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep35", "Heh Its Better", 1, [new NumRequirement(player.electronstage.upgradetree[26], 1),new NumRequirement(player.electronstage.upgradetree[56], 1)], new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "200"), null, {xpos: 636, ypos: 464, label: "+2e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep36", "Once Again Better", 1, [new NumRequirement(player.electronstage.upgradetree[27], 1),new NumRequirement(player.electronstage.upgradetree[57], 1)], new StaticEffect(player.quarkstage.electrify, 5, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e3"), null, {xpos: 802, ypos: 691, label: "+5e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep37", "Slightly More, But Is It Required", 1, [new NumRequirement(player.electronstage.upgradetree[28], 1),new NumRequirement(player.electronstage.upgradetree[58], 1)], new StaticEffect(player.quarkstage.electrify, 10, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e4"), null, {xpos: 889, ypos: 959, label: "+10e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep38", "Spoiler Yes Yes It Is", 1, [new NumRequirement(player.electronstage.upgradetree[29], 1),new NumRequirement(player.electronstage.upgradetree[59], 1)], new StaticEffect(player.quarkstage.electrify, 10, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e5"), null, {xpos: 889, ypos: 1241, label: "+10e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep39", "Electron Multipliers Nice", 1, [new NumRequirement(player.electronstage.upgradetree[30], 1),new NumRequirement(player.electronstage.upgradetree[60], 1)], new StaticEffect(player.quarkstage.electrify, 1.1, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e7"), null, {xpos: 802, ypos: 1509, label: "x1.1e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep40", "Its Getting There", 1, [new NumRequirement(player.electronstage.upgradetree[31], 1),new NumRequirement(player.electronstage.upgradetree[61], 1)], new StaticEffect(player.quarkstage.electrify, 1.25, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e9"), null, {xpos: 636, ypos: 1736, label: "x1.25e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep41", "Slightly Better Than The Last", 1, [new NumRequirement(player.electronstage.upgradetree[32], 1),new NumRequirement(player.electronstage.upgradetree[62], 1)], new StaticEffect(player.quarkstage.electrify, 1.5, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e11"), null, {xpos: 409, ypos: 1902, label: "x1.5e"}));
  player.electronstage.upgradetree.push(new Upgrade("qgep42", "And This One Grows", 1, [new NumRequirement(player.electronstage.upgradetree[33], 1),new NumRequirement(player.electronstage.upgradetree[63], 1)], new ExponentialEffect(player.quarkstage.electrify, 1, 2, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new ExponentialCost(player.electronstage.electrons, "1e20", 10), null, {xpos: 141, ypos: 1989, label: "x2e"}));


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
  if(buyamount == undefined){
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
  player.stats.electrifyticks += 1;
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
