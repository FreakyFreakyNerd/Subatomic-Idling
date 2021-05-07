var confirmationmodal = document.getElementById("confirmationmodal");
var confirmationmodaltxt = document.getElementById("confirmationmodaltxt");

var closebutton = document.getElementById("closeconfirmation");
var confirmbutton = document.getElementById("confirmconfirmation");

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

window.onclick = function(event) {
  if (event.target.id == confirmationmodal.id) {
      hidemodal(confirmationmodal);
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