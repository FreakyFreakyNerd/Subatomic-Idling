class ExponentialCost{
    constructor(costobject, startingcost, scaling){
        this.costobject = costobject;
        this.startingcost = new Decimal(startingcost);
        this.scaling = new Decimal(scaling);
        this.cost = new Decimal(startingcost);
    }

    recalculatecost(amount){
        this.cost = this.startingcost.times(Decimal.pow(this.scaling, amount));
    }

    get hascost(){
        return this.costobject.has(this.cost);
    }

    subtractcost(){
      this.costobject.subtract(this.cost);
    }
}
