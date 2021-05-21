class Cost{
    constructor(costobject, startingcost, scaling){
        this.costobject = costobject;
        this.startingcost = new Decimal(startingcost);
        this.defaultscaling = new Decimal(scaling);
        this.scaling = new Decimal(scaling);
        this.cost = new Decimal(startingcost);
        this.basecost = new Decimal(startingcost);
        this.scalingeffects = [];
        this.costmult = new Decimal(1);
        this.multeffects = [];
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
    recalculatemult(){
      this.costmult = new Decimal(1);
      this.multeffects.forEach(eff => {
        console.log(eff);
        console.log(eff.value);
        this.costmult = this.costmult.times(eff.value);
      });
    }

    effectchanged(){
      this.recalculatemult();
      this.recalculatescaling();
    }

    applyeffect(effect){
      if(effect.effecttype == EffectTypes.PriceScaling){
        if(this.scalingeffects.indexOf(effect) == -1){
          this.scalingeffects.push(effect);
          this.recalculatescaling();
        }
      }
      if(effect.effecttype == EffectTypes.PriceMultiplier){
        if(this.multeffects.indexOf(effect) == -1){
          this.multeffects.push(effect);
          this.recalculatemult();
        }
      }
    }

    removeeffect(effect){
      if(effect.effecttype == EffectTypes.PriceScaling){
        this.scalingeffects.splice(this.scalingeffects.indexOf(effect), 1);
        this.recalculatescaling();
      }
      if(effect.effecttype == EffectTypes.PriceMultiplier){
        this.multeffects.splice(this.multeffects.indexOf(effect), 1);
        this.recalculatemult();
      }
    }

    recalculatecost(amount, buyamount){
      this.recalculatebasecost(amount, buyamount);
      this.cost = Decimal.max(this.basecost.times(this.costmult), 1);
    }

    get hascost(){
      if(this.cost.equals(0))
        return true;
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
    recalculatebasecost(amount, buyamount){
      if(buyamount != undefined)
        this.basecost = (new Decimal(1)).minus(Decimal.pow(this.scaling, buyamount)).divide((new Decimal(1)).minus(this.scaling)).times(Decimal.pow(this.scaling, amount)).times(this.startingcost);
      else
        this.basecost = this.startingcost.times(Decimal.pow(this.scaling, amount));
      if(this.basecost.lessThan(0))
        this.basecost = this.startingcost.times(Decimal.pow(this.scaling, amount));
    }

    getmaxbuyable(amount){
      var amountavailable = this.costobject.amount;
      var sae = this.startingcost.times(Decimal.pow(this.scaling, amount));
      var buyamount = Decimal.log((sae.plus(amountavailable.times(this.scaling.minus(1)))).divide(sae), this.scaling);
      return Decimal.floor(buyamount);
    }
}

class HyperExponentialCost extends Cost{
  constructor(costobject, startingcost, scaling, hyperscaling){
    super(costobject, startingcost, scaling);
    this.basehyperscaling = hyperscaling;
  }

    recalculatebasecost(amount, buyamount){
      if(buyamount != undefined && !buyamount.equals(1))
        this.basecost = this.startingcost.times(Decimal.pow(this.scaling, Decimal.pow(amount.add(buyamount), this.hyperscaling)));
      else
        this.basecost = this.startingcost.times(Decimal.pow(this.scaling, Decimal.pow(amount, this.hyperscaling)));
      if(this.basecost.lessThan(0))
        this.basecost = new Decimal(-1);
    }

    getmaxbuyable(amount){
      var amountavailable = this.costobject.amount;
      var sae = new Decimal(Decimal.log(amountavailable.divide(this.startingcost), 10)).divide(Decimal.log(this.scaling, 10));
      var max = Decimal.pow(sae, new Decimal(1).divide(this.hyperscaling))
      var buyamount = max.minus(amount);
      return Decimal.floor(buyamount);//Decimal.floor(Decimal.pow(buyamount, (new Decimal(1)).divide(this.hyperscaling)));
    }

    get hyperscaling(){
      return this.basehyperscaling;
    }
}

class LinearCost extends Cost{
    recalculatebasecost(amount, buyamount){
      if(buyamount != undefined && buyamount > 1 && buyamount.greaterThan(1)){
        this.basecost = this.startingcost.times(buyamount).add(new Decimal(buyamount).times(amount).add(Decimal.pow(buyamount, 2).divide(2)).times(this.scaling));
      }
      else
        this.basecost = this.startingcost.add(this.scaling.times(amount));
      if(this.basecost.lessThan(0))
        this.basecost = this.startingcost.add(this.scaling.times(amount));
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
    }

    recalculatebasecost(amount, buyamount){
      this.basecost = this.startingcost.times(buyamount);
    }

    getmaxbuyable(){
      var amt = this.costobject.amount;
      return Decimal.floor(amt.divide(this.startingcost));
    }
}

class CombinedCost {
  constructor(costs, startingamounts){
    if(Array.isArray(costs))
      this.costs = costs;
    else
      this.costs = [costs];
    if(Array.isArray(startingamounts))
      this.startingamounts = startingamounts;
    else
      this.startingamounts = [startingamounts];
    this.costobject = this.costs[0].costobject;
    for(var i = 0; i < this.startingamounts.length; i++){
      this.startingamounts[i] = new Decimal(this.startingamounts[i]);
    }
  }

  recalcluateeffectvalues(){
    this.costs.forEach(cost => {
      cost.recalcluateeffectvalues();
    });
  }

  getmaxbuyable(amount){
    var costind = 0;
    for(var i = 0; i < this.startingamounts.length; i++){
      if(amount > this.startingamounts[i])
        costind = i+1;
    }
    if(costind>1)
      return this.costs[costind].getmaxbuyable(amount.minus(this.startingamounts[costind-1])).add(this.startingamounts[costind-1].minus(amount));
    else
      return this.costs[costind].getmaxbuyable(amount);
  }
  
  effectchanged(){
    this.costs.forEach(cost => {
      cost.effectchanged();
    });
  }

  applyeffect(effect){
    this.costs.forEach(cost => {
      cost.applyeffect(effect);
    });
  }

  removeeffect(effect){
    this.costs.forEach(cost => {
      cost.removeeffect(effect);
    });
  }

  recalculatecost(amount, buyamount){
    if(amount.greaterThanOrEqualTo(this.startingamounts[this.startingamounts.length - 1])){
      this.costs.forEach(cost => {
        cost.cost = new Decimal();
      });
      this.costs[this.costs.length - 1].recalculatecost(amount.minus(this.startingamounts[this.startingamounts.length - 1]), buyamount);
      this.cost = this.costs[this.costs.length - 1].cost;
    }
    else{
      this.cost = new Decimal();
      this.costs[this.costs.length - 1].cost = new Decimal();
      for(var i = 0; i < this.startingamounts.length + 1; i++){
        if(amount.lessThan(this.startingamounts[i]) ){
          var ba = this.startingamounts[i].minus(amount.minus(this.startingamounts[i])).greaterThanOrEqualTo(buyamount) ? buyamount : this.startingamounts[i];
          if(ba.greaterThan(0))
            this.costs[i].recalculatecost(amount, ba);
          else
            this.costs[i].cost = new Decimal();
          this.cost = this.cost.add(this.costs[i].cost);
        }
      }
      var ba = amount.add(buyamount).minus(this.startingamounts[this.startingamounts.length - 1]).greaterThan(0) ? buyamount : amount.minus(this.startingamounts[this.startingamounts.length - 1]);
      if(ba.greaterThan(0))
        this.costs[this.startingamounts.length].recalculatecost(amount, ba);
      else
        this.costs[this.startingamounts.length].cost = new Decimal();
    }
  }

  subtractcost(){
    this.costs.forEach(cost => {
      cost.subtractcost();
    });
  }

  get hascost(){
    var has = true;
    this.costs.forEach(cost => {
      if(!cost.hascost){
        has = false;
        return false;
      }
    });
    return has;
  }

  get description(){
    return formatDecimal(this.cost) + " " + this.costobject.displayname;
  }
}