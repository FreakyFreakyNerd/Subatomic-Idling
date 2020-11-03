function setupchallenges(){
  //Challenge 1
  var c1effect = new ExponentialEffect(player.quarkstage.producers, .9, .9, EffectTypes.ProducerExponentialProduction, null, (obj) => { return "Raise all quark production to the " + formatDecimalOverride(obj.value, 4);});
  var c1bonus1 = new ExponentialEffect(player.quarkstage.producers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => { return "x" + formatDecimalOverride(obj.increase, 2) + ' more quarks produced || Current: Quark Production *' + formatDecimalOverride(obj.value, 2)});
  var c1bonus4 = new LinearEffect(player.quarkstage.electrify, 1, .005, EffectTypes.PrestigeCurrencyExponentialGain, null, (obj) => { return "+" + formatDecimalOverride(obj.increase, 3) + ' Electron exponent || Current: Electron Gain ^' + formatDecimalOverride(obj.value, 3)});
  player.challenges.push(new Challenge("c1", "[c1] Quark Cut", "Electrify and reach the goal, but quark production is reduced heavily.", c1effect , [c1bonus1, c1bonus4], new NumRequirement(player.quarkstage.quarks, new Decimal("1e16")), 100, () => {player.quarkstage.electrify.prestige();}));
  
  
  player.challenges.push(new Challenge("c2", "[c2] Cutting Down Down Down", "Will Do The Stuff", new FlavorEffect("Flippers"), new FlavorEffect("Apple"), new NumRequirement(player.quarkstage.quarks, new Decimal("1e128")), 10));
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