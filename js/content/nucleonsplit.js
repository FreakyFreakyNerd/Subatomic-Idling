function setupbasicnucelonplit(){
    player.nucleonstage.split = {};
    player.nucleonstage.split.protons = new Currency("proton", "Protons", 0);
    player.nucleonstage.split.neutrons = new Currency("neutron", "Neutrons", 0);

    player.nucleonstage.split.protongenerator = new Producer("protongen", null, null,[new LinearProduction(player.nucleonstage.split.protons, 0, 0)], null,null,null);
    player.nucleonstage.split.protongenerator.bought = new Decimal(1);

    player.nucleonstage.split.gridinfo = {};
    player.nucleonstage.split.gridinfo.grid = new Board(10, 10);
    player.nucleonstage.split.gridinfo.piecegenerator = new PieceGenerator("splitpiecegen", 1, 1, new ExponentialCost(player.nucleonstage.split.protons, "10", "10"), {}, {}, [() => 1,() => 1,() => 1], [() => 1,() => 1,() => 1])
}