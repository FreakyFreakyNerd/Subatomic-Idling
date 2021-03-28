function setupachievements(){
  var row = 0;

  //Bought Chargers
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("onequarkgenone", "[a1x1] Create A whopping 1 Charger", [new NumRequirement(player.quarkstage.producers[0], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgenone", "[a1x2] A little better, now at 10 Chargers", [new NumRequirement(player.quarkstage.producers[0], 10)], null, [new FlavorEffect("Unlocks Spinner for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgenone", "[a1x3] I need the powah!", [new NumRequirement(player.quarkstage.producers[0], 100)], null, [new FlavorEffect("Unlocks Acceleron for purchase.")]));
  player.achievements[row].push(new Achievement("1e3quarkgenone", "[a1x4] Wo! Calm down. ;)", [new NumRequirement(player.quarkstage.producers[0], 1e3)], null, [new FlavorEffect("IDK a Charger Auto Buyer sound good?")]));
  player.achievements[row].push(new Achievement("1e5quarkgenone", "[a1x5] Getting A large amount.", [new NumRequirement(player.quarkstage.producers[0], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e7quarkgenone", "[a1x6] Good Luck Buddy.", [new NumRequirement(player.quarkstage.producers[0], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e10quarkgenone", "[a1x7] Ok Ok. A for effort and effect.", [new NumRequirement(player.quarkstage.producers[0], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Bought Spinners
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("onequarkgentwo", "[a2x1] The Spinner is better yah? Go ahead and purchase 1.", [new NumRequirement(player.quarkstage.producers[1], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgentwo", "[a2x2] Whats better than 1 spinner? 10 Spinners!", [new NumRequirement(player.quarkstage.producers[1], 10)], null, [new FlavorEffect("Unlocks Flipper for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgentwo", "[a2x3] Get in that spinning craze!", [new NumRequirement(player.quarkstage.producers[1], 100)], null, [new FlavorEffect("Unlocks Multor for purchase.")]));
  player.achievements[row].push(new Achievement("1e3quarkgentwo", "[a2x4] You spin me right round, right round!", [new NumRequirement(player.quarkstage.producers[1], 1e3)], null, [new FlavorEffect("And now a Spinner autobuyer.")]));
  player.achievements[row].push(new Achievement("1e5quarkgentwo", "[a2x5] Keep at it, eventually your brains will spin out.", [new NumRequirement(player.quarkstage.producers[1], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e7quarkgentwo", "[a2x6] Just kidding but keep on spinning!", [new NumRequirement(player.quarkstage.producers[1], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e10quarkgentwo", "[a2x7] Like this will ever happen.", [new NumRequirement(player.quarkstage.producers[1], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Bought Flipper
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("onequarkgenthree", "[a3x1] Go and flip some burgers, a Flipper will be useful.", [new NumRequirement(player.quarkstage.producers[2], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgenthree", "[a3x2] The business is growing, get 10 Flippers.", [new NumRequirement(player.quarkstage.producers[2], 10)], null, [new FlavorEffect("Unlocks Charmer for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgenthree", "[a3x3] Flipping all day every day.", [new NumRequirement(player.quarkstage.producers[2], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[2].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Acceleron per 100 Flippers bought."})]));
  player.achievements[row].push(new Achievement("1e3quarkgenthree", "[a3x4] Flip it and slap it!", [new NumRequirement(player.quarkstage.producers[2], 1e3)], null, [new FlavorEffect("Auto Flippin now.")]));
  player.achievements[row].push(new Achievement("1e5quarkgenthree", "[a3x5] Uptown flip.", [new NumRequirement(player.quarkstage.producers[2], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e7quarkgenthree", "[a3x6] What about the opposite flip, flop?", [new NumRequirement(player.quarkstage.producers[2], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e10quarkgenthree", "[a3x7] I no longer doubt your power.", [new NumRequirement(player.quarkstage.producers[2], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Bought Charmer
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("onequarkgenfour", "[a4x1] Get that charmer going.", [new NumRequirement(player.quarkstage.producers[3], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgenfour", "[a4x2] So Many to charm, so little charmers.", [new NumRequirement(player.quarkstage.producers[3], 10)], null, [new FlavorEffect("Unlocks Eightfold Way for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgenfour", "[a4x3] The charm king.", [new NumRequirement(player.quarkstage.producers[3], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[row], () => { return Decimal.floor(player.quarkstage.producers[3].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Multor per 100 Charmers bought."})]));
  player.achievements[row].push(new Achievement("1e3quarkgenfour", "[a4x4] True loves kiss!", [new NumRequirement(player.quarkstage.producers[3], 1e3)], null, [new FlavorEffect("Gotta automate that charm some how.")]));
  player.achievements[row].push(new Achievement("1e5quarkgenfour", "[a4x5] Turn the frog!", [new NumRequirement(player.quarkstage.producers[3], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e7quarkgenfour", "[a4x6] Turns out the kiss did not work, you still got a frog!", [new NumRequirement(player.quarkstage.producers[3], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e10quarkgenfour", "[a4x7] Ok, ya got me drooling now.", [new NumRequirement(player.quarkstage.producers[3], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

    //Eightfold Way
    player.achievements.push([]);
    row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("onequarkgenfive", "[a5x1] Eightfold, more like Onefold", [new NumRequirement(player.quarkstage.producers[4], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgenfive", "[a5x2] Twofold?", [new NumRequirement(player.quarkstage.producers[4], 10)], null, [new FlavorEffect("Unlocks George for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgenfive", "[a5x3] The paper is the size of the milky way!", [new NumRequirement(player.quarkstage.producers[4], 100)], null, [new FlavorEffect("Unlocks Acceleration Boost for purchase.")]));
  player.achievements[row].push(new Achievement("1e3quarkgenfive", "[a5x4] Time to sloooow dooooowwwwwwwwn", [new NumRequirement(player.quarkstage.producers[4], 1e3)], null, [new FlavorEffect("Always auto-folding.")]));
  player.achievements[row].push(new Achievement("1e5quarkgenfive", "[a5x5] Too Many Folds!", [new NumRequirement(player.quarkstage.producers[4], "1e5")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements[row].push(new Achievement("1e7quarkgenfive", "[a5x6] Not enought Folds!", [new NumRequirement(player.quarkstage.producers[4], "1e7")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements[row].push(new Achievement("1e10quarkgenfive", "[a5x7] Jaw dropped.", [new NumRequirement(player.quarkstage.producers[4], "1e10")], null, [new FlavorEffect("Something sometime.")]));

    //Bought George
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("onequarkgensix", "[a6x1] Its a name", [new NumRequirement(player.quarkstage.producers[5], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgensix", "[a6x2] 10 George's must get confusing.", [new NumRequirement(player.quarkstage.producers[5], 10)], null, [new FlavorEffect("Unlocks Murray for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgensix", "[a6x3] A room full of Georges", [new NumRequirement(player.quarkstage.producers[5], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[4], () => { return Decimal.floor(player.quarkstage.producers[5].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Acceleration Boost per 100 Georges bought."})]));
  player.achievements[row].push(new Achievement("1e3quarkgensix", "[a6x4] A college of Georges", [new NumRequirement(player.quarkstage.producers[5], 1e3)], null, [new FlavorEffect("Georges buy more Georges.")]));
  player.achievements[row].push(new Achievement("1e5quarkgensix", "[a6x5] A town of Georges.", [new NumRequirement(player.quarkstage.producers[5], "1e5")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements[row].push(new Achievement("1e7quarkgensix", "[a6x6] Whats better than 1e5 Georges, 1e7!", [new NumRequirement(player.quarkstage.producers[5], "1e7")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements[row].push(new Achievement("1e10quarkgensix", "[a6x7] More Georges than the earths population.", [new NumRequirement(player.quarkstage.producers[5], "1e10")], null, [new FlavorEffect("Something sometime.")]));

    //Bought Murray
    player.achievements.push([]);
    row = player.achievements.length-1;
    player.achievements[row].push(new Achievement("onequarkgenseven", "[a7x1] MURRRAAAYYYY!!!", [new NumRequirement(player.quarkstage.producers[6], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgenseven", "[a7x2] A dozen Murrays.", [new NumRequirement(player.quarkstage.producers[6], 10)], null, [new FlavorEffect("Unlocks Epoch for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgenseven", "[a7x3] A century of Murrays.", [new NumRequirement(player.quarkstage.producers[6], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[6].bought.divide(50)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Aceleron per 50 Murrays bought."})]));
  player.achievements[row].push(new Achievement("1e3quarkgenseven", "[a7x4] Should we mix the Murrays and Georges?", [new NumRequirement(player.quarkstage.producers[6], 1e3)], null, [new FlavorEffect("The Murrays need some auto purchased friends.")]));
  player.achievements[row].push(new Achievement("1e5quarkgenseven", "[a7x5] Timeless, memories.", [new NumRequirement(player.quarkstage.producers[6], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[row].push(new Achievement("1e7quarkgenseven", "[a7x6] Just impractical.", [new NumRequirement(player.quarkstage.producers[6], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[row].push(new Achievement("1e10quarkgenseven", "[a7x7] You must be a joker.", [new NumRequirement(player.quarkstage.producers[6], "1e10")], null, [new FlavorEffect("Something Sometime")]));

    //Bought Epoch
    player.achievements.push([]);
    row = player.achievements.length-1;
    player.achievements[row].push(new Achievement("onequarkgeneight", "[a8x1] What even is an Epoch.", [new NumRequirement(player.quarkstage.producers[7], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgeneight", "[a8x2] Spoiler, Its a defining period of time.", [new NumRequirement(player.quarkstage.producers[7], 10)], null, [new FlavorEffect("Unlocks Scattering for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgeneight", "[a8x3] The time be dragging.", [new NumRequirement(player.quarkstage.producers[7], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[4], () => { return Decimal.floor(player.quarkstage.producers[7].bought.divide(25)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => {return "Get 1 free Aceleron per 25 Epochs bought."})]));
  player.achievements[row].push(new Achievement("1e3quarkgeneight", "[a8x4] Time should speed up and slow down.", [new NumRequirement(player.quarkstage.producers[7], 1e3)], null, [new FlavorEffect("I think you get it, automates Epoch purchasing.")]));
  player.achievements[row].push(new Achievement("1e5quarkgeneight", "[a8x5] Wait, there is relativity.", [new NumRequirement(player.quarkstage.producers[7], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[row].push(new Achievement("1e7quarkgeneight", "[a8x6] Just leave the game running on a ship pc...", [new NumRequirement(player.quarkstage.producers[7], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[row].push(new Achievement("1e10quarkgeneight", "[a8x7] Then go to another ship and time dilate, PROFIT.", [new NumRequirement(player.quarkstage.producers[7], "1e10")], null, [new FlavorEffect("Something Sometime")]));

    //Bought Scattering
    player.achievements.push([]);
    row = player.achievements.length-1;
    player.achievements[row].push(new Achievement("onequarkgennine", "[a9x1] Start the light Scattering", [new NumRequirement(player.quarkstage.producers[8], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgennine", "[a9x2] Lets scatter some more.", [new NumRequirement(player.quarkstage.producers[8], 10)], null, [new FlavorEffect("Unlocks Big Bang for purchase.")]));
  player.achievements[row].push(new Achievement("100quarkgennine", "[a9x3] Get some mirrors.", [new NumRequirement(player.quarkstage.producers[8], 100)], null, [new FlavorEffect("Unlocks Accelerator for purchase.")]));
  player.achievements[row].push(new Achievement("1e3quarkgennine", "[a9x4] Lets try some color refraction.", [new NumRequirement(player.quarkstage.producers[8], 1e3)], null, [new FlavorEffect("Automatic Scattering purchaser.")]));
  player.achievements[row].push(new Achievement("1e5quarkgennine", "[a9x5] You need some prisms.", [new NumRequirement(player.quarkstage.producers[8], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[row].push(new Achievement("1e7quarkgennine", "[a9x6] Can I add more scatter?", [new NumRequirement(player.quarkstage.producers[8], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements[row].push(new Achievement("1e10quarkgennine", "[a9x7] Can you even scatter more?", [new NumRequirement(player.quarkstage.producers[8], "1e10")], null, [new FlavorEffect("Something Sometime")]));

  //Bought Big Bang
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("onequarkgenten", "[a10x1] Such a Big Bang", [new NumRequirement(player.quarkstage.producers[9], 1)], null, null));
  player.achievements[row].push(new Achievement("10quarkgenten", "[a10x2] But, How?", [new NumRequirement(player.quarkstage.producers[9], 10)], null, [new FlavorEffect("How does 2 new quark upgrades sound?")]));
  player.achievements[row].push(new Achievement("100quarkgenten", "[a10x3] Ok, 100 time deaths of the universe", [new NumRequirement(player.quarkstage.producers[9], 100)], null, [new FlavorEffect("Unlocks Multiplication Boost for purchase.")]));
  player.achievements[row].push(new Achievement("1e3quarkgenten", "[a10x4] Time flies.", [new NumRequirement(player.quarkstage.producers[9], 1e3)], null, [new FlavorEffect("Auto Big Banger.")]));
  player.achievements[row].push(new Achievement("1e5quarkgenten", "[a10x5] It is on repeat.", [new NumRequirement(player.quarkstage.producers[9], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e7quarkgenten", "[a10x6] On the edge of time.", [new NumRequirement(player.quarkstage.producers[9], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements[row].push(new Achievement("1e10quarkgenten", "[a10x7] COLLAPSE!", [new NumRequirement(player.quarkstage.producers[9], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Quark Milestones
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("electrifyunlock", "[a11x1] Electrify", [new NumRequirement(player.quarkstage.quarks, "1e16")], null, [new FlavorEffect("Unlocks electrify for all your wonderful electron needs!")]));
  player.achievements[row].push(new Achievement("challengeunlock", "[a11x2] Your getting mightly powerful", [new NumRequirement(player.quarkstage.quarks, "1e24")], null, [new FlavorEffect("Unlocks some challenges to test your power!")]));
  player.achievements[row].push(new Achievement("multronunlock", "[a11x3] Might as well unlock another upgrade.", [new NumRequirement(player.quarkstage.quarks, "1e35")], null, [new FlavorEffect("Unlocks Multron for purchase!")]));
  player.achievements[row].push(new Achievement("quarkupgradesauto", "[a11x4] Unlocks automation for all upgrades in quark producers tab.", [new NumRequirement(player.quarkstage.quarks, "1e60")], null, [new FlavorEffect("Auto purchase for days!")]));

  //Challenge Milestones
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("4challenges", "[a12x1] Reach a large amount of quarks while being in challenges 1-4", [new NumRequirement(player.quarkstage.quarks, "1e16"), new InChallengeRequirement(player.challenges[0]),new InChallengeRequirement(player.challenges[1]),new InChallengeRequirement(player.challenges[2]),new InChallengeRequirement(player.challenges[3])], null, [new StaticEffect([player.challenges[0],player.challenges[1],player.challenges[2],player.challenges[3]], 1.05, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 1-3 Score by 1.05")]));

  //Electron Milestones
  player.achievements.push([]);
  row = player.achievements.length-1;
  player.achievements[row].push(new Achievement("1e24electrons", "[a13x1] Avogadro's Number", [new NumRequirement(player.electronstage.electrons, "6.022e23")], null, [new FlavorEffect("Unlocks orbitals mechanic.")]));
  player.achievements[row].push(new Achievement("nucleonunlock", "[a13x2] Nucleonize", [new NumRequirement(player.electronstage.electrons, "1e100")], null, [new FlavorEffect("Unlocks a new prestige layer with added mechanics. (Not Currently Implemented)")]));
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
