Vue.mixin({
    methods: {
        format: function(val){
            return formatDecimal(val);
        },
        formatSpecial: function(val, over){
            return formatDecimalOverride(val, over);
        },
        formatDecimalNormal: function(val, over){
            return formatDecimalNormal(val, over);
        },
        hasachievement: function(id){
          return hasachievement(id);
        }
    }
})

Vue.component('quark-producer-item', {
    props: ['producer'],
    template: `
    <div>
        <span class="baseproducername"> {{producer.displayname}}</span>
        <span class="currencyextra">{{producer.amountdescription}}</span>
        <button class="buybutton tooltipholder" v-on:click="buyProducer(producer)">
            <span class="costtext">Buy x{{formatDecimalNormal(getbuyamount("quarkgen", producer))}} Cost: <span
            class="quark">{{formatDecimalNormal(producer.getcost(0))}}</span> {{producer.costs[0].costobject.displayname}}</span>
            <span class="buybuttontooltip tooltip" id="producer_quarkgenone_tooltip">Produces {{formatSpecial(producer.getproductionper(0), 1)}} {{producer.productions[0].productionobject.displayname}} per second.</span>
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

Vue.component('quark-upgrade-item', {
    props: ['upgrade'],
    template: `
    <div>
        <span class="baseproducername"> {{upgrade.displayname}}</span>
        <span class="currencyextra"> x{{formatSpecial(upgrade.amount)}}</span>
        <button class="buybutton tooltipholder" v-on:click="buyUpgrade(upgrade)">
            <span class="costtext">Buy x{{formatSpecial(getbuyamount("quarkupg", upgrade))}} Cost:<span class="quark">{{formatSpecial(upgrade.getcost(0))}}</span> Quarks</span>
            <span class="buybuttontooltip tooltip">{{upgrade.effectsdescription}}</span>
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

Vue.component('producers-display', {
  props: ['producers','type'],
  template: `
    <table>
      <tr class="producerrow" v-for="producer in producers" v-if="producer.unlocked">
        <td v-bind:class='"producerimage producer"+type+"image"'><img v-bind:src='"images/producer/"+producer.id+".png"' @error="$event.target.src='images/missing.png'"/></td>
        <td v-bind:class='"producername producer"+type+"name"'>{{producer.displayname}}: {{producer.amountdescription}}</td>
        <td v-bind:class='"producercost producer"+type+"cost"'><button v-bind:class='{producercostbutton:true, producercostbuttonbuyable: producer.canbuy}' v-on:click="buyProducer(producer)">Cost: {{producer.costdescription}}</button></td>
        <td v-bind:class='"producerauto producer"+type+"auto"'><button v-bind:class='{autobutton: true, autobuttonon: producer.autobuyunlocked && producer.buyauto, autobuttonoff: producer.autobuyunlocked && !producer.buyauto}' v-on:click="toggleproducer(producer)">AUTO: [{{producer.autostate}}]</button></td>
        <td v-bind:class='"producerproduction producer"+type+"production"'>{{producer.productiondescription}}</td>
      </tr>
    </table>
  `,
  methods: {
    buyProducer: function(producer){
      producer.buy();
    },
    toggleproducer: function(producer){
      producer.togglebuystate();
    }
  }
})

Vue.component('upgrades-display', {
  props: ['upgrades','type'],
  template: `
    <table>
      <tr class="upgraderow" v-for="upgrade in upgrades" v-if="upgrade.unlocked">
        <td v-bind:class='"upgradeimage upgrade"+type+"image"'><img v-bind:src='"images/upgrade/"+upgrade.id+".png"' @error="$event.target.src='images/missing.png'"/></td>
        <td v-bind:class='"upgradename upgrade"+type+"name"'>{{upgrade.displayname}}: {{upgrade.amountdescription}}</td>
        <td v-bind:class='"upgradecost upgrade"+type+"cost"'><button v-bind:class='{upgradecostbutton:true, upgradecostbuttonbuyable: upgrade.canbuy}' v-on:click="buyUpgrade(upgrade)">Cost: {{upgrade.specialcostdescription}}</button></td>
        <td v-bind:class='"upgradeauto upgrade"+type+"auto"'><button v-bind:class='"autobutton"' v-on:click="buyupgrade(upgrade)">AUTO: [LOK]</button></td>
        <td v-bind:class='"upgradeeffect upgrade"+type+"effect"'>{{upgrade.specialeffectdescription}}</td>
      </tr>
    </table>
  `,
  methods: {
    buyUpgrade: function(upgrade){
      upgrade.buy();
      recalculateCurrencyPerSec();
    }
  }
})

Vue.component('buy-display', {
  props: ['buykey','buydisplay'],
  template: `
    <div v-bind:id='buykey+"buyamount"'>
      <span class="currencyextra">{{buydisplay}} Buy Amount:{{getbuyamount(buykey)}}
      Set Buy Amount to: </span>
      <button class="buybutton" v-on:click='setbuyamount(buykey, 1)'>1</button>
      <button class="buybutton" v-on:click='setbuyamount(buykey,25)'>25</button>
      <button class="buybutton" v-on:click='setbuyamount(buykey,-1)'>Max</button>
    </div>
  `
})

Vue.component('upgrade-item', {
    props: ['upgrade'],
    template: `
      <img v-bind:class="{upgrade : true, upgradebought: upgrade.bought >= 1, upgrademax : upgrade.ismaxbuyable}" v-on:click="buyUpgrade(upgrade)" v-if="upgrade.unlocked" v-bind:src='"images/upgrade/"+upgrade.id+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showUpgrade(upgrade)"/>
    `,
    methods: {
        buyUpgrade: function(upgrade){
            upgrade.buy();
            recalculateCurrencyPerSec();
        },
        showUpgrade(upgrade){
          subatomicidlingapp.selectedupgrade = upgrade;
        }
    }
})

Vue.component('currency-display', {
  props: ['currency'],
  template: `
  <div class="currencydisplaydiv">
    <img class="currencyimage" v-bind:src='currency.iconpath' @error="$event.target.src='images/missing.png'"/>
    <span v-bind:class='currency.colorclass+" currencydisplay"'>{{formatSpecial(currency.amount, 1)}}</span>
  </div>
  `,
  methods: {
      buyUpgrade: function(upgrade){
          upgrade.buy();
          recalculateCurrencyPerSec();
      },
      showElectronUpgrade(upgrade){
        subatomicidlingapp.selectedelectronupgrade = upgrade;
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
    <line v-bind:class="classspecial + 'treeline'" v-bind:line="line" v-bind:x1="line.xstart" v-bind:x2="line.xend" v-bind:y1="line.ystart" v-bind:y2="line.yend" v-if="line.upgrade.unlocked"/>
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
      <img v-bind:class="{challenge : true, inchallenge: challenge.in}"" v-bind:src='"images/challenge/"+challenge.id+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showChallenge(challenge)"/>
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

var subatomicidlingapp = new Vue({
    el: '#subatomicidling',
    data: {
        player : player,
        settings : settings,
        selectedupgrade : player.quarkstage.upgrades[0],
        selectedachievement : player.achievements[0][0],
        selectedchallenge : player.challenges[0],
        selectedprestige : prestigeregistry[0],
        versions : versions,
        prestiges : prestigeregistry
    },
    methods: {
    }
})
