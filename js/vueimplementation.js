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
      <tr class="producerrow" v-for="producer in producers">
        <td v-bind:class='"producerimage producer"+type+"image"'><img v-bind:src='"images/producer/"+producer.id+".png"' @error="$event.target.src='images/missing.png'"/></td>
        <td v-bind:class='"producername producer"+type+"name"'>{{producer.displayname}}: {{producer.amountdescription}}</td>
        <td v-bind:class='"producercost producer"+type+"cost"'><button v-bind:class='"producercostbutton producer"+type+"costbutton"' v-on:click="buyProducer(producer)">Cost: {{producer.costdescription}}</button></td>
        <td v-bind:class='"producerauto producer"+type+"auto"'><button v-bind:class='"producerautobutton producer"+type+"autobutton"' v-on:click="buyProducer(producer)">AUTO: [LOK]</button></td>
        <td v-bind:class='"producerproduction producer"+type+"production"'>{{producer.productiondescription}}</td>
      </tr>
    </table>
  `,
  methods: {
    buyProducer: function(producer){
      producer.buy();
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

Vue.component('electron-upgrade-item', {
    props: ['upgrade'],
    template: `
      <img v-bind:class="{electronupgrade : true, electronupgradebought: upgrade.bought >= 1, electronupgrademax : upgrade.ismaxbuyable}" v-on:click="buyUpgrade(upgrade)" v-if="upgrade.unlocked" v-bind:src='"images/electron/"+upgrade.id+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showElectronUpgrade(upgrade)"/>
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

Vue.component('currency-display', {
  props: ['currency'],
  template: `
  <div class="currencydisplaydiv">
    <img class="currencyimage" v-bind:src='"images/currency/"+currency.id+".png"' @error="$event.target.src='images/missing.png'"/>
    <span v-bind:class='"currency"+currency.id+"display currencydisplay"'>{{formatSpecial(currency.amount, 1)}}</span>
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
      <img v-bind:class="{achievement : true, achievement: achievement.unlocked}"" v-bind:src='"images/achievement/"+achievement.id+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showAchievement(achievement)"/>
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

var subatomicidlingapp = new Vue({
    el: '#subatomicidling',
    data: {
        player : player,
        settings : settings,
        selectedelectronupgrade : player.electronstage.upgrades[0],
        selectedachievement : player.achievements[0]
    },
    methods: {
    }
})
