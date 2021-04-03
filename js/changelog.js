let versions = ["A0.02", "A0.01"];

function openchangelogscreen(version){
  document.getElementById('changelogdisplay').innerHTML = changelogs[version];
}

var changelogs = {};
changelogs["A0.01"] =
`
Welcome to the beginning of Subatomic Idling- Be warned this will contain heavy spoilers
- Released 3/12/2021
- First public release of the game
- Quarks, along with producers and many upgrades that follow with them
- Electrons, which are gained through the first prestige layer
- Electrons come with there own producers that will provide a bonus to quark production
- Electrons also come with many upgrades to boost your power higher
- An orbital mechanic that allows for more upgrades and production
- Challenges to challenge and test your puzzle solving abilities
- Achievements to track overall progress through the game
`;

changelogs["A0.02"] =
`
Welcome to the first update now that the game is out there
- Released 4/3/2021
- Challenges have had information added to the user to hopefully clear up a lot of confusion
- Challenges have been rebalanced as to make them fit the ideas I had at the beginning
- Statistics have been fixxed and should be working correctly now
- Some Electron upgrades have been rebalanced
- Some Quark Spin Upgrades have been rebalanced
- More textures have made it into the game
Now for more detail (n=nerf, b=buff, +=added, -=removed, f=bug fix)
n e11 Max Level 10000 -> 1000
+ a1x12 Now provides a score bonus: 1.05 to challenge 1-4
- Easier Challenges Quark Spin upgrade
+ Better Challenges Quark Spin upgrade: Boost Challenge 1-4 Score
f Fixxed all statistics not working
f Fixxed Multor Plus not applying to the correct upgrade
n Multor Plus Bonus .1 -> .001
+ Challenge and Achievement Textures
+ File based saving and loading
+ Hotkeys, More to come
`;

openchangelogscreen(versions[0]);