class ExponentialCost{
    constructor(costobject, startingcost, scaling){
        this.costobject = costobject;
        this.startingcost = new Decimal(startingcost);
        this.scaling = new Decimal(scaling);
        this.cost = new Decimal(startingcost);
    }

    recalculatecost(amount, buyamount){
      if(buyamount != undefined)
        this.cost = (new Decimal(1)).minus(Decimal.pow(this.scaling, buyamount)).divide((new Decimal(1)).minus(this.scaling)).times(Decimal.pow(this.scaling, amount)).times(this.startingcost);
      else
        this.cost = this.startingcost.times(Decimal.pow(this.scaling, amount));
    }

    get hascost(){
        return this.costobject.has(this.cost);
    }

    subtractcost(){
      this.costobject.subtract(this.cost);
    }
}
