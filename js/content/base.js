function setupGame(){
  setupbasicquarkstage();
  setupbasicelectronstage();
  setupbasicnucleonstage();

  setupquarkproducers();
  setupbasicquarkupgrades();
  setupbasicquarksingletonupgrades();

  setupbasicelectronupgrades();
  setupquarkspinproducers();
  setupchallenges();
  setupbasicquarkspinupgrades();

  setupstage2quarksingletonupgrades();

  setupbasicelectroncloud();

  //Post Nucleonize
  setupnucleonproducers();
  setupbasicnucleonupgrades();

  setupbasicnucleonsingletonupgrades();
}

function totalproducerbought(producers){
  var amt = new Decimal();
  producers.forEach(prod => {
    amt = amt.add(prod.bought);
  });
  return amt;
}