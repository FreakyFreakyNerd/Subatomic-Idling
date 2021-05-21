//Setup most basic nucleon
function setupbasicnucleonstage() {
  player.nucleonstage.nucleons = new Currency("nucleon", "Nucleons", 0);

  var nucleongain = (amount) => {
    if (amount.lessThan("1e100"))
      return new Decimal();
    return Decimal.floor(Decimal.pow(amount.divide("1e100"), 1 / 1000));
  }

  var donucleonize = async (hadrequire, producedamounts, forced) => {
    if (!forced && player.options.confirmations.nucleonize) {
      var confirm = await confirmtest("Gain nucleons but reset all quark producers, quark upgrades, quark spin producers, quark spin upgrades, electron upgrades, orbitals, electron power, and challenges 1-4 score will be raised to .5?");
      if (!confirm)
        return false;
    }
    if (hadrequire) {
      player.stats.prestigeamounts.nucleonize += 1;
      player.stats.past10prestiges.nucleonize.unshift([Date.now() - player.stats.times.nucleonize, producedamounts[0]]);
      player.stats.past10prestiges.nucleonize.pop();
    }
    player.stats.times.nucleonize = Date.now();
    return true;
  }

  player.electronstage.nucleonize = new Prestige("nucleonize", "Nucleonize", donucleonize, () => { resetQuarkStage(); resetElectronStage(); if(!hasachievement("100nucleonize")) raisechallengescore(0, 4, .5); }, new NumRequirement(player.electronstage.electrons, "1e100"), new PrestigeReward(player.nucleonstage.nucleons, player.electronstage.electrons, nucleongain));
}

