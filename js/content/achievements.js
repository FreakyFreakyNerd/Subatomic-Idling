function setupachievements(){
  player.achievements.push(new Achievement("onequarkgenone", "Get A Quark Gen 1", [new NumRequirement(player.quarkstage.producers[0], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgentwo", "Get A Quark Gen 2", [new NumRequirement(player.quarkstage.producers[1], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenthree", "Get A Quark Gen 3", [new NumRequirement(player.quarkstage.producers[2], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenfour", "Get A Quark Gen 4", [new NumRequirement(player.quarkstage.producers[3], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenfive", "Get A Quark Gen 5", [new NumRequirement(player.quarkstage.producers[4], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgensix", "Get A Quark Gen 6", [new NumRequirement(player.quarkstage.producers[5], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenseven", "Get A Quark Gen 7", [new NumRequirement(player.quarkstage.producers[6], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgeneight", "Get A Quark Gen 8", [new NumRequirement(player.quarkstage.producers[7], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgennine", "Get A Quark Gen 9", [new NumRequirement(player.quarkstage.producers[8], 1)], null, null, ["hidetooltip"]));
  player.achievements.push(new Achievement("onequarkgenten", "Get A Quark Gen 10", [new NumRequirement(player.quarkstage.producers[9], 1)], null, [new FlavorEffect("IDK a fleeting sense of accomplishment! Maybe?")], ["hiderequirements"]));
  player.achievements.push(new Achievement("electrifyunlock", "Electrify", [new NumRequirement(player.quarkstage.quarks, "1e16")], null, [new FlavorEffect("Unlocks electrify for all your wonderful electron needs!")]));
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
