function setupchallenges(){
  player.challenges.push(new Challenge("c1", "[c1] Quark Cut", "Electrify and make your way back to electrify, but quark production is reduced heavily.", new ExponentialEffect(player.quarkstage.producers, .9, .9, EffectTypes.ProducerExponentialProduction, null, (obj) => { return "Raise all quark production to the " + formatDecimalOverride(obj.value, 4);}), [new FlavorEffect("Probably will have 3-4 each!")], new NumRequirement(player.quarkstage.quarks, new Decimal("1e16")), 100, () => {player.quarkstage.electrify.forceprestige();}));
  player.challenges.push(new Challenge("c2", "[c2] Cutting Down Down Down", "Will Do The Stuff", new FlavorEffect("Flippers"), new FlavorEffect("Apple"), new NumRequirement(player.quarkstage.quarks, new Decimal("1e128")), 10));
}

function togglechallenge(challenge){
  console.log("Starting: " + challenge);
  if(challenge.in)
    challenge.exit();
  else
    challenge.start();
}
