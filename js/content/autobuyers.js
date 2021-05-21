var autobuyers = {};

function setupautobuyers() {
    autobuyers.quark = new UpgradeAutoBuyer("quarkauto", player.quarkstage.singletonupgrades, new AchievementRequirement("infinityquarks"));
    autobuyers.electron = new UpgradeAutoBuyer("electronauto", player.electronstage.upgrades, new AchievementRequirement("10nucleonize"));
}