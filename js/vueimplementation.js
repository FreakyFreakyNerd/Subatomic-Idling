Vue.mixin({
    methods: {
        format: function(val){
            return formatDecimal(val);
        },
        formatSpecial: function(val, over){
            return formatDecimalOverride(val, over);
        }
    }
})

Vue.component('producer-item', {
    props: ['producer'],
    template: `
    <div>
        <span class="baseproducername"> {{producer.displayname}}</span>
        <span class="currencyextra"> x{{format(producer.amount)}}</span>
        <button class="buybutton tooltipholder" v-on:click="buyProducer(producer)">
            <span>Buy x{{getbuyamount(producer)}} Cost:{{format(producer.getcost(0))}}</span>
            <span class="tooltip" id="producer_quarkgenone_tooltip">Produces {{formatSpecial(producer.getproductionper(0), 1)}} {{producer.productions[0].productionobject.displayname}} per second.</span>
        </button>
    </div>
    `,
    methods: {
        buyProducer: function(producer){
            producer.buy();
            recalculateCurrencyPerSec();
        }
    }
})

Vue.component('upgrade-item', {
    props: ['upgrade'],
    template: `
    <div>
        <span class="baseproducername"> {{upgrade.displayname}}</span>
        <span class="currencyextra"> x{{formatSpecial(upgrade.level)}}</span>
        <button class="buybutton tooltipholder" v-on:click="buyUpgrade(upgrade)">
            <span>Buy x1 Cost:{{format(upgrade.getcost(0))}}</span>
            <span class="tooltip">{{upgrade.effectsdescription}}</span>
        </button>
    </div>
    `,
    methods: {
        buyUpgrade: function(upgrade){
            upgrade.buy();
            recalculateCurrencyPerSec();
        }
    }
})

Vue.component('electron-upgrade-item', {
    props: ['upgrade'],
    template: `
      <button class="tooltipholder electronquickupgradebutton" v-bind:style="{left: upgrade.xpos, top: upgrade.ypos, zindex: 1}" v-bind:class="{electronquickupgradebuttonbought: upgrade.ismaxlevel}" v-on:click="buyUpgrade(upgrade)">
        <span class="electronupgradelabel">{{upgrade.label}}</span>
        <div class="tooltip electronupgradetooltip">
          <span class="electronupgradename">{{upgrade.displayname}}\n\n</span>
          <span class="electronupgradelevel">Level: {{upgrade.leveldescription}}\n</span>
          <span class="electronupgradeeffect">Effects:\n{{upgrade.effectsdescription}}</span>
          <span class="electronupgradecost">Costs:\n{{upgrade.costdescription}}</span>
        </div>
      </button>
    `,
    methods: {
        buyUpgrade: function(upgrade){
            upgrade.buy();
            recalculateCurrencyPerSec();
        }
    }
})

Vue.component('line-tree', {
  props: ["linetree", "classspecial"],
  template: `
    <svg v-bind:class="linetree" v-bind:style="{left: linetree.leftoffset, top: linetree.topoffset, zindex: 0, width: linetree.width, height: linetree.height}" style="position: absolute;">
      <tree-line v-for="line in linetree.lines" v-bind:line="line" v-bind:classspecial="classspecial"></tree-line>
    </svg>
  `
})

Vue.component('tree-line', {
  props: ["line", "classspecial"],
  template: `
    <line v-bind:class="classspecial + 'treeline'" v-bind:line="line" v-bind:x1="line.xstart" v-bind:x2="line.xend" v-bind:y1="line.ystart" v-bind:y2="line.yend"/>
  `
})

Vue.component('achievement-item', {
    props: ['achievement'],
    template: `
      <img v-bind:class="{achievement : true, achievementgot: achievement.unlocked}"" v-bind:src='"images/achievement/"+achievement.id+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showAchievement(achievement)"/>
    `,
    methods: {
        showAchievement(achievement){
          subatomicidlingapp.selectedachievement = achievement;
        }
    }
})

Vue.component('challenge-item', {
    props: ['challenge'],
    template: `
    <div class="challengedisplay" @mouseover="showChallenge(challenge)">
      <img v-bind:class="{challengeimage : true, inchallenge: challenge.in}"" v-bind:src='"images/challenge/"+challenge.id+".png"' @error="$event.target.src='images/missing.png'" />
      <div class="centered"><button v-bind:class="{challengeactivator: true, challengeactive: challenge.active, challengeinactive: !challenge.active}" v-on:click="challenge.toggleactive()">{{challenge.activetext}}</button></div>
      <div class="centered challengedifficulty" v-if="challenge.maxdifficulty > 1"><button class="changechallengedifficulty" v-on:click="challenge.decreasedifficulty()">-</button><span class="challengedifficulty">{{challenge.difficultyinformation}}</span><button class="changechallengedifficulty" v-on:click="challenge.increasedifficulty()">+</button></div>
      </div>
    `,
    methods: {
        showChallenge(challenge){
          subatomicidlingapp.selectedchallenge = challenge;
        }
    }
})

