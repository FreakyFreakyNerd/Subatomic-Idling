class Cost{
    constructor(costobject, startingcost, scaling){
        this.costobject = costobject;
        this.startingcost = new Decimal(startingcost);
        this.defaultscaling = new Decimal(scaling);
        this.scaling = new Decimal(scaling);
        this.cost = new Decimal(startingcost);
        this.scalingeffects = [];
    }

    recalculateeffectvalues(){
      return;
    }

    recalculatescaling(){
      this.scaling = new Decimal(this.defaultscaling.minus(1));
      this.scalingeffects.forEach((item, i) => {
        this.scaling = this.scaling.times(item.value);
      });
    }

    applyeffect(effect){
      if(effect.effecttype == EffectTypes.PriceScaling){
        this.scalingeffects.push(effect);
      }
    }

    removeeffect(effect){
    }

    recalculatecost(){}

    get hascost(){
        return this.costobject.has(this.cost);
    }

    subtractcost(){
      this.costobject.subtract(this.cost);
    }

    get description(){
      return formatDecimal(this.cost) + " " + this.costobject.displayname;
    }
}

class ExponentialCost extends Cost{
    recalculatecost(amount, buyamount){
      if(buyamount != undefined)
        this.cost = (new Decimal(1)).minus(Decimal.pow(this.scaling, buyamount)).divide((new Decimal(1)).minus(this.scaling)).times(Decimal.pow(this.scaling, amount)).times(this.startingcost);
      else
        this.cost = this.startingcost.times(Decimal.pow(this.scaling, amount));
    }
}

class LinearCost extends Cost{
    recalculatecost(amount, buyamount){
      if(buyamount != undefined)
        this.cost = (new Decimal(1)).minus(Decimal.pow(this.scaling, buyamount)).divide((new Decimal(1)).minus(this.scaling)).times(Decimal.pow(this.scaling, amount)).times(this.startingcost);
      else
        this.cost = this.startingcost.add(this.scaling.times(amount));
    }
}

class StaticCost extends Cost{
    constructor(costobject, cost){
      super(costobject, cost, "0");
      this.cost = cost;
    }

    recalculatecost(amount, buyamount){
      return;
    }
}
