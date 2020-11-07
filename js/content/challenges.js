function setupchallenges(){
  //Challenge 1
  var c1effect = new ExponentialEffect(player.quarkstage.producers, .9, .9, EffectTypes.ProducerExponentialProduction, null, (obj) => { return "Raise all quark production to the " + formatDecimalOverride(obj.value, 4);});
  var c1bonus1 = new ExponentialEffect(player.quarkstage.producers, 1, 1.5, EffectTypes.ProducerMultiplierProduction, null, (obj) => { return "x" + formatDecimalOverride(obj.increase, 2) + ' more Quarks produced || Current: Quark Production *' + formatDecimalOverride(obj.value, 2)});
  var c1bonus2 = new ExponentialEffect(player.electronstage.quarkspinproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => { return "x" + formatDecimalOverride(obj.increase, 2) + ' more Quark Spin produced || Current: Quark Spin Production *' + formatDecimalOverride(obj.value, 2)});
  var c1bonus3 = new LinearEffect(player.quarkstage.electrify, 1, .002, EffectTypes.PrestigeCurrencyExponentialGain, null, (obj) => { return "+" + formatDecimalOverride(obj.increase, 3) + ' Electron exponent || Current: Electron Gain ^' + formatDecimalOverride(obj.value, 3)});
  player.challenges.push(new Challenge("c1", "[c1] Quark Cut", "Electrify and reach the goal, but quark production is reduced heavily.", c1effect , [c1bonus1, c1bonus2, c1bonus3], new ExponentialNumRequirement(player.quarkstage.quarks, "1e16", "10"), 100, () => {player.quarkstage.electrify.prestige();}));
  
  var c2bonus1 = new LinearEffect(player.quarkstage.upgrades[0], 1, .25, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "+" + formatDecimalOverride(obj.increase, 2) + " Acceleron Power Multiplier || Acceleron power *" + formatDecimalOverride(obj.value, 2))
  var c2bonus2 = new LinearEffect(player.quarkstage.upgrades[5], 1, .1, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "+" + formatDecimalOverride(obj.increase, 1) + " Multor Power Multiplier || Multor power *" + formatDecimalOverride(obj.value, 1))
  var c2bonus3 = new LinearEffect(player.quarkstage.upgrades[5], 0, 5, EffectTypes.UpgradeBonusLevels, null, (obj) => formatDecimalOverride(obj.increase, 1) + " Free Multors || +" + formatDecimalNormal(obj.value) + " Free Multors")
  player.challenges.push(new Challenge("c2", "[c2] Cutting Down Down Down", "Electrify and reach the goal, but Acceleron and Multor have no effect", new StaticEffect([player.quarkstage.upgrades[0],player.quarkstage.upgrades[5]], 0,EffectTypes.UpgradeIncreaseMultiplier, null, () => "Multors and Accelerons have no effect"), [c2bonus1,c2bonus2,c2bonus3], new ExponentialNumRequirement(player.quarkstage.quarks, "1e24", "1e12"), 100, () => {player.quarkstage.electrify.prestige();}));
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
}