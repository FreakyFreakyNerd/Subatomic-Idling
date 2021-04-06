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
      this.recalculatescaling();
    }

    getmaxbuyable(amount){
      return new Decimal(-1);
    }

    recalculatescaling(){
      this.scaling = new Decimal(this.defaultscaling.minus(1));
      this.scalingeffects.forEach((item, i) => {
        this.scaling = this.scaling.times(item.value);
      });
      this.scaling = this.scaling.add(1)
    }

    applyeffect(effect){
      if(effect.effecttype == EffectTypes.PriceScaling){
        this.scalingeffects.push(effect);
        this.recalculatescaling();
      }
    }

    removeeffect(effect){
      if(effect.effecttype == EffectTypes.PriceScaling){
        this.scalingeffects.splice(this.scalingeffects.indexOf(effect), 1);
        this.recalculatescaling();
      }
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
      if(this.cost.lessThan(0))
        this.cost = this.startingcost.times(Decimal.pow(this.scaling, amount));
    }

    getmaxbuyable(amount){
      var amountavailable = this.costobject.amount;
      var sae = this.startingcost.times(Decimal.pow(this.scaling, amount));
      var buyamount = Decimal.log((sae.plus(amountavailable.times(this.scaling.minus(1)))).divide(sae), this.scaling);
      return Decimal.floor(buyamount);
    }
}

class LinearCost extends Cost{
    recalculatecost(amount, buyamount){
      if(buyamount != undefined && buyamount != 1)
        this.cost = this.startingcost.times(buyamount).add(buyamount.times(amount).add(Decimal.pow(buyamount, 2).divide(2)).times(this.scaling));
      else
        this.cost = this.startingcost.add(this.scaling.times(amount));
      if(this.cost.lessThan(0))
        this.cost = this.startingcost.add(this.scaling.times(amount));
    }

    getmaxbuyable(amount){
      var amountavailable = this.costobject.amount;
      var b = this.startingcost.divide(this.scaling).add(amount)
      var buyamount = b.times(-1).add(Decimal.pow(Decimal.pow(b, 2).add(amountavailable.divide(this.scaling).times(2)), .5))
      return Decimal.floor(buyamount);
    }
}

class StaticCost extends Cost{
    constructor(costobject, cost){
      super(costobject, cost, "0");
      this.cost = new Decimal(cost);
    }

    recalculatecost(amount, buyamount){
      this.cost = this.startingcost.times(buyamount);
    }

    getmaxbuyable(){
      var amt = this.costobject.amount;
      return Decimal.floor(amt.divide(this.startingcost));
    }
}
