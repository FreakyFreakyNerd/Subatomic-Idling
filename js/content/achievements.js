function setupachievements(){
  //Row 0
  player.achievements.push([]);
  player.achievements[0].push(new Achievement("onequarkgenone", "Create A whopping 1 Charger", [new NumRequirement(player.quarkstage.producers[0], 1)], null, null));
  player.achievements[0].push(new Achievement("10quarkgenone", "A little better, now at 10 Chargers", [new NumRequirement(player.quarkstage.producers[0], 10)], null, [new FlavorEffect("Unlocks Spinner for purchase.")]));
  player.achievements[0].push(new Achievement("100quarkgenone", "I need the powah!", [new NumRequirement(player.quarkstage.producers[0], 100)], null, [new FlavorEffect("Unlocks Acceleron for purchase.")]));

  //Row 1
  player.achievements.push([]);
  player.achievements[1].push(new Achievement("onequarkgentwo", "The Spinner is better yah? Go ahead and purchase 1.", [new NumRequirement(player.quarkstage.producers[1], 1)], null, null));
  player.achievements[1].push(new Achievement("10quarkgentwo", "Whats better than 1 spinner? 10 Spinners!", [new NumRequirement(player.quarkstage.producers[1], 10)], null, [new FlavorEffect("Unlocks Flipper for purchase.")]));
  player.achievements[1].push(new Achievement("100quarkgentwo", "Get in that spinning craze!", [new NumRequirement(player.quarkstage.producers[1], 100)], null, [new FlavorEffect("Unlocks Multor for purchase.")]));

  //Row 2
  player.achievements.push([]);
  player.achievements[2].push(new Achievement("onequarkgenthree", "Go and flip some burgers, a Flipper will be useful.", [new NumRequirement(player.quarkstage.producers[2], 1)], null, null));
  player.achievements[2].push(new Achievement("10quarkgenthree", "The business is growing, get 10 Flippers.", [new NumRequirement(player.quarkstage.producers[2], 10)], null, [new FlavorEffect("Unlocks Charmer for purchase.")]));
  player.achievements[2].push(new Achievement("100quarkgenthree", "Flipping all day every day.", [new NumRequirement(player.quarkstage.producers[2], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[2].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Acceleron per 100 Flippers bought."})]));

  //Row 3
  player.achievements.push([]);
  player.achievements[3].push(new Achievement("onequarkgenfour", "Get that charmer going.", [new NumRequirement(player.quarkstage.producers[3], 1)], null, null));
  player.achievements[3].push(new Achievement("10quarkgenfour", "So Many to charm, so little charmers.", [new NumRequirement(player.quarkstage.producers[3], 10)], null, [new FlavorEffect("Unlocks Eightfold Way for purchase.")]));
  player.achievements[3].push(new Achievement("100quarkgenfour", "The charm king.", [new NumRequirement(player.quarkstage.producers[3], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[5], () => { return Decimal.floor(player.quarkstage.producers[3].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Multor per 100 Charmers bought."})]));

    //Row 4
    player.achievements.push([]);
  player.achievements[4].push(new Achievement("onequarkgenfive", "Eightfold, more like Onefold", [new NumRequirement(player.quarkstage.producers[4], 1)], null, null));
  player.achievements[4].push(new Achievement("10quarkgenfive", "Twofold?", [new NumRequirement(player.quarkstage.producers[4], 10)], null, [new FlavorEffect("Unlocks George for purchase.")]));
  player.achievements[4].push(new Achievement("100quarkgenfive", "Too Many Folds!", [new NumRequirement(player.quarkstage.producers[4], 100)], null, [new FlavorEffect("Unlocks Acceleration Boost for purchase.")]));

    //Row 5
  player.achievements.push([]);
  player.achievements[5].push(new Achievement("onequarkgensix", "Its a name", [new NumRequirement(player.quarkstage.producers[5], 1)], null, null));
  player.achievements[5].push(new Achievement("10quarkgensix", "10 George's must get confusing.", [new NumRequirement(player.quarkstage.producers[5], 10)], null, [new FlavorEffect("Unlocks Murray for purchase.")]));
  player.achievements[5].push(new Achievement("100quarkgensix", "A room full of Georges", [new NumRequirement(player.quarkstage.producers[5], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[4], () => { return Decimal.floor(player.quarkstage.producers[5].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Acceleration Boost per 100 Georges bought."})]));

    //Row 6
    player.achievements.push([]);
    player.achievements[6].push(new Achievement("onequarkgenseven", "MURRRAAAYYYY!!!", [new NumRequirement(player.quarkstage.producers[6], 1)], null, null));
  player.achievements[6].push(new Achievement("10quarkgenseven", "A dozen Murrays.", [new NumRequirement(player.quarkstage.producers[6], 10)], null, [new FlavorEffect("Unlocks Epoch for purchase.")]));
  player.achievements[6].push(new Achievement("100quarkgenseven", "A dozen Murrays.", [new NumRequirement(player.quarkstage.producers[6], 10)], null, [new FlavorEffect("Something Sometime")]));

    //Row 7
    player.achievements.push([]);
    player.achievements[7].push(new Achievement("onequarkgeneight", "What even is an Epoch.", [new NumRequirement(player.quarkstage.producers[7], 1)], null, null));
  player.achievements[7].push(new Achievement("10quarkgeneight", "Spoiler, Its a defining period of time.", [new NumRequirement(player.quarkstage.producers[7], 10)], null, [new FlavorEffect("Unlocks Scattering for purchase.")]));
  player.achievements[7].push(new Achievement("100quarkgeneight", "Spoiler, Its a defining period of time.", [new NumRequirement(player.quarkstage.producers[7], 10)], null, [new FlavorEffect("Something Sometime")]));

    //Row 8
    player.achievements.push([]);
    player.achievements[8].push(new Achievement("onequarkgennine", "Start the light Scattering", [new NumRequirement(player.quarkstage.producers[8], 1)], null, null));
  player.achievements[8].push(new Achievement("10quarkgennine", "Lets scatter some more.", [new NumRequirement(player.quarkstage.producers[8], 10)], null, [new FlavorEffect("Unlocks Big Bang for purchase.")]));
  player.achievements[8].push(new Achievement("100quarkgennine", "Lets scatter some more.", [new NumRequirement(player.quarkstage.producers[8], 10)], null, [new FlavorEffect("Something Sometime")]));

    //Row 9
    player.achievements.push([]);
    player.achievements[9].push(new Achievement("onequarkgenten", "Such a Big Bang", [new NumRequirement(player.quarkstage.producers[9], 1)], null, null));
  player.achievements[9].push(new Achievement("10quarkgenten", "But, How?", [new NumRequirement(player.quarkstage.producers[9], 10)], null, [new FlavorEffect("How does 2 new quark upgrades sound?")]));
  player.achievements[9].push(new Achievement("100quarkgenten", "But, How?", [new NumRequirement(player.quarkstage.producers[9], 10)], null, [new FlavorEffect("Something Sometime")]));

    //Row 10
    player.achievements.push([]);
    player.achievements[10].push(new Achievement("electrifyunlock", "Electrify", [new NumRequirement(player.quarkstage.quarks, "1e16")], null, [new FlavorEffect("Unlocks electrify for all your wonderful electron needs!")]));
    player.achievements[10].push(new Achievement("challengeunlock", "Your getting mightly powerful", [new NumRequirement(player.quarkstage.quarks, "1e24")], null, [new FlavorEffect("Unlocks some challenges to test your power!")]));
}

function resetachievements(){
  achievementregistry.forEach((achieve, i) => {
    achieve.reset();
  });
}

function hasachievement(achieveid){
  var has = false
  achievementregistry.forEach((achieve, i) => {
    if(achieve.id == achieveid){
      has = achieve.unlocked;
      return;
    }
  });
  return has;
}

function achievementtick(){
  achievementregistry.forEach((achieve, i) => {
    achieve.check();
  });
}
