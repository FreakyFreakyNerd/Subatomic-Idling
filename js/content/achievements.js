function setupachievements(){
  //Row 0
  player.achievements.push([]);
  player.achievements[0].push(new Achievement("onequarkgenone", "Create A whopping 1 Charger", [new NumRequirement(player.quarkstage.producers[0], 1)], null, null));
  player.achievements[0].push(new Achievement("10quarkgenone", "A little better, now at 10 Chargers", [new NumRequirement(player.quarkstage.producers[0], 10)], null, [new FlavorEffect("Unlocks Spinner for purchase.")]));
  player.achievements[0].push(new Achievement("100quarkgenone", "I need the powah!", [new NumRequirement(player.quarkstage.producers[0], 100)], null, [new FlavorEffect("Unlocks Acceleron for purchase.")]));
  player.achievements[0].push(new Achievement("1e3quarkgenone", "Wo! Calm down. ;)", [new NumRequirement(player.quarkstage.producers[0], 1e3)], null, [new FlavorEffect("IDK a Charger Auto Buyer sound good?")]));
  player.achievements[0].push(new Achievement("1e5quarkgenone", "Getting A large amount.", [new NumRequirement(player.quarkstage.producers[0], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[0].push(new Achievement("1e7quarkgenone", "Good Luck Buddy.", [new NumRequirement(player.quarkstage.producers[0], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[0].push(new Achievement("1e10quarkgenone", "Ok Ok. A for effort and effect.", [new NumRequirement(player.quarkstage.producers[0], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Row 1
  player.achievements.push([]);
  player.achievements[1].push(new Achievement("onequarkgentwo", "The Spinner is better yah? Go ahead and purchase 1.", [new NumRequirement(player.quarkstage.producers[1], 1)], null, null));
  player.achievements[1].push(new Achievement("10quarkgentwo", "Whats better than 1 spinner? 10 Spinners!", [new NumRequirement(player.quarkstage.producers[1], 10)], null, [new FlavorEffect("Unlocks Flipper for purchase.")]));
  player.achievements[1].push(new Achievement("100quarkgentwo", "Get in that spinning craze!", [new NumRequirement(player.quarkstage.producers[1], 100)], null, [new FlavorEffect("Unlocks Multor for purchase.")]));
  player.achievements[1].push(new Achievement("1e3quarkgentwo", "You spin me right round, right round!", [new NumRequirement(player.quarkstage.producers[1], 1e3)], null, [new FlavorEffect("And now a Spinner autobuyer.")]));
  player.achievements[1].push(new Achievement("1e5quarkgentwo", "Keep at it, eventually your brains will spin out.", [new NumRequirement(player.quarkstage.producers[1], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[1].push(new Achievement("1e7quarkgentwo", "Just kidding but keep on spinning!", [new NumRequirement(player.quarkstage.producers[1], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[1].push(new Achievement("1e10quarkgentwo", "Like this will ever happen.", [new NumRequirement(player.quarkstage.producers[1], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Row 2
  player.achievements.push([]);
  player.achievements[2].push(new Achievement("onequarkgenthree", "Go and flip some burgers, a Flipper will be useful.", [new NumRequirement(player.quarkstage.producers[2], 1)], null, null));
  player.achievements[2].push(new Achievement("10quarkgenthree", "The business is growing, get 10 Flippers.", [new NumRequirement(player.quarkstage.producers[2], 10)], null, [new FlavorEffect("Unlocks Charmer for purchase.")]));
  player.achievements[2].push(new Achievement("100quarkgenthree", "Flipping all day every day.", [new NumRequirement(player.quarkstage.producers[2], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[2].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Acceleron per 100 Flippers bought."})]));
  player.achievements[2].push(new Achievement("1e3quarkgenthree", "Flip it and slap it!", [new NumRequirement(player.quarkstage.producers[2], 1e3)], null, [new FlavorEffect("Auto Flippin now.")]));
  player.achievements[2].push(new Achievement("1e5quarkgenthree", "Uptown flip.", [new NumRequirement(player.quarkstage.producers[2], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[2].push(new Achievement("1e7quarkgenthree", "What about the opposite flip, flop?", [new NumRequirement(player.quarkstage.producers[2], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[2].push(new Achievement("1e10quarkgenthree", "I no longer doubt your power.", [new NumRequirement(player.quarkstage.producers[2], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Row 3
  player.achievements.push([]);
  player.achievements[3].push(new Achievement("onequarkgenfour", "Get that charmer going.", [new NumRequirement(player.quarkstage.producers[3], 1)], null, null));
  player.achievements[3].push(new Achievement("10quarkgenfour", "So Many to charm, so little charmers.", [new NumRequirement(player.quarkstage.producers[3], 10)], null, [new FlavorEffect("Unlocks Eightfold Way for purchase.")]));
  player.achievements[3].push(new Achievement("100quarkgenfour", "The charm king.", [new NumRequirement(player.quarkstage.producers[3], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[5], () => { return Decimal.floor(player.quarkstage.producers[3].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Multor per 100 Charmers bought."})]));
  player.achievements[3].push(new Achievement("1e3quarkgenfour", "True loves kiss!", [new NumRequirement(player.quarkstage.producers[3], 1e3)], null, [new FlavorEffect("Gotta automate that charm some how.")]));
  player.achievements[3].push(new Achievement("1e5quarkgenfour", "Turn the frog!", [new NumRequirement(player.quarkstage.producers[3], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[3].push(new Achievement("1e7quarkgenfour", "Turns out the kiss did not work, you still got a frog!", [new NumRequirement(player.quarkstage.producers[3], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[3].push(new Achievement("1e10quarkgenfour", "Ok, ya got me drooling now.", [new NumRequirement(player.quarkstage.producers[3], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

    //Row 4
    player.achievements.push([]);
  player.achievements[4].push(new Achievement("onequarkgenfive", "Eightfold, more like Onefold", [new NumRequirement(player.quarkstage.producers[4], 1)], null, null));
  player.achievements[4].push(new Achievement("10quarkgenfive", "Twofold?", [new NumRequirement(player.quarkstage.producers[4], 10)], null, [new FlavorEffect("Unlocks George for purchase.")]));
  player.achievements[4].push(new Achievement("100quarkgenfive", "The paper is the size of the milky way!", [new NumRequirement(player.quarkstage.producers[4], 100)], null, [new FlavorEffect("Unlocks Acceleration Boost for purchase.")]));
  player.achievements[4].push(new Achievement("1e3quarkgenfive", "Time to sloooow dooooowwwwwwwwn", [new NumRequirement(player.quarkstage.producers[4], 1e3)], null, [new FlavorEffect("Always auto-folding.")]));
  player.achievements[4].push(new Achievement("1e5quarkgenfive", "Too Many Folds!", [new NumRequirement(player.quarkstage.producers[4], "1e5")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements[4].push(new Achievement("1e7quarkgenfive", "Not enought Folds!", [new NumRequirement(player.quarkstage.producers[4], "1e7")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements[4].push(new Achievement("1e10quarkgenfive", "Jaw dropped.", [new NumRequirement(player.quarkstage.producers[4], "1e10")], null, [new FlavorEffect("Something sometime.")]));

    //Row 5
  player.achievements.push([]);
  player.achievements[5].push(new Achievement("onequarkgensix", "Its a name", [new NumRequirement(player.quarkstage.producers[5], 1)], null, null));
  player.achievements[5].push(new Achievement("10quarkgensix", "10 George's must get confusing.", [new NumRequirement(player.quarkstage.producers[5], 10)], null, [new FlavorEffect("Unlocks Murray for purchase.")]));
  player.achievements[5].push(new Achievement("100quarkgensix", "A room full of Georges", [new NumRequirement(player.quarkstage.producers[5], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[4], () => { return Decimal.floor(player.quarkstage.producers[5].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Acceleration Boost per 100 Georges bought."})]));
  player.achievements[5].push(new Achievement("1e3quarkgensix", "A college of Georges", [new NumRequirement(player.quarkstage.producers[5], 1e3)], null, [new FlavorEffect("Georges buy more Georges.")]));
  player.achievements[5].push(new Achievement("1e5quarkgensix", "A town of Georges.", [new NumRequirement(player.quarkstage.producers[5], "1e5")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements[5].push(new Achievement("1e7quarkgensix", "Whats better than 1e5 Georges, 1e7!", [new NumRequirement(player.quarkstage.producers[5], "1e7")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements[5].push(new Achievement("1e10quarkgensix", "More Georges than the earths population.", [new NumRequirement(player.quarkstage.producers[5], "1e10")], null, [new FlavorEffect("Something sometime.")]));

    //Row 6
    player.achievements.push([]);
    player.achievements[6].push(new Achievement("onequarkgenseven", "MURRRAAAYYYY!!!", [new NumRequirement(player.quarkstage.producers[6], 1)], null, null));
  player.achievements[6].push(new Achievement("10quarkgenseven", "A dozen Murrays.", [new NumRequirement(player.quarkstage.producers[6], 10)], null, [new FlavorEffect("Unlocks Epoch for purchase.")]));
  player.achievements[6].push(new Achievement("100quarkgenseven", "A century of Murrays.", [new NumRequirement(player.quarkstage.producers[6], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[6].bought.divide(50)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Aceleron per 50 Murrays bought."})]));
  player.achievements[6].push(new Achievement("1e3quarkgenseven", "Should we mix the Murrays and Georges?", [new NumRequirement(player.quarkstage.producers[6], 1e3)], null, [new FlavorEffect("The Murrays need some auto purchased friends.")]));
  player.achievements[6].push(new Achievement("1e5quarkgenseven", "Timeless, memories.", [new NumRequirement(player.quarkstage.producers[6], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[6].push(new Achievement("1e7quarkgenseven", "Just impractical.", [new NumRequirement(player.quarkstage.producers[6], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[6].push(new Achievement("1e10quarkgenseven", "You must be a joker.", [new NumRequirement(player.quarkstage.producers[6], "1e10")], null, [new FlavorEffect("Something Sometime")]));

    //Row 7
    player.achievements.push([]);
    player.achievements[7].push(new Achievement("onequarkgeneight", "What even is an Epoch.", [new NumRequirement(player.quarkstage.producers[7], 1)], null, null));
  player.achievements[7].push(new Achievement("10quarkgeneight", "Spoiler, Its a defining period of time.", [new NumRequirement(player.quarkstage.producers[7], 10)], null, [new FlavorEffect("Unlocks Scattering for purchase.")]));
  player.achievements[7].push(new Achievement("100quarkgeneight", "The time be dragging.", [new NumRequirement(player.quarkstage.producers[7], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[4], () => { return Decimal.floor(player.quarkstage.producers[7].bought.divide(25)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Aceleron per 25 Epochs bought."})]));
  player.achievements[7].push(new Achievement("1e3quarkgeneight", "Time should speed up and slow down.", [new NumRequirement(player.quarkstage.producers[7], 1e3)], null, [new FlavorEffect("I think you get it, automates Epoch purchasing.")]));
  player.achievements[7].push(new Achievement("1e5quarkgeneight", "Wait, there is relativity.", [new NumRequirement(player.quarkstage.producers[7], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[7].push(new Achievement("1e7quarkgeneight", "Just leave the game running on a ship pc...", [new NumRequirement(player.quarkstage.producers[7], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[7].push(new Achievement("1e10quarkgeneight", "Then go to another ship and time dilate, PROFIT.", [new NumRequirement(player.quarkstage.producers[7], "1e10")], null, [new FlavorEffect("Something Sometime")]));

    //Row 8
    player.achievements.push([]);
    player.achievements[8].push(new Achievement("onequarkgennine", "Start the light Scattering", [new NumRequirement(player.quarkstage.producers[8], 1)], null, null));
  player.achievements[8].push(new Achievement("10quarkgennine", "Lets scatter some more.", [new NumRequirement(player.quarkstage.producers[8], 10)], null, [new FlavorEffect("Unlocks Big Bang for purchase.")]));
  player.achievements[8].push(new Achievement("100quarkgennine", "Get some mirrors.", [new NumRequirement(player.quarkstage.producers[8], 100)], null, [new FlavorEffect("Unlocks Accelerator for purchase.")]));
  player.achievements[8].push(new Achievement("1e3quarkgennine", "Lets try some color refraction.", [new NumRequirement(player.quarkstage.producers[8], 1e3)], null, [new FlavorEffect("Automatic Scattering purchaser.")]));
  player.achievements[8].push(new Achievement("1e5quarkgennine", "You need some prisms.", [new NumRequirement(player.quarkstage.producers[8], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[8].push(new Achievement("1e7quarkgennine", "Can I add more scatter?", [new NumRequirement(player.quarkstage.producers[8], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[8].push(new Achievement("1e10quarkgennine", "Can you even scatter more?", [new NumRequirement(player.quarkstage.producers[8], "1e10")], null, [new FlavorEffect("Something Sometime")]));

    //Row 9
    player.achievements.push([]);
    player.achievements[9].push(new Achievement("onequarkgenten", "Such a Big Bang", [new NumRequirement(player.quarkstage.producers[9], 1)], null, null));
  player.achievements[9].push(new Achievement("10quarkgenten", "But, How?", [new NumRequirement(player.quarkstage.producers[9], 10)], null, [new FlavorEffect("How does 2 new quark upgrades sound?")]));
  player.achievements[9].push(new Achievement("100quarkgenten", "Ok, 100 time deaths of the universe", [new NumRequirement(player.quarkstage.producers[9], 100)], null, [new FlavorEffect("Unlocks Multiplication Boost for purchase.")]));
  player.achievements[9].push(new Achievement("1e3quarkgenten", "Time flies.", [new NumRequirement(player.quarkstage.producers[9], 1e3)], null, [new FlavorEffect("Auto Big Banger.")]));
  player.achievements[9].push(new Achievement("1e5quarkgenten", "It is on repeat.", [new NumRequirement(player.quarkstage.producers[9], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[9].push(new Achievement("1e7quarkgenten", "On the edge of time.", [new NumRequirement(player.quarkstage.producers[9], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[9].push(new Achievement("1e10quarkgenten", "COLLAPSE!", [new NumRequirement(player.quarkstage.producers[9], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

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
