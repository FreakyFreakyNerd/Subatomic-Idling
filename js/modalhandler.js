var confirmationmodal = document.getElementById("confirmationmodal");
var confirmationmodaltxt = document.getElementById("confirmationmodaltxt");

var closebutton = document.getElementById("closeconfirmation");
var confirmbutton = document.getElementById("confirmconfirmation");

var infomodal = document.getElementById("infomodal");
var infomodaltxt = document.getElementById("infomodaltxt");
var infoconfirmbutton = document.getElementById("infoconfirmation");

function showmodal(obj) {
  obj.style.display = "block";
}
function hidemodal(obj) {
  obj.style.display = "none";
}

closebutton.onclick = function() {
    log("Close");
    confirmed = false;
    confirmcomplete = true;
}

confirmbutton.onclick = function() {
    confirmed = true;
    confirmcomplete = true;
}

infoconfirmbutton.onclick = function() {
  hidemodal(infomodal);
}

window.onclick = function(event) {
  if (event.target.id == confirmationmodal.id) {
      hidemodal(confirmationmodal);
  }
  if (event.target.id == infomodal.id) {
      hidemodal(infomodal);
  }
}

var confirmcomplete = true;
var confirmed = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function confirmtest(text){
    confirmcomplete = false;
    showmodal(confirmationmodal);
    confirmationmodaltxt.innerHTML = text;
    while(!confirmcomplete){
        await sleep(100);
    }
    hidemodal(confirmationmodal);
    return confirmed;
}

function showinfomodal(text){
  showmodal(infomodal);
  infomodaltxt.innerHTML = text;
}