//Setup most basic nucleon
function setupbasicnucleonstage() {
  player.nucleonstage.nucleons = new Currency("nucleon", "Nucleons", "Nucleon", 0);

  var nucleongain = (amount) => {
    if (amount.lessThan("1e100"))
      return new Decimal();
    return Decimal.floor(Decimal.pow(amount.divide("1e100"), 1 / 100));
  }

  var donucleonize = async (hadrequire, producedamounts, forced) => {
    if (!forced && player.options.confirmations.nucleonize) {
      var confirm = await confirmtest("Gain nucleons but reset all quark producers, quark upgrades, quark spin producers, quark spin upgrades, electron upgrades, orbitals, electron power, and challenges 1-4 score will be raised to .5?");
      if (!confirm)
        return false;
    }
    if (!hadrequire || producedamounts == undefined)
      return false;
    player.stats.prestigeamounts.nucleonize += 1;
    player.stats.past10prestiges.nucleonize.unshift([Date.now() - player.stats.times.nucleonize, producedamounts[0]]);
    player.stats.past10prestiges.nucleonize.pop();
    player.stats.times.nucleonize = Date.now();
    return true;
  }

  player.electronstage.nucleonize = new Prestige("nucleonize", "Nucleonize", donucleonize, () => { resetQuarkStage(); resetElectronStage(); raisechallengescore(0, 4, .5); }, new NumRequirement(player.electronstage.electrons, "1e100"), new PrestigeReward(player.nucleonstage.nucleons, player.electronstage.electrons, nucleongain));
}

