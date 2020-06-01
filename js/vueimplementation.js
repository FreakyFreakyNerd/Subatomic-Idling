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
        <span class="currencyextra"> x{{formatSpecial(producer.amount)}}</span>
        <button class="buybutton" v-on:click="buyProducer(producer)">
            <span>Buy x{{getbuyamount(producer)}} Cost:{{format(producer.getcost(0))}}</span>
            <span class="tooltiptext" id="producer_quarkgenone_tooltip">Produces {{format(producer.getproductionper(0))}} {{producer.productions[0].productionobject.displayname}} per second.</span>
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
        <button class="buybutton" v-on:click="buyUpgrade(upgrade)">
            <span>Buy x1 Cost:{{format(upgrade.getcost(0))}}</span>
            <span class="tooltiptext">{{upgrade.effects[0].geteffect()}}</span>
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

var quarkstageproducersapp = new Vue({
    el: '#producers_quarkstage',
    data: {
        producers : player.quarkstage.producers,
        upgrades : player.quarkstage.upgrades,
        player : player
    },
    methods: {
    }
})

var quarkcurrencydisplay = new Vue({
    el: "#quarkcurrency",
    data: {
        currency : player.quarkstage.quarks
    }
})