//Setup nucleon producers
function setupnucleonproducers() {
  var electronchargemult = (amount) => {
    if (amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    var num = Decimal.pow(amount, 1 / 5);
    return num;
  }

  var freeelectronmult = (amount) => {
    if (amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    var num = Decimal.pow(amount, 1 / 10);
    return num;
  }

  var gluonnmult = (amount) => {
    if (amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    var num = Decimal.pow(amount, 1 / 2);
    return num;
  }

  player.nucleonstage.electroncharge = new Upgrade("electroncharge", "Electron Charge", 0, null, new FunctionEffect(player.quarkstage.electrify, EffectTypes.PrestigeMultiplicativeGain, electronchargemult, (obj) => { return "You have " + formatDecimalNormal(obj.amount) + " Electron Charge, providing x" + formatDecimal(obj.value) + " electron gain on electrify." }), null, null, null, {getsproduced : true});
  player.nucleonstage.electronchargeproducers = [];
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp1", "Charging Chamber 1", new ExponentialCost(player.nucleonstage.nucleons, 1, 10), new LinearProduction(player.nucleonstage.electroncharge, 1, 0), null, "fep", null));
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp2", "Charging Chamber 2", new ExponentialCost(player.nucleonstage.nucleons, 1e3, 10), new LinearProduction(player.nucleonstage.electronchargeproducers[0], 1, 0), null, "fep", null));
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp3", "Charging Chamber 3", new ExponentialCost(player.nucleonstage.nucleons, 1e15, 10), new LinearProduction(player.nucleonstage.electronchargeproducers[1], 1, 0), null, "fep", null));
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp4", "Charging Chamber 4", new ExponentialCost(player.nucleonstage.nucleons, 1e50, 10), new LinearProduction(player.nucleonstage.electronchargeproducers[2], 1, 0), null, "fep", null));
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp5", "Chargin Chamber 5", new ExponentialCost(player.nucleonstage.nucleons, 1e100, 10), new LinearProduction(player.nucleonstage.electronchargeproducers[3], 1, 0), null, "fep", null));

  player.nucleonstage.freeelectrons = new Upgrade("freeelectrons", "Free Electrons", 0, null, new FunctionEffect(player.electronstage.clouds.power, EffectTypes.UpgradeAmountMultiplier, freeelectronmult, (obj) => { return "You have " + formatDecimalNormal(obj.amount) + " Free Electrons, providing a x" + formatDecimal(obj.value) + " boost to Electron Power." }), null, null, null, {getsproduced : true});
  player.nucleonstage.freeelectronproducers = [];
  player.nucleonstage.freeelectronproducers.push(new Producer("fep1", "Electron Releaser 1", new ExponentialCost(player.nucleonstage.nucleons, 1, 10), new LinearProduction(player.nucleonstage.freeelectrons, 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep2", "Electron Releaser 2", new ExponentialCost(player.nucleonstage.nucleons, 1e3, 10), new LinearProduction(player.nucleonstage.freeelectronproducers[0], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep3", "Electron Releaser 3", new ExponentialCost(player.nucleonstage.nucleons, 1e15, 10), new LinearProduction(player.nucleonstage.freeelectronproducers[1], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep4", "Electron Releaser 4", new ExponentialCost(player.nucleonstage.nucleons, 1e50, 10), new LinearProduction(player.nucleonstage.freeelectronproducers[2], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep5", "Electron Releaser 5", new ExponentialCost(player.nucleonstage.nucleons, 1e100, 10), new LinearProduction(player.nucleonstage.freeelectronproducers[3], 1, 0), null, "fep", null));


  player.nucleonstage.gluons = new Upgrade("gluons", "Gluons", 0, null, new FunctionEffect(player.quarkstage.producers.concat(player.electronstage.quarkspinproducers), EffectTypes.ProducerMultiplierProduction, gluonnmult, (obj) => { return "You have " + formatDecimalNormal(obj.amount) + " Gluons, providing a x" + formatDecimal(obj.value) + " production boost to Quark and Quark Spin Producers." }), null, null, null, {getsproduced : true});
  player.nucleonstage.gluonproducers = [];
  player.nucleonstage.gluonproducers.push(new Producer("gp1", "Gluon Producer 1", new ExponentialCost(player.nucleonstage.nucleons, 1, 10), new LinearProduction(player.nucleonstage.gluons, 1, 0), null, "fep", null));
  player.nucleonstage.gluonproducers.push(new Producer("gp2", "Gluon Producer 2", new ExponentialCost(player.nucleonstage.nucleons, 1e3, 10), new LinearProduction(player.nucleonstage.gluonproducers[0], 1, 0), null, "fep", null));
  player.nucleonstage.gluonproducers.push(new Producer("gp3", "Gluon Producer 3", new ExponentialCost(player.nucleonstage.nucleons, 1e15, 10), new LinearProduction(player.nucleonstage.gluonproducers[1], 1, 0), null, "fep", null));
  player.nucleonstage.gluonproducers.push(new Producer("gp4", "Gluon Producer 4", new ExponentialCost(player.nucleonstage.nucleons, 1e50, 10), new LinearProduction(player.nucleonstage.gluonproducers[2], 1, 0), null, "fep", null));
  player.nucleonstage.gluonproducers.push(new Producer("gp5", "Gluon Producer 3", new ExponentialCost(player.nucleonstage.nucleons, 1e100, 10), new LinearProduction(player.nucleonstage.gluonproducers[3], 1, 0), null, "fep", null));
}

//Basic nucleon upgrades that show up in prodcuers tab
function setupbasicnucleonupgrades() {
  player.nucleonstage.freeelectronupgrades = [];
  player.nucleonstage.freeelectronupgrades.push(new Upgrade("feu1", "Better Releasing", -1, null, [new ExponentialEffect(player.nucleonstage.freeelectronproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Better Releasing Power x" + formatDecimalOverride(obj.increase, 1) + " | Electron Releaser's Production x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.freeelectrons, "1e3", 10)], "fep"));
  player.nucleonstage.freeelectronupgrades.push(new Upgrade("feu2", "Even Better Releasing", -1, null, [new ExponentialEffect(player.nucleonstage.freeelectronupgrades[0], 1, 1.05, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Even Better Releasing Power x" + formatDecimalOverride(obj.increase, 2) + " | Better Releasing Power x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.freeelectrons, "1e12", "12e6")], "fep"));
  player.nucleonstage.freeelectronupgrades.push(new Upgrade("feu3", "Better Free Effect", -1, null, [new ExponentialEffect(player.nucleonstage.freeelectrons, 1, 1.5, EffectTypes.UpgradeValueMult, null, (obj) => "Better Free Effect Power x" + formatDecimalOverride(obj.increase, 1) + " | Free Electron Effect x" + formatDecimalOverride(obj.value, 1))], [new ExponentialCost(player.nucleonstage.freeelectrons, "1e24", "1e32")], "fep"));

  player.nucleonstage.electronchargeupgrades = [];
  player.nucleonstage.electronchargeupgrades.push(new Upgrade("ecu1", "Better Charging", -1, null, [new ExponentialEffect(player.nucleonstage.electronchargeproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Better Charging Power x" + formatDecimalOverride(obj.increase, 1) + " | Charging Chamber's Production x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.electroncharge, "1e3", 10)], "fep"));
  player.nucleonstage.electronchargeupgrades.push(new Upgrade("ecu2", "Even Better Charging", -1, null, [new ExponentialEffect(player.nucleonstage.electronchargeupgrades[0], 1, 1.05, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Even Better Charging Power x" + formatDecimalOverride(obj.increase, 1) + " | Better Charging Power x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.electroncharge, "1e12", "1e6")], "fep"));
  player.nucleonstage.electronchargeupgrades.push(new Upgrade("ecu3", "Better Charge Effect", -1, null, [new ExponentialEffect(player.nucleonstage.electroncharge, 1, 2, EffectTypes.UpgradeValueMult, null, (obj) => "Better Charge Effect Power x" + formatDecimalOverride(obj.increase) + " | Electron Charge Effect x" + formatDecimalOverride(obj.value))], [new ExponentialCost(player.nucleonstage.electroncharge, "1e24", "1e32")], "fep"));

  player.nucleonstage.gluonupgrades = [];
  player.nucleonstage.gluonupgrades.push(new Upgrade("gu1", "Better Glueing", -1, null, [new ExponentialEffect(player.nucleonstage.gluonproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Better Glueing Power x" + formatDecimalOverride(obj.increase, 1) + " | Gluons Producers Production x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.gluons, "1e3", 10)], "fep"));
  player.nucleonstage.gluonupgrades.push(new Upgrade("gu2", "Even Better Glueing", -1, null, [new ExponentialEffect(player.nucleonstage.gluonupgrades[0], 1, 1.05, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Even Better Glueing Power x" + formatDecimalOverride(obj.increase, 1) + " | Better Glueing Power x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.gluons, "1e12", "1e6")], "fep"));
  player.nucleonstage.gluonupgrades.push(new Upgrade("gu3", "Better Gluon Effect", -1, null, [new ExponentialEffect(player.nucleonstage.gluons, 1, 4, EffectTypes.UpgradeValueMult, null, (obj) => "Better Gluon Effect Power x" + formatDecimalOverride(obj.increase) + " | Gluon Effect x" + formatDecimalOverride(obj.value))], [new ExponentialCost(player.nucleonstage.gluons, "1e24", "1e32")], "fep"));
}

//Basic singleton upgrades for nucleons
function setupbasicnucleonsingletonupgrades() {
  player.nucleonstage.autoelectronproducer = new Producer("autoe", "Auto E", null, new LinearProduction(player.electronstage.electrons, 0));
  player.nucleonstage.autoelectronproducer.add(1);

  player.nucleonstage.upgrades = [];
  player.nucleonstage.upgrades.push(new Upgrade("nu0", "(nu1) Give Me Quarks", 5, null, new ExponentialEffect(player.quarkstage.producers, 1, 10, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Production x" + formatDecimalNormal(obj.value) + "(x" + formatDecimalNormal(obj.increase) + ")"), new ExponentialCost(player.nucleonstage.nucleons, 1, 5), "upg"));
  player.nucleonstage.upgrades.push(new Upgrade("nu1", "(nu2) Give Me Quark Spin", 5, null, new ExponentialEffect(player.electronstage.quarkspinproducers, 1, 10, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Spin Production x" + formatDecimalNormal(obj.value) + "(x" + formatDecimalNormal(obj.increase) + ")"), new ExponentialCost(player.nucleonstage.nucleons, 1, 5), "upg"));
  player.nucleonstage.upgrades.push(new Upgrade("nu2", "(nu3) Give Me Electrons", 5, null, new ExponentialEffect(player.quarkstage.electrify, 1, 10, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electron Gain x" + formatDecimalNormal(obj.value) + "(x" + formatDecimalNormal(obj.increase) + ")"), new ExponentialCost(player.nucleonstage.nucleons, 1, 5), "upg"));
  player.nucleonstage.upgrades.push(new Upgrade("nu3", "(nu4) Base Acceleron Power Based On Bought Accelerons", 1, null, new FunctionEffect(player.quarkstage.upgrades[0], EffectTypes.UpgradeIncreaseAddition, () => Decimal.pow(player.quarkstage.upgrades[0].bought, 2), (obj) => "Base Acceleron Power +" + formatDecimalNormal(obj.value)), new StaticCost(player.nucleonstage.nucleons, "3"), "upg"));
  player.nucleonstage.upgrades.push(new Upgrade("nu4", "(nu5) Base Acceleration Boost Power Based On Bought Acceleration Boost", 1, null, new FunctionEffect(player.quarkstage.upgrades[4], EffectTypes.UpgradeIncreaseAddition, () => player.quarkstage.upgrades[0].bought, (obj) => "Base Acceleration Boost Power +" + formatDecimalNormal(obj.value)), new StaticCost(player.nucleonstage.nucleons, "3"), "upg"));
  player.nucleonstage.upgrades.push(new Upgrade("nu5", "(nu6) Get Better Scores In Challenges 1-4", 1, null, new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 1000, EffectTypes.ChallengeScoreMult, null, (obj) => "Challenge 1-4 Score x" + formatDecimalNormal(obj.value)), new StaticCost(player.nucleonstage.nucleons, "5"), "upg"));
  player.nucleonstage.upgrades.push(new Upgrade("nu6", "(nu7) Increases Quark Gain", 1, null, new StaticEffect(player.quarkstage.producers, 1.1, EffectTypes.ProducerExponentialProduction, null, (obj) => "Quark Production ^" + formatDecimalOverride(obj.value, 1)), new StaticCost(player.nucleonstage.nucleons, "5"), "upg"));
  player.nucleonstage.upgrades.push(new Upgrade("nu7", "(nu8) Increase Electron Gain", 1, null, new StaticEffect(player.quarkstage.electrify, 1.05, EffectTypes.PrestigeExponentialGain, null, (obj) => "Electron Gain ^" + formatDecimalOverride(obj.value, 2)), new StaticCost(player.nucleonstage.nucleons, "10"), "upg"));
  player.nucleonstage.upgrades.push(new Upgrade("nu8", "(nu9) Electrify?", 1, null, new FunctionEffect(player.nucleonstage.autoelectronproducer, EffectTypes.ProducerBaseProduction, () => player.quarkstage.electrify.rewards[0].producedamount.divide(100), () => "Produce 1% of electron gain on electrify every second."), new StaticCost(player.nucleonstage.nucleons, "25"), "upg"));
}

function resetnucleonstage() {
  player.nucleonstage.nucleons.reset();
  player.nucleonstage.upgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
  player.nucleonstage.freeelectronproducers.forEach((prod, i) => {
    prod.reset();
  });
  player.nucleonstage.freeelectronupgrades.forEach(upg => {
    upg.reset();
  });
  player.nucleonstage.freeelectrons.reset();
  player.nucleonstage.electronchargeproducers.forEach((prod, i) => {
    prod.reset();
  });
  player.nucleonstage.electronchargeupgrades.forEach(upg => {
    upg.reset();
  });
  player.nucleonstage.electroncharge.reset();
  player.nucleonstage.gluonproducers.forEach((prod, i) => {
    prod.reset();
  });
  player.nucleonstage.gluonupgrades.forEach(upg => {
    upg.reset();
  });
  player.nucleonstage.gluons.reset(); 
  updateeffects();
}