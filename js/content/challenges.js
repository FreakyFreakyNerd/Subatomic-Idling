function setupchallenges(){
  //Challenge 1
  var c1effect = new ExponentialEffect(player.quarkstage.producers, .9, .9, EffectTypes.ProducerExponentialProduction, null, (obj) => { return "Raise all quark production to the " + formatDecimalOverride(obj.value, 4);});
  var c1bonus1 = new LinearEffect(player.quarkstage.producers, 1, .01, EffectTypes.ProducerMultiplierProduction, null, (obj) => { return "+" + formatDecimalOverride(obj.increase, 2) + 'x more quarks produced || Current: Production *' + formatDecimalOverride(obj.value, 2)});
  player.challenges.push(new Challenge("c1", "[c1] Quark Cut", "Electrify and reach the goal, but quark production is reduced heavily.", c1effect , [c1bonus1], new NumRequirement(player.quarkstage.quarks, new Decimal("1e16")), 100, () => {player.quarkstage.electrify.forceprestige();}));
  
  
  player.challenges.push(new Challenge("c2", "[c2] Cutting Down Down Down", "Will Do The Stuff", new FlavorEffect("Flippers"), new FlavorEffect("Apple"), new NumRequirement(player.quarkstage.quarks, new Decimal("1e128")), 10));
}

function togglechallenge(challenge){
  console.log("Starting: " + challenge);
  if(challenge.in)
    challenge.exit();
  else
    challenge.start();
}
