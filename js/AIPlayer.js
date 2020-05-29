lastsmallest = undefined
function highlightOptimalQuarkBuy(){
    smallestreturn = undefined;
    smallestproducer = undefined;
    player.quarkstage.producers.forEach(element => {
        val = element.cost.divide(element.oneProduction)
        if(smallestreturn == undefined || val.lessThan(smallestreturn)){
            smallestreturn = val;
            smallestproducer = element;
        }
    });
    lastsmallest = smallestproducer;
    smallestproducer.buy();
    recalculateCurrencyPerSec();
}