function setupchallenges(){
  //Challenge 1x1
  var c1effect = new LinearEffect(player.quarkstage.producers, .55, -.05, EffectTypes.ProducerExponentialProduction, null, (obj) => { return "Raise all quark production to the " + formatDecimalOverride(obj.value, 4);});
  var c1bonus1 = new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, (amount) => new Decimal(Decimal.log(amount, 10)), (obj) => "Quark Production * log10(score) || Quark Production *" + formatDecimalOverride(obj.value, 2));
  var c1bonus2 = new FunctionEffect(player.electronstage.quarkspinproducers, EffectTypes.ProducerMultiplierProduction, (amount) => new Decimal(Decimal.pow(Decimal.log(amount, 10), 1.25)), (obj) => { return 'Quark Spin Production * log10(score)^1.25 || Quark Spin Production *' + formatDecimalOverride(obj.value, 2)});
  var c1bonus3 = new FunctionEffect(player.quarkstage.electrify, EffectTypes.PrestigeExponentialGain, (amount) => new Decimal(Decimal.log(amount, "1e10")).divide("100").add(1), (obj) => { return "Electron Gain Power * Log1e10(score)/100 + 1 || Electron Gain ^" + formatDecimalOverride(obj.value, 3)});
  player.challenges.push(new Challenge("c1x1", "[c1] Quark Cut", "Electrify and gain score, but quark production is reduced heavily.", c1effect , [new Decimal(10), c1bonus1, new Decimal("1e15"), c1bonus2, new Decimal("1e45"), c1bonus3], 10, () => {player.quarkstage.electrify.prestige();}, null, () => player.quarkstage.quarks.gained, 2, [1, .5, .5, 10], "Quarks Gained"));
  
  //Challenge 1x2
  function ch2basescore(){
    var num = new Decimal(1);
    for (var i = 0; i < 5; i++){
      num = num.times(player.quarkstage.upgrades[i].amount.add(1));
    }
    return num;
  }
  var c2effect = new ExponentialEffect([player.quarkstage.upgrades[0],player.quarkstage.upgrades[1],player.quarkstage.upgrades[2],player.quarkstage.upgrades[3]], 1, .001, EffectTypes.UpgradeFinalMultiplier, null, (obj) => "Final Acceleron line effects *" + formatDecimalOverride(obj.value, 4));
  var c2bonus1 = new FunctionEffect(player.quarkstage.upgrades[0],EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 20)), (obj) => "Acceleron Power *log20(score) || Acceleron power *" + formatDecimalOverride(obj.value, 2))
  var c2bonus2 = new FunctionEffect(player.quarkstage.upgrades[1], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 40)), (obj) => "Accelerator Power *log40(score) || Accelerator power *" + formatDecimalOverride(obj.value, 2))
  var c2bonus3 = new FunctionEffect(player.quarkstage.upgrades[2], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.log(score, 1000)), (obj) => "Acceleration Boost *log1000(score) || Acceleration Boost Power *" + formatDecimalNormal(obj.value));
  player.challenges.push(new Challenge("c1x2", "[c2] Who needs the Acceleron line anyways", "Electrify and gain score, but all Acceleron line upgrades have a weakened effect", c2effect, [new Decimal(10) ,c2bonus1, new Decimal("1e5"), c2bonus2, new Decimal("1e15"), c2bonus3], 10, () => {player.quarkstage.electrify.prestige();}, null, ch2basescore, 1.5, [3, 1, .1, 5], "All Acceleron Line (Acceleron-Accerlation Boost) Amounts Multiplied Together"));

  //Challenge 1x3
  function ch3basescore(){
    var num = new Decimal(1);
    for (var i = 5; i < 9; i++){
      num = num.times(player.quarkstage.upgrades[i].amount.add(1));
    }
    return num;
  }
  var c3effect = new ExponentialEffect([player.quarkstage.upgrades[5],player.quarkstage.upgrades[6],player.quarkstage.upgrades[7],player.quarkstage.upgrades[8]], 1, .001, EffectTypes.UpgradeFinalMultiplier, null, (obj) => "Final Multor line effects *" + formatDecimalOverride(obj.value, 4));
  var c3bonus1 = new FunctionEffect(player.quarkstage.upgrades[5],EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.pow(new Decimal(Decimal.log(score, 200)).divide(5).add(1), 1/10)), (obj) => "Multor Power *(log200(score)/5 + 1)^.1 || Multor power *" + formatDecimalOverride(obj.value, 2))
  var c3bonus2 = new FunctionEffect(player.quarkstage.upgrades[6], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.pow(new Decimal(Decimal.log(score, 400)).divide(5).add(1), .01)), (obj) => "Multron Power *(log400(score)/5+1)^.01 || Multron power *" + formatDecimalOverride(obj.value, 2))
  var c3bonus3 = new FunctionEffect(player.quarkstage.upgrades[9], EffectTypes.UpgradeIncreaseMultiplier, (score) => new Decimal(Decimal.pow(new Decimal(Decimal.log(score, 1000)).divide(5).add(1), .5)), (obj) => "Multiplication Boost *(log1000(score)/5+1)^.5 || Multiplication Boost Power *" + formatDecimalNormal(obj.value));
  player.challenges.push(new Challenge("c1x3", "[c3] Who needs the Multor line anyways", "Electrify and gain score, but all Multor line upgrades have a weakened effect", c3effect, [new Decimal(10) ,c3bonus1, new Decimal("1e5"), c3bonus2, new Decimal("1e15"), c3bonus3], 10, () => {player.quarkstage.electrify.prestige();}, null, ch3basescore, 1.5, [3, .1, 1, 5], "All Multor Line (Multor-Multiplication Boost) Amounts Multiplied Together"));

  //Challenge 3
  var c4effects = [new StaticEffect(player.quarkstage.producers[0], 1,EffectTypes.ForceLimit, null, (obj) => "Max Chargers Buyable : 1"),new StaticEffect(player.quarkstage.producers.slice(1), 0, EffectTypes.ForceLimit, null, (obj) => "Max Quark Producers(Excluding Charger) Buyable : 0")];
  var c4bonus1 = new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, (amount) => new Decimal(Decimal.log(amount, 10)), (obj) => "Quark Production * log10(score) || Quark Production *" + formatDecimalOverride(obj.value, 2));
  var c4bonus2 = new FunctionEffect(player.quarkstage.electrify, EffectTypes.PrestigeMultiplicativeGain, (amount) => new Decimal(Decimal.log(amount, 10)), (obj) => { return 'Electron Gain * log10(score) || Electron Gain *' + formatDecimalOverride(obj.value, 2)});
  var c4bonus3 = new FunctionEffect(player.quarkstage.producers[0], EffectTypes.ProducerMultiplierProduction, (amount) => new Decimal(Decimal.log(amount, 1e10)).divide(100).add(1), (obj) => { return "Charger Production * Log1e10(score)/1000 || Charger Production ^" + formatDecimalOverride(obj.value, 2)});
  player.challenges.push(new Challenge("c1x4", "[c4] Only 1", "Electrify and reach the goal, but you only can buy 1 Charger.", c4effects, [new Decimal("10"), c4bonus1, new Decimal("1e25"), c4bonus2, new Decimal("1e45"), c4bonus3], 1, () => {player.quarkstage.electrify.prestige();}, null, () => new Decimal(Decimal.pow(player.quarkstage.quarks.gained, 1/2)), 1, [.1, 5, 5, 1], "(Quarks Gained)^.5"));  
  
}

function togglechallenges(){
  if(runningchallenges.length > 0){
  player.challenges.forEach(chal => {
    if(chal.in){
      chal.exit();
    }
  });
  }else{
  player.challenges.forEach(chal => {
    if(chal.active){
      chal.start();
    }
  });
  }
  subatomicidlingapp.$forceUpdate();
}

function resetchallenges(startind, endind){
for(var i = startind; i < endind; i++){
  player.challenges[i].reset();
}
updateeffects();
}