Vue.component('prestige-icon', {
    props: ['prestige'],
    template: `
      <img v-bind:class="{prestigeicon : true}"" v-bind:src='"images/prestige/"+prestige.id+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showPrestigeRewards(prestige)" v-on:click="prestige.doprestige()"/>
    `,
    methods: {
        showPrestigeRewards(prestige){
          subatomicidlingapp.selectedprestige = prestige;
        }
    }
})

Vue.component('prestige-requirement', {
    props: ['requirement'],
    template: `
      <span v-bind:class='{prestigerequirement: true, notprestigerequirement: !requirement.hasrequirement}'>{{requirement.progresstext}}</span>
    `
})

Vue.component('prestige-reward', {
    props: ['reward'],
    template: `
     <div class="prestigereward">
      <img v-bind:class="{prestigerewardicon : true}"" v-bind:src='reward.iconpath' @error="$event.target.src='images/missing.png'"/>
      <span v-bind:class='"prestigerewardamount " + reward.colorclass'>+ {{formatDecimalNormal(reward.producedamount)}}</span>
      </div>
    `
})

Vue.component('upgrade-bonus', {
  props: ['upgrade', 'type'],
  template:`
    <span v-bind:class='"bonusupgrade bonus"+upgrade.id+"upgrade"'>{{upgrade.effects[0].geteffect()}}</span>
  `
});

Vue.component('achievement-grid', {
    props: ['achievementslist'],
    template: `
    <table>
      <tr v-for="achievements in achievementslist">
        <td v-for="achievement in achievements">
          <achievement-item v-bind:achievement="achievement">
        </td>
      </tr>
    </table>
    `,
    methods: {
        showAchievement(achievement){
          subatomicidlingapp.selectedachievement = achievement;
        }
    }
})

Vue.component('quark-spin-producer', {
    props: ['producer'],
    template: `
    <div style='align: center;'>
        <span class="baseproducername"> {{producer.displayname}}</span>
        <span class="currencyextra">{{producer.amountdescription}}</span>
        <button class="buybutton tooltipholder"v-on:click="buyProducer(producer)">
            <span class="costtext">Buyx{{formatDecimalNormal(getbuyamount("quarkgen", producer))}} Cost:<span class="quark"> {{formatDecimalNormal(producer.getcost(0))}}</span> {{producer.costs[0].costobject.displayname}}</span>
            <span class="buybuttontooltip tooltip"id="producer_quarkgenone_tooltip">Produces {{formatSpecial(producer.getproductionper(0), 1)}} {{producer.productions[0].productionobject.displayname}} per second.</span>
        </button>
    </div>
    `,
    methods: {
        buyProducer: function(producer){
            producer.buy();
        }
    }
})

Vue.component('buy-amount-selector', {
  props: ['type'],
  template: `
    <button v-bind:class='"buyamountdisplay "+type+"buyamountdisplay"' v-on:click="togglebuyamount(type)">
      <span class='buyamounttext'>Buy Amount: {{getbuyamount(type)}}</span>
    </button>
  `
})

Vue.component('no-effect-upgrade', {
  props: ['upgrade'],
  template: `
    <div><div>{{upgrade.displayname}}</div></div>
  `
})

Vue.component('appliable-upgrade', {
  props: ['upgrade', "appliesto"],
  template: `
    <div> 
      <span class="upgradename">{{upgrade.displayname}} Available: {{formatDecimalNormal(upgrade.available)}}/{{formatDecimalNormal(upgrade.maxappliable)}}</span>
      <button v-bind:class='{appliableupgradecostbutton:true, appliableupgradecostbuttonbuyable: upgrade.canbuy}' v-on:click="buyUpgrade(upgrade)">Upgrade Max: {{upgrade.specialcostdescription}}</button>
      <button class='appliableupgradebutton' v-on:click="upgrade.buymax()">Buy Max</button>
      <button class='appliableupgradebutton' v-on:click="upgrade.unapplyall(); appliesto.forEach(e => { e.unapplyall(); })">Unapply All</button>
    </div>
    `
})

var subatomicidlingapp = new Vue({
    el: '#subatomicidling',
    data: {
        player : player,
        settings : settings
    },
    methods: {
    }
})
