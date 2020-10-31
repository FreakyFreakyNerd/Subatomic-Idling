function setupElectronStage(){
  player.electronstage.electrons = new Currency("electron", "Electrons", "Electron", 0);

  var electrongain = (amount) => {
    if(amount.lessThan(new Decimal("1e16")))
      return new Decimal();
    num = Decimal.floor(Decimal.max(Decimal.log(amount.divide(new Decimal("1e20")), 10), 1));
    num = Decimal.pow(num, Decimal.max(Decimal.log(amount.divide(new Decimal("1e50")), new Decimal("1e100")), 1))
    return num;
  }
  //,player.electronstage.electrons, player.quarkstage.quarks, electrongain,
  player.quarkstage.electrify = new Prestige("Electrify", (hadrequire, producedamounts) => { resetQuarkStage(); if(!hadrequire) return; player.stats.electrified += 1; player.stats.past10electrifies.unshift([player.stats.currentelectrifytime, producedamounts[0]]); player.stats.past10electrifies.pop(); player.stats.currentelectrifytime = 0;}, new NumRequirement(player.quarkstage.quarks, "1e16"), new PrestigeReward(player.electronstage.electrons, player.quarkstage.quarks, electrongain))
  player.electronstage.upgrades = [];

  player.electronstage.upgrades.push(new Upgrade("eu0", "[e1] Twice The Speed!", 1, null, [new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators")], [new StaticCost(player.electronstage.electrons, 1)], "eupg"));

  /*
  //Starts out at upgrade slot 1
  player.electronstage.upgrades.push(new Upgrade("eu1", "A One",   100, null, [new LinearEffect(player.quarkstage.producers[0], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 1")], [new ExponentialCost(player.electronstage.electrons, 2, 2)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu2", "A Two",   100, null, [new LinearEffect(player.quarkstage.producers[1], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 2")], [new ExponentialCost(player.electronstage.electrons, 3, 2)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu3", "A Three", 100, null, [new LinearEffect(player.quarkstage.producers[2], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 3")], [new ExponentialCost(player.electronstage.electrons, 4, 3)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu4", "A Four",  100, null, [new LinearEffect(player.quarkstage.producers[3], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 4")], [new ExponentialCost(player.electronstage.electrons, 5, 4)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu5", "A Five",  100, null, [new LinearEffect(player.quarkstage.producers[4], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 5")], [new ExponentialCost(player.electronstage.electrons, 6, 5)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu6", "A Six",   100, null, [new LinearEffect(player.quarkstage.producers[5], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 6")], [new ExponentialCost(player.electronstage.electrons, 7, 6)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu7", "A Seven", 100, null, [new LinearEffect(player.quarkstage.producers[6], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 7")], [new ExponentialCost(player.electronstage.electrons, 8, 7)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu8", "A Eight", 100, null, [new LinearEffect(player.quarkstage.producers[7], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 8")], [new ExponentialCost(player.electronstage.electrons, 9, 8)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu9", "A Nine",  100, null, [new LinearEffect(player.quarkstage.producers[8], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 9")], [new ExponentialCost(player.electronstage.electrons, 10, 9)], "eupg"));
  player.electronstage.upgrades.push(new Upgrade("eu10", "A Ten",  100, null, [new LinearEffect(player.quarkstage.producers[9], 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generator 10")], [new ExponentialCost(player.electronstage.electrons, 11, 10)], "eupg"));

  //Starts out at upgrade slot 11
  player.electronstage.upgrades.push(new Upgrade("eu11", "Price Decrease 1", 1, null, new StaticEffect(player.quarkstage.producers[0], .9, EffectTypes.PriceScaling, "Quark Generator 1"), new StaticCost(player.electronstage.electrons, 5), "eupg", {xpos: -156, ypos: -112, label: "1d"}));
  player.electronstage.upgrades.push(new Upgrade("eu12", "Price Decrease 2", 1, null, new StaticEffect(player.quarkstage.producers[1], .9, EffectTypes.PriceScaling, "Quark Generator 2"), new StaticCost(player.electronstage.electrons, 10), "eupg", {xpos: -454, ypos: -209, label: "2d"}));
  player.electronstage.upgrades.push(new Upgrade("eu13", "Price Decrease 3", 1, null, new StaticEffect(player.quarkstage.producers[2], .9, EffectTypes.PriceScaling, "Quark Generator 3"), new StaticCost(player.electronstage.electrons, 15), "eupg", {xpos: -707, ypos: -393, label: "3d"}));
  player.electronstage.upgrades.push(new Upgrade("eu14", "Price Decrease 4", 1, null, new StaticEffect(player.quarkstage.producers[3], .9, EffectTypes.PriceScaling, "Quark Generator 4"), new StaticCost(player.electronstage.electrons, 20), "eupg", {xpos: -891, ypos: -646, label: "4d"}));
  player.electronstage.upgrades.push(new Upgrade("eu15", "Price Decrease 5", 1, null, new StaticEffect(player.quarkstage.producers[4], .9, EffectTypes.PriceScaling, "Quark Generator 5"), new StaticCost(player.electronstage.electrons, 25), "eupg", {xpos: -988, ypos: -944, label: "5d"}));
  player.electronstage.upgrades.push(new Upgrade("eu16", "Price Decrease 6", 1, null, new StaticEffect(player.quarkstage.producers[5], .9, EffectTypes.PriceScaling, "Quark Generator 6"), new StaticCost(player.electronstage.electrons, 30), "eupg", {xpos: -988, ypos: -1256, label: "6d"}));
  player.electronstage.upgrades.push(new Upgrade("eu17", "Price Decrease 7", 1, null, new StaticEffect(player.quarkstage.producers[6], .9, EffectTypes.PriceScaling, "Quark Generator 7"), new StaticCost(player.electronstage.electrons, 35), "eupg", {xpos: -891, ypos: -1554, label: "7d"}));
  player.electronstage.upgrades.push(new Upgrade("eu18", "Price Decrease 8", 1, null, new StaticEffect(player.quarkstage.producers[7], .9, EffectTypes.PriceScaling, "Quark Generator 8"), new StaticCost(player.electronstage.electrons, 40), "eupg", {xpos: -707, ypos: -1807, label: "8d"}));
  player.electronstage.upgrades.push(new Upgrade("eu19", "Price Decrease 9", 1, null, new StaticEffect(player.quarkstage.producers[8], .9, EffectTypes.PriceScaling, "Quark Generator 9"), new StaticCost(player.electronstage.electrons, 45), "eupg", {xpos: -454, ypos: -1991, label: "9d"}));
  player.electronstage.upgrades.push(new Upgrade("eu20", "Price Decrease 0", 1, null, new StaticEffect(player.quarkstage.producers[9], .9, EffectTypes.PriceScaling, "Quark Generator 10"), new StaticCost(player.electronstage.electrons, 50), "eupg", {xpos: -156, ypos: -2088
, label: "10d"}));

  player.electronstage.upgrades.push(new Upgrade("eu21", "EVENS?", 1, null, [new LinkedLinearEffect(getevery(player.quarkstage.producers,2,0,1), () => {return player.stats.electrified}, 1, .25, EffectTypes.ProducerMultiplierProduction, "Even Quark Generators", (obj) => {return "Multiplies even quark generators by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";})], [new StaticCost(player.electronstage.electrons, 12)], "eupg", {xpos: 0, ypos: -224, label: "E+"}));
  player.electronstage.upgrades.push(new Upgrade("eu22", "ODDS?", 1, null, [new LinkedLinearEffect(getevery(player.quarkstage.producers,2,1,1), () => {return player.stats.electrified}, 1, .25, EffectTypes.ProducerMultiplierProduction, "Even Quark Generators", (obj) => {return "Multiplies odd quark generators by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";})], [new StaticCost(player.electronstage.electrons, 9)], "eupg", {xpos: 0, ypos: -150, label: "O+"}));

  player.electronstage.upgrades.push(new Upgrade("eu23", "New Layer", 1, null, [new FlavorEffect("Unlocks Protify")], [new StaticCost(player.electronstage.electrons, "1e24")], "eupg", {xpos: 0, ypos: -1100, label: "PP"}));

  //starts at index 24
  player.electronstage.upgrades.push(new Upgrade("eu24", "Getting Spicy", 100, null, new LinearEffect(player.quarkstage.producers, 1, .1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 2, 2), "eupg", {xpos: 156, ypos: 112, label: "a1+"}));
  player.electronstage.upgrades.push(new Upgrade("eu25", "Getting Spicier", 100, null, new LinearEffect(player.quarkstage.producers, 1, .2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 3, 2), "eupg", {xpos: 454, ypos: 209, label: "a2+"}));
  player.electronstage.upgrades.push(new Upgrade("eu26", "Getting Spiciest", 100, null, new LinearEffect(player.quarkstage.producers, 1, .3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 4, 2), "eupg", {xpos: 707, ypos: 393, label: "a3+"}));
  player.electronstage.upgrades.push(new Upgrade("eu27", "Getting Spiciestest", 100, null, new LinearEffect(player.quarkstage.producers, 1, .4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 5, 2), "eupg", {xpos: 891, ypos: 646, label: "a4+"}));
  player.electronstage.upgrades.push(new Upgrade("eu28", "Getting Spiciestestest", 100, null, new LinearEffect(player.quarkstage.producers, 1, .5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 6, 2), "eupg", {xpos: 988, ypos: 944, label: "a5+"}));
  player.electronstage.upgrades.push(new Upgrade("eu29", "Getting Spiciest(est)x3", 100, null, new LinearEffect(player.quarkstage.producers, 1, .6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 7, 2), "eupg", {xpos: 988, ypos: 1256, label: "a6+"}));
  player.electronstage.upgrades.push(new Upgrade("eu30", "Getting Spiciest(est)x4", 100, null, new LinearEffect(player.quarkstage.producers, 1, .7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 8, 2), "eupg", {xpos: 891, ypos: 1554, label: "a7+"}));
  player.electronstage.upgrades.push(new Upgrade("eu31", "Getting Spiciest(est)x5", 100, null, new LinearEffect(player.quarkstage.producers, 1, .8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 9, 2), "eupg", {xpos: 707, ypos: 1807, label: "a8+"}));
  player.electronstage.upgrades.push(new Upgrade("eu32", "Getting Spiciest(est)x6", 100, null, new LinearEffect(player.quarkstage.producers, 1, .9, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 10, 2), "eupg", {xpos: 454, ypos: 1991, label: "a9+"}));
  player.electronstage.upgrades.push(new Upgrade("eu33", "Getting Spiciest(est)x7", 100, null, new LinearEffect(player.quarkstage.producers, 1, 1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 11, 2), "eupg", {xpos: 156, ypos: 2088, label: "a10+"}));

  //starts at index 34
  player.electronstage.upgrades.push(new Upgrade("eu34", "Truly Getting Spicy", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 10, 2), "eupg", {xpos: -156, ypos: 112, label: "a1x"}));
  player.electronstage.upgrades.push(new Upgrade("eu35", "Truly Getting Spicier", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 20, 2), "eupg", {xpos: -454, ypos: 209, label: "a2x"}));
  player.electronstage.upgrades.push(new Upgrade("eu36", "Truly Getting Spiciest", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 30, 2), "eupg", {xpos: -707, ypos: 393, label: "a3x"}));
  player.electronstage.upgrades.push(new Upgrade("eu37", "Truly Getting Spiciestest", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 40, 2), "eupg", {xpos: -891, ypos: 646, label: "a4x"}));
  player.electronstage.upgrades.push(new Upgrade("eu38", "Truly Getting Spiciestestest", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 50, 2), "eupg", {xpos: -988, ypos: 944, label: "a5x"}));
  player.electronstage.upgrades.push(new Upgrade("eu39", "Truly Getting Spiciest(est)x3", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 60, 2), "eupg", {xpos: -988, ypos: 1256, label: "a6x"}));
  player.electronstage.upgrades.push(new Upgrade("eu40", "Truly Getting Spiciest(est)x4", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 70, 2), "eupg", {xpos: -891, ypos: 1554, label: "a7x"}));
  player.electronstage.upgrades.push(new Upgrade("eu41", "Truly Getting Spiciest(est)x5", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 80, 2), "eupg", {xpos: -707, ypos: 1807, label: "a8x"}));
  player.electronstage.upgrades.push(new Upgrade("eu42", "Truly Getting Spiciest(est)x6", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 1.9, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 90, 2), "eupg", {xpos: -454, ypos: 1991, label: "a9x"}));
  player.electronstage.upgrades.push(new Upgrade("eu43", "Truly Getting Spiciest(est)x7", 100, null, new ExponentialEffect(player.quarkstage.producers, 1, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new ExponentialCost(player.electronstage.electrons, 100, 2), "eupg", {xpos: -156, ypos: 2088, label: "a10x"}));

  //starts at index 44
  player.electronstage.upgrades.push(new Upgrade("eu44", "x1.5 POG", 1, null, new StaticEffect(player.quarkstage.producers, 1.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e6"), "eupg", {xpos: -141, ypos: 211, label: "1.5x"}));
  player.electronstage.upgrades.push(new Upgrade("eu45", "x2 POG",   1, null, new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e7"), "eupg", {xpos: -409, ypos: 298, label: "2x"}));
  player.electronstage.upgrades.push(new Upgrade("eu46", "x2.5 POG", 1, null, new StaticEffect(player.quarkstage.producers, 2.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e8"), "eupg", {xpos: -636, ypos: 464, label: "2.5x"}));
  player.electronstage.upgrades.push(new Upgrade("eu47", "x3 POG",   1, null, new StaticEffect(player.quarkstage.producers, 3, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e9"), "eupg", {xpos: -802, ypos: 691, label: "3x"}));
  player.electronstage.upgrades.push(new Upgrade("eu48", "x3.5 POG", 1, null, new StaticEffect(player.quarkstage.producers, 3.5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "5e10"), "eupg", {xpos: -889, ypos: 959, label: "3.5x"}));
  player.electronstage.upgrades.push(new Upgrade("eu49", "x4 POG",   1, null, new StaticEffect(player.quarkstage.producers, 4, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e12"),"eupg", {xpos: -889, ypos: 1241, label: "4x"}));
  player.electronstage.upgrades.push(new Upgrade("eu50", "x5 POG",   1, null, new StaticEffect(player.quarkstage.producers, 5, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e14"),"eupg", {xpos: -802, ypos: 1509, label: "5x"}));
  player.electronstage.upgrades.push(new Upgrade("eu51", "x6 POG",   1, null, new StaticEffect(player.quarkstage.producers, 6, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e16"), "eupg", {xpos: -636, ypos: 1736, label: "6x"}));
  player.electronstage.upgrades.push(new Upgrade("eu52", "x7 POG",   1, null, new StaticEffect(player.quarkstage.producers, 7, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e18"), "eupg", {xpos: -409, ypos: 1902, label: "7x"}));
  player.electronstage.upgrades.push(new Upgrade("eu53", "x8 POG",   1, null, new StaticEffect(player.quarkstage.producers, 8, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e21"), "eupg", {xpos: -141, ypos: 1989, label: "8x"}));
  player.electronstage.upgrades.push(new Upgrade("eu54", "x10 POG",  1, null, new StaticEffect(player.quarkstage.producers, 10, EffectTypes.ProducerMultiplierProduction, "Quark Generators"), new StaticCost(player.electronstage.electrons, "1e24"), "eupg", {xpos: 0, ypos: 1989, label: "10x"}));

  //starts at index 55
  player.electronstage.upgrades.push(new Upgrade("eu56", "Ahh Take Another", 1, null, new StaticEffect(player.quarkstage.electrify, 1, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "1"), "eupg", {xpos: 141, ypos: 211, label: "+1e"}));
  player.electronstage.upgrades.push(new Upgrade("eu55", "Add A Litte Flavor", 1, null, new LinkedLinearEffect(player.quarkstage.electrify, () => { return player.stats.electrified }, 0, .1, EffectTypes.PrestigeCurrencyBaseGain, "", (obj) => {return "Electrons gained on electify +" + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per electrify).";}), new StaticCost(player.electronstage.electrons, "25"), "eupg", {xpos: 409, ypos: 298, label: "+1e"}));
  player.electronstage.upgrades.push(new Upgrade("eu57", "Heh Its Better", 1, null, new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "50"), "eupg", {xpos: 636, ypos: 464, label: "+2e"}));
  player.electronstage.upgrades.push(new Upgrade("eu58", "Once Again Better", 1, null, new StaticEffect(player.quarkstage.electrify, 5, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "250"), "eupg", {xpos: 802, ypos: 691, label: "+5e"}));
  player.electronstage.upgrades.push(new Upgrade("eu59", "Slightly More, But Is It Required", 1, null, new StaticEffect(player.quarkstage.electrify, 10, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e3"), "eupg", {xpos: 889, ypos: 959, label: "+10e"}));
  player.electronstage.upgrades.push(new Upgrade("eu60", "Spoiler Yes Yes It Is", 1, null, new StaticEffect(player.quarkstage.electrify, 10, EffectTypes.PrestigeCurrencyBaseGain, "Electron"), new StaticCost(player.electronstage.electrons, "2.5e3"), "eupg", {xpos: 889, ypos: 1241, label: "+10e"}));
  player.electronstage.upgrades.push(new Upgrade("eu61", "Electron Multipliers Nice", 1, null, new StaticEffect(player.quarkstage.electrify, 1.1, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e5"), "eupg", {xpos: 802, ypos: 1509, label: "x1.1e"}));
  player.electronstage.upgrades.push(new Upgrade("eu62", "Its Getting There", 1, null, new StaticEffect(player.quarkstage.electrify, 1.25, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e7"), "eupg", {xpos: 636, ypos: 1736, label: "x1.25e"}));
  player.electronstage.upgrades.push(new Upgrade("eu63", "Slightly Better Than The Last", 1, null, new StaticEffect(player.quarkstage.electrify, 1.5, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new StaticCost(player.electronstage.electrons, "1e11"), "eupg", {xpos: 409, ypos: 1902, label: "x1.5e"}));
  player.electronstage.upgrades.push(new Upgrade("eu64", "And This One Grows", 1, null, new ExponentialEffect(player.quarkstage.electrify, 1, 2, EffectTypes.PrestigeCurrencyMultiplicativeGain, "Electron"), new ExponentialCost(player.electronstage.electrons, "1e20", 10), "eupg", {xpos: 141, ypos: 1989, label: "x2e"}));


  player.electronstage.upgrades.push(new Upgrade("eu65", "Add A Litte Flavor", 1, null, new LinkedLinearEffect(player.quarkstage.producers, () => { num = new Decimal(); player.quarkstage.producers.forEach((prod, i) => {num = num.add(prod.bought)}); return num; }, 1, .01, EffectTypes.ProducerMultiplierProduction, "", (obj) => {return "Multiply Quark Generators production by " + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) +" per bought quark generator).";}), new StaticCost(player.electronstage.electrons, "10"), "eupg", {xpos: 0, ypos: 224, label: "QG", tags: ["buyrec"]}));
  player.electronstage.upgrades.push(new Upgrade("eu66", "Add A Litte Flavor", 1, null, new LinkedExponentialEffect(player.quarkstage.producers, () => { num = new Decimal(); player.quarkstage.producers.forEach((prod, i) => {num = num.add(prod.bought)}); return num; }, 1, 1.001, EffectTypes.ProducerMultiplierProduction, "", (obj) => {return "Multiply Quark Generators production by " + formatDecimalOverride(obj.value, 3) + "(x" + formatDecimalOverride(obj.increase, 3) +" per bought quark generator).";}), new StaticCost(player.electronstage.electrons, "1000"), "eupg", {xpos: 0, ypos: 324, label: "*QG"}));

  player.electronstage.upgrades.push(new Upgrade("eu67", "Yep Something Newwwww", 1, null, new FlavorEffect("Unlocks some new producers (only buy if you have at least 11 electrons)"), new StaticCost(player.electronstage.electrons, "1"), "eupg", {xpos: -1500, ypos: 0, label: "QS"}));
    */
  var spinmult = (amount) => {
    if(amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    num = Decimal.pow(amount, 1/5);
    return num;
  }
  player.electronstage.quarkspin = new Upgrade("quarkspin", "Quark Spin", 0, null, new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, spinmult, (obj) => {return "You have " + formatDecimalNormal(obj.amount) + " Quark Spin, providing a x" + formatDecimal(obj.value) + " production boost to Quark Producers."}));

  player.electronstage.quarkspinproducers = [];
  player.electronstage.quarkspinproducers.push(new Producer("qs1", "Spinner 1", [new ExponentialCost(player.electronstage.electrons, "1", 2)], [new LinearProduction(player.electronstage.quarkspin, "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs2", "Spinner 2", [new ExponentialCost(player.electronstage.electrons, "10", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[0], "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs3", "Spinner 3", [new ExponentialCost(player.electronstage.electrons, "1e3", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[1], "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs4", "Spinner 4", [new ExponentialCost(player.electronstage.electrons, "1e6", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[2], "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs5", "Spinner 5", [new ExponentialCost(player.electronstage.electrons, "1e12", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[3], "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs6", "Spinner 6", [new ExponentialCost(player.electronstage.electrons, "1e24", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[4], "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs7", "Spinner 7", [new ExponentialCost(player.electronstage.electrons, "1e48", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[5], "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs8", "Spinner 8", [new ExponentialCost(player.electronstage.electrons, "1e96", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[6], "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs9", "Spinner 9", [new ExponentialCost(player.electronstage.electrons, "1e200", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[7], "1")], null, "spingen"));
  player.electronstage.quarkspinproducers.push(new Producer("qs10", "Spinner 10", [new ExponentialCost(player.electronstage.electrons, "1e500", 2)], [new LinearProduction(player.electronstage.quarkspinproducers[8], "1")], null, "spingen"));

  //player.electronstage.electronupgradelinetree = new LineTree(dumplines(player.electronstage.upgrades, 64), "electronupgrades");
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

}
