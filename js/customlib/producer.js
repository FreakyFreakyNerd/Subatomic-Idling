class Producer {
    constructor(id, displayname, buyingcurrency, productionobject, startingcost, costincrease, baseproduction){
        this.id = id;
        this.displayname = displayname
        this.startingcost = new Decimal(startingcost);
        this.costincrease = new Decimal(costincrease);
        this.baseproduction = new Decimal(baseproduction);
        this.bought = new Decimal(1);
        this.produced = new Decimal(0);
        this.buyingcurrency = buyingcurrency;
        this.productionobject = productionobject;
    }
    
    get saveData(){
        return this.save()
    }

    save(){
        return { produced : this.produced.toString(), bought : this.bought.toString()};
    }

    parse(data){
        if(data.bought != undefined)
            this.bought = Decimal.fromString(data.bought);
        if(data.produced != undefined)
            this.produced = Decimal.fromString(data.produced);
    }

    add(amount){
        this.produced = this.produced.add(amount);
    }

    buy() {
        cost = this.calccost;
        if (this.buyingcurrency.has(cost)){
            this.bought = this.bought.add(1);
            this.buyingcurrency.removeamount(cost);
        }
    }

    produce(){
        this.productionobject.add(this.calcproduction());
    }

    calccost(){
        return this.startingcost * Decimal.pow(this.costincrease, this.bought)
    }

    calcproduction() {
        return this.amount.times(this.calcproductionper()).divide(settings.tickspersecond);
    }

    calcproductionper() {
        return this.baseproduction;
    }

    get amount(){
        return this.produced.add(this.bought);
    }
}