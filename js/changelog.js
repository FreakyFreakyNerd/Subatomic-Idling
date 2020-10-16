versions = ["A0.0.1"];

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function openchangelogscreen(version){
  document.getElementById('changelogdisplay').innerHTML = changelogs[version];
}

changelogs = {};
changelogs["A0.0.1"] =
`
Welcome to the beginning of Subatomic Idling- Be warned this will contain heavy spoilers

- 10 Base Quark Generators, which can be upgraded with quarks and will produce more quarks
- 10 Base Quark Upgrades, which can be upgraded with quarks and will increase quark production

- Electrify: Upon reaching 1e16 quarks electrify will open up providing new upgrades to by, and some other fun things
`;

openchangelogscreen(versions[versions.length-1]);
