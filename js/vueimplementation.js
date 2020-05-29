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
            <span id="producer_quarkgenone_buybutton">Buy x1 Cost:{{format(producer.cost)}}</span>
            <span class="tooltiptext" id="producer_quarkgenone_tooltip">Produces Blah Blah Blah</span>
        </button>
    </div>
    `,
    methods: {
        buyProducer: function(producer){
            producer.buy();
        }
    }
})

var quarkstageproducersapp = new Vue({
    el: '#producers_quarkstage',
    data: {
        producers : player.quarkstage.producers
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