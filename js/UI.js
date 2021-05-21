var notations = {
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

//UI
function openscreen(screen){
  document.getElementById(player.options.currentscreen + "screen").style.display = "none";
  document.getElementById(screen + "screen").style.display = "block";
  player.options.currentscreen = screen;
}
//stat menu
function openstatscreen(screen){
  document.getElementById(player.options.currentstatscreen + "statscreen").style.display = "none";
  document.getElementById(screen + "statscreen").style.display = "block";
  player.options.currentstatscreen = screen;
}

function closestatscreen(){
  document.getElementById(player.options.currentstatscreen + "statscreen").style.display = "none";
}

function changeTheme(theme){
    player.options.theme = theme;
    updateTheme();
}
function updateTheme(){
    document.getElementById("stylemanager").href = "styles/" + player.options.theme + ".css";
}

function changeNotation(notation){
    player.options.notation = notation;
    subatomicidlingapp.$forceUpdate();
}

function updateafterplayer(){
  openscreen(player.options.currentscreen);
  openproducersscreen(player.options.currentproducersscreen);
  openupgradesscreen(player.options.currentupgradesscreen);
  openstatscreen(player.options.currentstatscreen);
  updateTheme();
}
function setSelectedValue(selectObj, valueToSet) {
  for (var i = 0; i < selectObj.options.length; i++) {
      if (selectObj.options[i].value == valueToSet) {
        selectObj.options[i].selected = true;
        return;
      }
  }
}
const millisecondsperday = 1000*3600*24
const millisecondsperhour = 1000*3600
const millisecondsperminute = 1000*60

function formattime(time, inmilli){
  var milliseconds = inmilli ? time : Date.now() - time;
  var days = Math.floor(milliseconds/millisecondsperday);
  var remainingmilliseconds = milliseconds - days*millisecondsperday;
  var hours = Math.floor(remainingmilliseconds/millisecondsperhour);
  remainingmilliseconds = remainingmilliseconds - hours*millisecondsperhour;
  var minutes = Math.floor(remainingmilliseconds/millisecondsperminute);
  remainingmilliseconds = remainingmilliseconds - minutes*millisecondsperminute;
  var seconds = Math.floor(remainingmilliseconds/1000);
  remainingmilliseconds = remainingmilliseconds - seconds*1000;
  var val = "";
  if(days > 0)
    val += `${days} Days, `;
  if(hours > 0)
    val += `${hours} Hours, `;
  if(minutes > 0)
    val += `${minutes} Minutes, `;
  if(seconds > 0)
    val += `${seconds} Seconds, `;
  val += `${remainingmilliseconds} Milliseconds`;
  return val;
}

function calculatePerSecond(currency){
  var amount = new Decimal(0);
  producerregistry.forEach(element =>{
    amount = amount.add(element.getpersec(currency.id));
  });
  currency.temp.persec = amount;
}

function recalculateCurrencyPerSec(){
  currencyregistry.forEach(element =>{
    calculatePerSecond(element);
  });
}

//Move and moveablescalableobjectscrollingscale = .001;
function scalediv(event, id){
  event.preventDefault();

  element = document.getElementById(id + "content");
  var translatelist = gettranslate(element);
  var scalelist = getscale(element);
  scalelist[0] = Math.min(Math.max(.125, scalelist[0] + -scrollingscale * event.deltaY), 4);
  scalelist[1] = Math.min(Math.max(.125, scalelist[1] + -scrollingscale * event.deltaY), 4);

  var transform = getnewtransform(scalelist, translatelist);

  element.style.transform = transform;
  element.style.webkitTransform = transform;
  element.style.msTransform = transform;
}

var movingobjid = "";
var movingobjx = 0;
var movingobjy = 0;

function startmovingobject(event, id){
  movingobjid = id;
  movingobjx = event.x;
  movingobjy = event.y;
}

function stopmovingobject(id){
  if(movingobjid == id)
    movingobjid = "";
}

function movingobject(event, id){
  event.preventDefault();
  if(id == movingobjid){
    element = document.getElementById(id + "content");
    var translatelist = gettranslate(element);
    translatelist[0] += event.x - movingobjx;
    translatelist[1] += event.y - movingobjy;
    movingobjx = event.x;
    movingobjy = event.y;
    var scalelist = getscale(element);

    var transform = getnewtransform(scalelist, translatelist);

    element.style.transform = transform;
    element.style.webkitTransform = transform;
    element.style.msTransform = transform;
  }
}

function recenter(id){
  element = document.getElementById(id + "content");
  var translatelist = [0,0];
  var scalelist = [1,1];

  var transform = getnewtransform(scalelist, translatelist);

  element.style.transform = transform;
  element.style.webkitTransform = transform;
  element.style.msTransform = transform;
}

function getscale(element){
  var matrix = window.getComputedStyle(element).transform;
  var matrixarray = matrix.replace("matrix(", "").split(",");
  var scalex = parseFloat(matrixarray[0]);
  if(Number.isNaN(scalex))
    scalex = 1;
  var scaley = parseFloat(matrixarray[3]);
  if(Number.isNaN(scaley))
    scaley = 1;
  return [scalex, scaley];
}

function gettranslate(element){
  var matrix = window.getComputedStyle(element).transform;
  var matrixarray = matrix.replace("matrix(", "").split(",");
  var translatex = parseFloat(matrixarray[4]);
  if(Number.isNaN(translatex))
    translatex = 0;
  var translatey = parseFloat(matrixarray[5]);
  if(Number.isNaN(translatey))
    translatey = 0;
  return [translatex, translatey];
}

function getnewtransform(scalelist, translatelist){
  return `matrix(${scalelist[0]}, 0, 0, ${scalelist[1]}, ${translatelist[0]}, ${translatelist[1]})`
}

function formatDecimal(num){
  num = new Decimal(num);
  if(num.lessThan(.001))
    return formatsmallnumber(num, player.options.notationdecimal);
  return notations[player.options.notation].format(num, player.options.notationdecimals, 2);
}

function formatDecimalOverride(num,dec){
  num = new Decimal(num);
  if(num.lessThan(.001))
    return formatsmallnumber(num, dec);
  return notations[player.options.notation].format(num, dec, dec);
}

function formatDecimalNormal(num,dec){
  num = new Decimal(num);
  if(num.lessThan(.001))
    return formatsmallnumber(num, dec);
  if(dec != undefined)
    return notations[player.options.notation].format(num, dec, 0);
  return notations[player.options.notation].format(num, 2, 0);
}

function formatsmallnumber(num, dec){
  if(num.mantissa == 0)
    return "0";
  var scale = dec != undefined ? Math.pow(10,dec) : Math.pow(10,2);
  return `${Math.round(num.mantissa * scale)/scale}e${num.exponent}`;
}

function openproducersscreen(screen){
  document.getElementById(player.options.currentproducersscreen + "producersscreen").style.display = "none";
  document.getElementById(screen + "producersscreen").style.display = "block";
  player.options.currentproducersscreen = screen;
}
function closeproducersscreen(){
  document.getElementById(player.options.currentproducersscreen + "producersscreen").style.display = "none";
}

function openupgradesscreen(screen){
  document.getElementById(player.options.currentupgradesscreen + "upgradesscreen").style.display = "none";
  document.getElementById(screen + "upgradesscreen").style.display = "block";
  player.options.currentupgradesscreen = screen;
}
function closeupgradesscreen(){
  document.getElementById(player.options.currentupgradesscreen + "upgradesscreen").style.display = "none";
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}