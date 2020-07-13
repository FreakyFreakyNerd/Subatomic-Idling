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

Vue.component('quark-producer-item', {
    props: ['producer'],
    template: `
    <div>
        <span class="baseproducername"> {{producer.displayname}}</span>
        <span class="currencyextra"> x{{format(producer.amount)}}</span>
        <button class="buybutton tooltipholder" v-on:click="buyProducer(producer)">
            <span>Buy x{{format(getbuyamount("quarkgen", producer))}} Cost:{{format(producer.getcost(0))}}</span>
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

Vue.component('quark-upgrade-item', {
    props: ['upgrade'],
    template: `
    <div>
        <span class="baseupgradename"> {{upgrade.displayname}}</span>
        <span class="currencyextra"> x{{format(upgrade.amount)}}</span>
        <button class="tooltipholder" v-on:click="buyUpgrade(upgrade)">
            <span>Buy x{{format(getbuyamount("quarkupg", upgrade))}} Cost:{{format(upgrade.getcost(0))}}</span>
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

Vue.component('buy-display', {
  props: ['buykey','buydisplay'],
  template: `
    <div v-bind:id='buykey+"buyamount"'>
      <span class="currencyextra">{{buydisplay}} Buy Amount: {{getbuyamount(buykey)}}
      Set Buy Amount to: </span>
      <button class="buybutton" v-on:click='setbuyamount(buykey, 1)'>1</button>
      <button class="buybutton" v-on:click='setbuyamount(buykey, 25)'>25</button>
      <button class="buybutton" v-on:click='setbuyamount(buykey, -1)'>Max</button>
    </div>
  `
})

Vue.component('electron-upgrade-item', {
    props: ['upgrade'],
    template: `
      <button class="tooltipholder electronquickupgradebutton" v-bind:style="{left: upgrade.xpos, top: upgrade.ypos, zindex: 1}" v-bind:class="{electronquickupgradebuttonbought: upgrade.ismaxlevel}" v-on:click="buyUpgrade(upgrade)">
        <span class="electronupgradelabel">{{upgrade.label}}</span>
        <div class="tooltip electronupgradetooltip">
          <span class="electronupgradename">{{upgrade.displayname}}\n\n</span>
          <span class="electronupgradebought">Bought: {{upgrade.boughtdescription}}\n</span>
          <span class="electronupgradeeffect">Effects:\n{{upgrade.effectsdescription}}</span>
          <span class="electronupgradecost">Cost for {{upgrade.buyamount}}:\n{{upgrade.costdescription}}</span>
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
    <div class="tooltipholder achievement">
      {{achievement.displayname}}
        <span class="tooltip" v-if='achievement.show && !achievement.hastag("hidetooltip")'>{{achievement.description}}</span>
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
