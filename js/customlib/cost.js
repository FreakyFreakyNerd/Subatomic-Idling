class ExponentialCost{
    constructor(costobject, startingcost, scaling){
        this.costobject = costobject;
        this.startingcost = new Decimal(startingcost);
        this.scaling = new Decimal(scaling);
        this.cost = new Decimal(startingcost);
    }

    recalculatecost(amount, buyamount){
      if(buyamount != undefined)
        this.cost = this.startingcost.times(Decimal.pow(this.scaling, amount.add(player.options.buyamount)) - Decimal.pow(this.scaling, amount));
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
