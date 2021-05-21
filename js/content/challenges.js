function setupchallenges() {
  //Challenge 1x1-1
  var c1effect = new LinearEffect(player.quarkstage.producers, .55, -.05, EffectTypes.ProducerExponentialProduction, null, (obj) => { return "Quark Production ^" + formatDecimalOverride(obj.value, 2); });
  var c1bonus1 = new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, (amount) => new Decimal(Decimal.log(amount, 10)), (obj) => "Quark Production * log10(score) || Quark Production *" + formatDecimalOverride(obj.value, 2));
  var c1bonus2 = new FunctionEffect(player.electronstage.quarkspinproducers, EffectTypes.ProducerMultiplierProduction, (amount) => new Decimal(Decimal.pow(Decimal.log(amount, 10), 1.25)), (obj) => { return 'Quark Spin Production * log10(score)^1.25 || Quark Spin Production *' + formatDecimalOverride(obj.value, 2) });
  var c1bonus3 = new FunctionEffect(player.quarkstage.electrify, EffectTypes.PrestigeExponentialGain, (amount) => new Decimal(Decimal.log(amount, "10")).divide("5000").add(1), (obj) => { return "Electron Gain ^ Log10(score)/5000 + 1 || Electron Gain ^" + formatDecimalOverride(obj.value, 3) });
  player.challenges.push(new Challenge("c1x1", "[c1] Quark Cut", "Electrify and gain score, but quark production is reduced heavily.", c1effect, [new Decimal(10), c1bonus1, new Decimal("1e15"), c1bonus2, new Decimal("1e40"), c1bonus3], 1, () => { player.quarkstage.electrify.forceprestige(); }, null, () => player.quarkstage.quarks.gained, 2, [1, .5, .5, 10], "Quarks Gained"));

  //Challenge 1x2-2
  function ch2basescore() {
    var num = new Decimal(1);
    for (var i = 0; i < 5; i++) {
      num = num.times(player.quarkstage.upgrades[i].amount.add(1));
    }
    return Decimal.pow(num, 2);
  }
  var c2effect = new LinearEffect([player.quarkstage.upgrades[0], player.quarkstage.upgrades[1], player.quarkstage.upgrades[2], player.quarkstage.upgrades[3]], .55, -.05, EffectTypes.UpgradeValuePower, null, (obj) => "Acceleron line effects ^" + formatDecimalOverride(obj.value, 2));
  var c2bonus1 = new FunctionEffect(player.quarkstage.upgrades[0], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 10)), (obj) => "Acceleron Power *log10(score) || Acceleron power *" + formatDecimalOverride(obj.value, 2))
  var c2bonus2 = new FunctionEffect(player.quarkstage.upgrades[1], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 10)), (obj) => "Accelerator Power *log10(score) || Accelerator power *" + formatDecimalOverride(obj.value, 2))
  var c2bonus3 = new FunctionEffect(player.quarkstage.upgrades[4], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 10)).divide(10).add(1), (obj) => "Acceleration Boost *log10(score)/10 + 1 || Acceleration Boost Power *" + formatDecimalOverride(obj.value, 2));
  player.challenges.push(new Challenge("c1x2", "[c2] Who needs the Acceleron line anyways", "Electrify and gain score, but all Acceleron line upgrades have a weakened effect", c2effect, [new Decimal(10), c2bonus1, new Decimal("1e5"), c2bonus2, new Decimal("1e10"), c2bonus3], 1, () => { player.quarkstage.electrify.forceprestige(); }, null, ch2basescore, 1.5, [3, 1, .1, 5], "All Acceleron Line (Acceleron-Accerlation Boost) Amounts Multiplied Together Squared"));

  //Challenge 1x3-3
  function ch3basescore() {
    var num = new Decimal(1);
    for (var i = 5; i < 9; i++) {
      num = num.times(player.quarkstage.upgrades[i].amount.add(1));
    }
    return Decimal.pow(num, 2);
  }
  var c3effect = new LinearEffect([player.quarkstage.upgrades[5], player.quarkstage.upgrades[6], player.quarkstage.upgrades[7], player.quarkstage.upgrades[8]], .55, -.05, EffectTypes.UpgradeValuePower, null, (obj) => "Multor line effects ^" + formatDecimalOverride(obj.value, 2));
  var c3bonus1 = new FunctionEffect(player.quarkstage.upgrades[5], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 10)).divide(100).add(1), (obj) => "Multor Power *log10(score)/100 + 1 || Multor power *" + formatDecimalOverride(obj.value, 2))
  var c3bonus2 = new FunctionEffect(player.quarkstage.upgrades[6], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 10)).divide(100).add(1), (obj) => "Multron Power *log10(score)/100 + 1 || Multron power *" + formatDecimalOverride(obj.value, 2))
  var c3bonus3 = new FunctionEffect(player.quarkstage.upgrades[9], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 10)).divide(250).add(1), (obj) => "Multiplication Boost *log10(score)/250 + 1 || Multiplication Boost Power *" + formatDecimalOverride(obj.value, 2));
  player.challenges.push(new Challenge("c1x3", "[c3] Who needs the Multor line anyways", "Electrify and gain score, but all Multor line upgrades have a weakened effect", c3effect, [new Decimal(10), c3bonus1, new Decimal("1e5"), c3bonus2, new Decimal("1e10"), c3bonus3], 1, () => { player.quarkstage.electrify.forceprestige(); }, null, ch3basescore, 1.5, [3, .1, 1, 5], "All Multor Line (Multor-Multiplication Boost) Amounts Multiplied Together Squared"));

  //Challenge 1x4-4
  var c4effects = [new StaticEffect(player.quarkstage.producers[0], 1, EffectTypes.ForceLimit, null, (obj) => "Max Chargers Buyable : 1"), new StaticEffect(player.quarkstage.producers.slice(1), 0, EffectTypes.ForceLimit, null, (obj) => "Max Quark Producers(Excluding Charger) Buyable : 0")];
  var c4bonus1 = new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, (amount) => new Decimal(Decimal.log(amount, 10)), (obj) => "Quark Production * log10(score) || Quark Production *" + formatDecimalOverride(obj.value, 2));
  var c4bonus2 = new FunctionEffect(player.quarkstage.electrify, EffectTypes.PrestigeMultiplicativeGain, (amount) => new Decimal(Decimal.log(amount, 10)), (obj) => { return 'Electron Gain * log10(score) || Electron Gain *' + formatDecimalOverride(obj.value, 2) });
  var c4bonus3 = new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerExponentialProduction, (amount) => Decimal.pow(new Decimal(Decimal.log(amount, 10)).divide(1000).add(1), .2), (obj) => { return "Quark Production ^ Log10(score)/1000 + 1)^.2 || Quark Production ^" + formatDecimalOverride(obj.value, 2) });
  player.challenges.push(new Challenge("c1x4", "[c4] Only 1", "Electrify and gain points, but you only can buy 1 Charger.", c4effects, [new Decimal("10"), c4bonus1, new Decimal("1e25"), c4bonus2, new Decimal("1e40"), c4bonus3], 1, () => { player.quarkstage.electrify.forceprestige(); }, null, () => new Decimal(Decimal.pow(player.quarkstage.quarks.gained, 1 / 2)), 1, [.1, 5, 5, 1], "(Quarks Gained)^.5"));

  //Challenge 2x1-5
  var c5effects = [new StaticEffect(player.electronstage.quarkspinproducers, 0, EffectTypes.ProducerMultiplierProduction, null, () => "Quark Spin Producers No Longer Produce")];
  player.challenges.push(new Challenge("c2x1", "[c5] Quarky", "Nucleonize and gain score, but quark spin producers do not work", c5effects, [], 1, () => { player.electronstage.nucleonize.forceprestige(); }, null, () => player.electronstage.electrons.gained, 1, [100, 2, 2, 2, 1, 1, 1, 1], "Electrons Gained", [new AchievementRequirement("nucleonizeunlock")]));

  //Challenge 2x2-6
  var c6effects = [new StaticEffect(player.quarkstage.singletonupgrades, 0, EffectTypes.ForceLimit, null, () => "No quark upgrades buyable")];
  player.challenges.push(new Challenge("c2x2", "[c6] Blasphamy", "Nucleonize and gain score, but you cannot buy any quark upgrades", c6effects, [], 1, () => { player.electronstage.nucleonize.forceprestige(); }, null, () => player.electronstage.electrons.gained, 1, [100, 2, 2, 2, 1, 1, 1, 1], "Electrons Gained", [new AchievementRequirement("nucleonizeunlock")]));

  //Challenge 2x3-7
  var c7effects = [new StaticEffect(player.electronstage.upgrades, 0, EffectTypes.ForceLimit, null, () => "No electron upgrades buyable")];
  player.challenges.push(new Challenge("c2x3", "[c7] Blasphamy v2.0", "Nucleonize and gain score, but you cannot buy electron upgrades", c7effects, [], 1, () => { player.electronstage.nucleonize.forceprestige(); }, null, () => Decimal.Log(player.electronstage.electrons.gained, 10).divide(125), 1, [100, 2, 2, 2, 1, 1, 1, 1], "Log10(Electrons Gained)/125", [new AchievementRequirement("nucleonizeunlock")]));
  
  //Challenge 2x4-8
  var c8effects = [new StaticEffect(player.electronstage.clouds.power, 0, EffectTypes.ForceLimit, null, () => "No electron power buyable")];
  player.challenges.push(new Challenge("c2x4", "[c8] Blasphamy 3000", "Nucleonize and gain score, but you cannot buy electron power", c8effects, [], 1, () => { player.electronstage.nucleonize.forceprestige(); }, null, () => player.electronstage.nucleonize.rewards[0].producedamount, 1, [100, 2, 2, 2, 1, 1, 1], "Nucleons Gained On Nucleonize", [new AchievementRequirement("nucleonizeunlock")]));
}

function togglechallenges() {
  if (runningchallenges.length > 0) {
    player.challenges.forEach(chal => {
      if (chal.in) {
        chal.exit();
      }
    });
  } else {
    player.challenges.forEach(chal => {
      if (chal.active) {
        chal.start();
      }
    });
  }
  subatomicidlingapp.$forceUpdate();
}

function resetchallenges(startind, endind) {
  for (var i = startind; i < endind; i++) {
    player.challenges[i].reset();
  }
  updateeffects();
}

function raisechallengescore(startind, endind, value) {
  for (var i = startind; i < endind; i++) {
    player.challenges[i].raisescore(value);
  }
  updateeffects();
}

function getchallenges(startind, endind){
  var chals = [];
  for (var i = startind; i < endind; i++) {
    chals.push(player.challenges[i]);
  }
  return chals;
}