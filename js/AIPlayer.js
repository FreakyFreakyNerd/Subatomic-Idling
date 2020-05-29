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
    if(lastsmallest != undefined)
        document.getElementById("producer_" + lastsmallest.id + "_buybutton").classList.remove("optimal");
    lastsmallest = smallestproducer;
    document.getElementById("producer_" + smallestproducer.id + "_buybutton").classList.add("optimal");
    smallestproducer.buy();
}