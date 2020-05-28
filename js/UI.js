//import * as ADNotations from "@antimatter-dimensions/notations"
elements = {
    options: {
        uiupdateratedisplay : document.getElementById("uiupdateratedisplay"),
        notationdecimalsdisplay : document.getElementById("notationdecimalamountdisplay")
    }
}

currentscreen = "producers"

document.getElementById("optionsmenubutton").onclick = function(){openscreen("options")};
document.getElementById("producersmenubutton").onclick = function(){openscreen("producers")};

function openscreen(screen){
    document.getElementById(currentscreen + "screen").style.display = "none";
    document.getElementById(screen + "screen").style.display = "block";
    currentscreen = screen
}

document.getElementsByName("maincurrencylabel").forEach(element => {
    element.innerHTML = settings.maincurrencyname;
});

notations = {
    "standard": new ADNotations.StandardNotation(),
    "scientific": new ADNotations.ScientificNotation(),
    "engineering": new ADNotations.EngineeringNotation(),
    "mixedscientific": new ADNotations.MixedScientificNotation(),
    "mixedengineering": new ADNotations.MixedEngineeringNotation(),
    "letters": new ADNotations.LettersNotation(),
    "cancer": new ADNotations.CancerNotation(),
    "logarithm": new ADNotations.LogarithmNotation(),
    "brackets": new ADNotations.BracketsNotation(),
    "infinity": new ADNotations.InfinityNotation(),
    "roman": new ADNotations.RomanNotation(),
    "dots": new ADNotations.DotsNotation(),
    "zalgo": new ADNotations.ZalgoNotation(),
    "hex": new ADNotations.HexNotation(),
    "imperial": new ADNotations.ImperialNotation(),
    "clock": new ADNotations.ClockNotation(),
    "prime": new ADNotations.PrimeNotation(),
    "bar": new ADNotations.BarNotation(),
    "shi": new ADNotations.ShiNotation(),
    "blind": new ADNotations.BlindNotation()
    //"all": new ADNotations.ALLNotation()
}

function formatDecimal(num){
    return notations[player.options.notation].format(num, player.options.notationdecimals, player.options.notationdecimals);
}

function formatDecimalOverride(num,dec){
    return notations[player.options.notation].format(num, dec, dec);
}

function updateCurrencyDisplay(currency) {
    amountdisplay = document.getElementById("currency_" + currency.id + "_amount");
    amountdisplay.innerHTML = formatDecimal(player.quarkstage.quarks.amount);
}

function updateProducerDisplay(producer){
    amountdisplay = document.getElementById("producer_" + producer.id + "_amount");
    amountdisplay.innerHTML = "x" + formatDecimal(producer.amount);

    buydisplay = document.getElementById("producer_" + producer.id + "_buybutton")
    buydisplay.innerHTML = "Buy x1 Cost:" + formatDecimal(producer.cost);
}

function setupProducerBuyOnClick(producer){
    namedisplay = document.getElementById("producer_" + producer.id + "_name")
    namedisplay.innerHTML = producer.displayname;

    buydisplay = document.getElementById("producer_" + producer.id + "_buybutton")
    buydisplay.onclick = function() { producer.buy(); recalculateCurrencyPerSec();};
}

function updateCurrencyPerSec(currency){
    str = "You are making " + formatDecimal(currency.temp.persec) + " " + currency.pluraldisplayname + " per second.";
    document.getElementById("currency_" + currency.id + "_amountpersec").innerHTML = str;
}
function changeNotation(notation){
    player.options.notation = notation;
}
function changeTheme(theme){
    player.options.theme = theme;
    updateTheme();
}
function updateTheme(){
    document.getElementById("stylemanager").href = "styles/" + player.options.theme + ".css";
}
function updateUIUpdateRateDisplay(){
    elements.options.uiupdateratedisplay.innerHTML = "UI Update Delay:" + player.options.uidelay + "ms"
}

function changeNotationDecimals(val){
    player.options.notationdecimals = val;
    updateNotationDecimals();
}
function updateNotationDecimals(){
    elements.options.notationdecimalsdisplay.innerHTML = "Notation Decimals:" + player.options.notationdecimals;
}

function updateAfterPlayer(){
    document.getElementById("notations").value = player.options.notation;
    startInterval();
    updateTheme();
    updateUIUpdateRateDisplay();
    document.getElementById("uiupdaterange").value = player.options.uidelay;
    updateNotationDecimals();
    document.getElementById("notationdecimalsrange").value = player.options.notationdecimals;
    producerregistry.forEach(element => {
        setupProducerBuyOnClick(element);
    });
}




//UI Updating
uiintervalid = 0;
function updateUITick(){
    //updateCurrency();
    currencyregistry.forEach(element => {
        updateCurrencyDisplay(element);
        updateCurrencyPerSec(element);
    });
    producerregistry.forEach(element => {
        updateProducerDisplay(element)
    });
    //updateCurrencyPerSec();
    //updateCurrencyOneMultiplier();
}
function startInterval(){
    uiintervalid = setInterval(function(){
        updateUITick()
    }, player.options.uidelay);
}

function changeUIUpdateDelay(delay){
    player.options.uidelay = delay;
    clearInterval(uiintervalid);
    startInterval();
    updateUIUpdateRateDisplay()
}