//Setup nucleon producers
function setupnucleonproducers() {
  var electronchargemult = (amount) => {
    if (amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    var num = Decimal.pow(amount, 1 / 3);
    return num;
  }

  var freeelectronmult = (amount) => {
    if (amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    var num = Decimal.pow(amount, 1 / 3);
    return num;
  }

  player.nucleonstage.electroncharge = new Upgrade("electroncharge", "Electron Charge", 0, null, new FunctionEffect(player.quarkstage.electrify, EffectTypes.PrestigeMultiplicativeGain, freeelectronmult, (obj) => { return "You have " + formatDecimalNormal(obj.amount) + " Electron Charge, providing x" + formatDecimal(obj.value) + " electron gain on electrify." }));
  player.nucleonstage.electronchargeproducers = [];
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp1", "Charging Chamber", new ExponentialCost(player.nucleonstage.nucleons, 1, 10), new LinearProduction(player.nucleonstage.electroncharge, 1, 0), null, "fep", null));
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp2", "Charging Chamber Plus", new ExponentialCost(player.nucleonstage.nucleons, 1e3, 10), new LinearProduction(player.nucleonstage.electronchargeproducers[0], 1, 0), null, "fep", null));
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp3", "Charging Chamber Multiplied", new ExponentialCost(player.nucleonstage.nucleons, 1e15, 10), new LinearProduction(player.nucleonstage.electronchargeproducers[1], 1, 0), null, "fep", null));
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp4", "Charging Chamber Squared", new ExponentialCost(player.nucleonstage.nucleons, 1e50, 10), new LinearProduction(player.nucleonstage.electronchargeproducers[2], 1, 0), null, "fep", null));
  player.nucleonstage.electronchargeproducers.push(new Producer("ecp5", "Chargin Chamber Tetrated", new ExponentialCost(player.nucleonstage.nucleons, 1e100, 10), new LinearProduction(player.nucleonstage.electronchargeproducers[3], 1, 0), null, "fep", null));

  player.nucleonstage.freeelectrons = new Upgrade("freeelectrons", "Free Electrons", 0, null, new FunctionEffect(player.quarkstage.producers.concat(player.electronstage.quarkspinproducers), EffectTypes.ProducerMultiplierProduction, freeelectronmult, (obj) => { return "You have " + formatDecimalNormal(obj.amount) + " Free Electrons, providing a x" + formatDecimal(obj.value) + " production boost to Quark and Quark Spin Producers." }));
  player.nucleonstage.freeelectronproducers = [];
  player.nucleonstage.freeelectronproducers.push(new Producer("fep1", "Elctron Releaser One", new ExponentialCost(player.nucleonstage.nucleons, 1, 10), new LinearProduction(player.nucleonstage.freeelectrons, 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep2", "Elctron Releaser Two", new ExponentialCost(player.nucleonstage.nucleons, 1e3, 10), new LinearProduction(player.nucleonstage.freeelectronproducers[0], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep3", "Elctron Releaser Three", new ExponentialCost(player.nucleonstage.nucleons, 1e15, 10), new LinearProduction(player.nucleonstage.freeelectronproducers[1], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep4", "Elctron Releaser Four", new ExponentialCost(player.nucleonstage.nucleons, 1e50, 10), new LinearProduction(player.nucleonstage.freeelectronproducers[2], 1, 0), null, "fep", null));
  player.nucleonstage.freeelectronproducers.push(new Producer("fep5", "Elctron Releaser Five", new ExponentialCost(player.nucleonstage.nucleons, 1e100, 10), new LinearProduction(player.nucleonstage.freeelectronproducers[3], 1, 0), null, "fep", null));
}

//Basic nucleon upgrades that show up in prodcuers tab
function setupbasicnucleonupgrades() {
  player.nucleonstage.freeelectronupgrades = [];
  player.nucleonstage.freeelectronupgrades.push(new Upgrade("feu1", "Better Charging", -1, null, [new ExponentialEffect(player.nucleonstage.freeelectronproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Better Charging Power x" + formatDecimalOverride(obj.increase, 1) + " | Electron Releaser's Production x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.freeelectrons, "1e3", 10)], "fep"));
  player.nucleonstage.freeelectronupgrades.push(new Upgrade("feu2", "Even Better Charging", -1, null, [new ExponentialEffect(player.nucleonstage.freeelectronupgrades[0], 1, 1.05, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Even Better Charging Power x" + formatDecimalOverride(obj.increase, 2) + " | Better Charging Power x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.freeelectrons, "1e12", "12e6")], "fep"));
  player.nucleonstage.freeelectronupgrades.push(new Upgrade("feu3", "Better Charge Effect", -1, null, [new ExponentialEffect(player.nucleonstage.freeelectrons, 1, 2, EffectTypes.UpgradeValueMult, null, (obj) => "Better Charge Effect Power x" + formatDecimalOverride(obj.increase) + " | Free Electron Effect x" + formatDecimalOverride(obj.value))], [new ExponentialCost(player.nucleonstage.freeelectrons, "1e24", "1e32")], "fep"));

  player.nucleonstage.electronchargeupgrades = [];
  player.nucleonstage.electronchargeupgrades.push(new Upgrade("ecu1", "Better Releasing", -1, null, [new ExponentialEffect(player.nucleonstage.electronchargeproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Better Charging Power x" + formatDecimalOverride(obj.increase, 1) + " | Charging Chamber's Production x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.electroncharge, "1e3", 10)], "fep"));
  player.nucleonstage.electronchargeupgrades.push(new Upgrade("ecu1", "Better Releasing", -1, null, [new ExponentialEffect(player.nucleonstage.electronchargeupgrades[0], 1, 1.05, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Even Better Charging Power x" + formatDecimalOverride(obj.increase, 1) + " | Better Charging Power x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.electroncharge, "1e12", "1e6")], "fep"));
  player.nucleonstage.electronchargeupgrades.push(new Upgrade("ecu1", "Better Releasing", -1, null, [new ExponentialEffect(player.nucleonstage.electroncharge, 1, 2, EffectTypes.UpgradeValueMult, null, (obj) => "Better Charge Effect x" + formatDecimalOverride(obj.increase) + " | Electron Charge Effect x" + formatDecimalOverride(obj.value))], [new ExponentialCost(player.nucleonstage.electroncharge, "1e24", "1e32")], "fep"));
}

//Basic singleton upgrades for nucleons
function setupbasicnucleonsingletonupgrades() {
  player.nucleonstage.autoelectronproducer = new Producer("autoe", "Auto E", null, new LinearProduction(player.electronstage.electrons, 0));
  player.nucleonstage.autoelectronproducer.add(1);

  player.nucleonstage.upgrades = [];
  player.nucleonstage.upgrades.push(new Upgrade("pu3", "Electrify?", 1, null, new FunctionEffect(player.nucleonstage.autoelectronproducer, EffectTypes.ProducerBaseProduction, () => player.quarkstage.electrify.rewards[0].producedamount.divide(100), () => "Produce 1% of electron gain on electrify every second."), new StaticCost(player.nucleonstage.nucleons, "25"), "upg"));
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
  updateeffects();
}