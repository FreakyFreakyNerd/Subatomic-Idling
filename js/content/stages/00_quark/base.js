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
