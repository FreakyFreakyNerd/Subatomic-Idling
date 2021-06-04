var selectedboard = undefined;
var controldown = false;
var shiftdown = false;
window.addEventListener('keydown', function(event){
    controldown = event.ctrlKey;
    shiftdown = event.shiftKey;
    shiftdown = event.shiftKey;
})

window.addEventListener('keyup', function(event){
    controldown = event.ctrlKey;
    shiftdown = event.shiftKey;
})

window.addEventListener('keydown', function(e){
    if(!player.options.hotkeysenabled)
        return;
    switch(e.code){
        case "Digit1":
            player.quarkstage.producers[0].buy();
            break;
        case "Digit2":
            player.quarkstage.producers[1].buy();
            break;
        case "Digit3":
            player.quarkstage.producers[2].buy();
            break;
        case "Digit4":
            player.quarkstage.producers[3].buy();
            break;
        case "Digit5":
            player.quarkstage.producers[4].buy();
            break;
        case "Digit6":
            player.quarkstage.producers[5].buy();
            break;
        case "Digit7":
            player.quarkstage.producers[6].buy();
            break;
        case "Digit8":
            player.quarkstage.producers[7].buy();
            break;
        case "Digit9":
            player.quarkstage.producers[8].buy();
            break;
        case "Digit0":
            player.quarkstage.producers[9].buy();
            break;
        case "KeyM":
            player.quarkstage.producers.forEach(prod => {
                prod.buy();
            });
            player.quarkstage.upgrades.forEach(prod => {
                prod.buy();
            });
            break;
        case "KeyE":
            if(!player.options.confirmations.electrify)
                player.quarkstage.electrify.doprestige();
            break;
        case "KeyC":
            togglechallenges();
            break;
        case "KeyR":
            if(selectedboard != undefined)
                selectedboard.rotateselected();
            break;
        case "KeyT":
            if(selectedboard != undefined)
                selectedboard.deselectpiece();
            break;
    }
})