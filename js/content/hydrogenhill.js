function setuphyrdogenhill(){
    player.nucleonstage.hydrogenhill = {};
    player.nucleonstage.hydrogenhill.primedproton = new Currency("primedproton", "Primed Proton", 0);

    player.nucleonstage.hydrogenhill.primedprotonproducers = [];
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp1", "Prime Proton Producer 1", new ExponentialCost(player.nucleonstage.nucleons, "1e20", "1e40"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedproton, .01),new LinearProduction(player.nucleonstage.nucleonsplit.protons, -.01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp2", "Prime Proton Producer 2", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e4", "10"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[0], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp3", "Prime Proton Producer 3", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e24", "100"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[1], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp4", "Prime Proton Producer 4", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e56", "1e4"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[2], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp5", "Prime Proton Producer 5", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e120", "1e8"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[3], .01)], null, "pppbuy", null));
    
    player.nucleonstage.hydrogenhill.hydrogen = new Currency("hydrogen", "Hydrogen", 0);

}