function setupGame() {
  setupbasicquarkstage();
  setupbasicelectronstage();
  setupbasicnucleonstage();

  setupquarkproducers();
  setupbasicquarkupgrades();
  setupbasicquarksingletonupgrades();

  setupquarkspinproducers();
  setupbasicelectronupgrades();
  setupchallenges();
  setupbasicquarkspinupgrades();

  setupbasicelectroncloud();

  setupstage2quarksingletonupgrades();

  setupbasicelectronupgradesstage2();

  //Post Nucleonize
  setupnucleonproducers();
  setupbasicnucleonupgrades();

  setupbasicnucleonsingletonupgrades();
}

function totalproducerbought(producers) {
  var amt = new Decimal();
  producers.forEach(prod => {
    amt = amt.add(prod.bought);
  });
  return amt;
}