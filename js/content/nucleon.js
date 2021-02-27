//Setup most basic nucleon
function setupbasicnucleonstage(){
    player.nucleonstage.nucleons = new Currency("nucleon", "Nucleons", "Nucleon", 0);
  
    var nucleongain = (amount) => {
      if(amount.lessThan("1e24"))
        return new Decimal();
      return Decimal.floor(Decimal.pow(amount.divide("1e24"), 1/4));
    }
    player.electronstage.nucleonize = new Prestige("nucleonize", "Nucleonize", (hadrequire, producedamounts) => {resetQuarkStage(); resetElectronStage();}, new NumRequirement(player.electronstage.electrons, "1e24"), new PrestigeReward(player.nucleonstage.nucleons, player.electronstage.electrons, nucleongain));  
}

//Setup nucleon producers
function setupnucleonproducers(){
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
}

//Basic nucleon upgrades that show up in prodcuers tab
function setupbasicnucleonupgrades(){
    player.nucleonstage.freeelectronupgrades = [];
    player.nucleonstage.freeelectronupgrades.push(new Upgrade("feu0", "Temp Upg 1", -1, null, [new ExponentialEffect(player.nucleonstage.freeelectronproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "[TEMP UPG 1] Power x" + formatDecimalOverride(obj.increase, 1) + " | Free Electron Production x" + formatDecimalOverride(obj.value, 2))], [new ExponentialCost(player.nucleonstage.freeelectrons, "1e3", 10)], "qsp")); 
}

//Basic singleton upgrades for nucleons
function setupbasicnucleonsingletonupgrades(){
    player.nucleonstage.autoelectronproducer = new Producer("autoe", "Auto E", null, new LinearProduction(player.electronstage.electrons, 0));
    player.nucleonstage.autoelectronproducer.add(1);
  
    player.nucleonstage.upgrades = [];
    player.nucleonstage.upgrades.push(new Upgrade("pu3", "Electrify?",  1, null, new FunctionEffect(player.nucleonstage.autoelectronproducer, EffectTypes.ProducerBaseProduction, () => player.quarkstage.electrify.rewards[0].producedamount.divide(100), () => "Produce 1% of electron gain on electrify every second."), new StaticCost(player.nucleonstage.nucleons, "1e3"), "upg"));
}