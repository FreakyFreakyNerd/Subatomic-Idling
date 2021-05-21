class LinearProduction{
  constructor(productionobject, productionper, startingproduction){
    this.productionobject = productionobject;
    if(startingproduction != undefined)
      this.startingproduction = new Decimal(startingproduction);
    else
      this.startingproduction = new Decimal(0);
    this.productionincrease = new Decimal(productionper);
    this.production = new Decimal(startingproduction);
    this.additioneffects = [];
    this.multipliereffects = [];
    this.exponentialeffects = [];
    this.additionproduction = new Decimal(0);
    this.multiplier = new Decimal(1);
    this.exponent = new Decimal(1);
    this.queuedamount = new Decimal();
  }

  recalculateproductionaddition(){
    this.additionproduction = new Decimal(0);
    this.additioneffects.forEach((effect, i) => {
      this.additionproduction = this.additionproduction.add(effect.value);
    });
  }

  recalculateproductionexponential(){
    this.exponent = new Decimal(1);
    this.exponentialeffects.forEach((effect, i) => {
      this.exponent = this.exponent.times(effect.value);
    });
  }

  recalculateproductionmultiplier(){
    this.multiplier = new Decimal(1);
    this.multipliereffects.forEach((effect, i) => {
      this.multiplier = this.multiplier.times(effect.value);
    });
  }

  recalculateeffectvalues(){
    this.recalculateproductionaddition();
    this.recalculateproductionmultiplier();
    this.recalculateproductionexponential();
    this.recalculateproduction(this.queuedamount);
  }

  recalculateproduction(amount){
    this.queuedamount = amount;
    this.production = this.startingproduction.add(this.productionper.times(amount));
  }

  produce(prodratio){
    this.productionobject.add(this.production.times(prodratio));
  }

  get productionper(){
    return Decimal.pow((this.productionincrease.add(this.additionproduction)).times(this.multiplier), this.exponent);
  }

  applyeffect(effect){
    if(effect.effecttype == EffectTypes.ProducerBaseProduction){
      this.additioneffects.push(effect);
      this.recalculateproductionaddition();
    }
    if(effect.effecttype == EffectTypes.ProducerMultiplierProduction){
      this.multipliereffects.push(effect);
      this.recalculateproductionmultiplier();
    }
    if(effect.effecttype == EffectTypes.ProducerExponentialProduction){
      this.exponentialeffects.push(effect);
      this.recalculateproductionexponential();
    }
  }


  removeeffect(effect){
    if(effect.effecttype == EffectTypes.ProducerBaseProduction){
      var ind = this.additioneffects.indexOf(effect);
      if(ind > -1){
        this.additioneffects.splice(ind, 1);
        this.recalculateproductionaddition();
      }
    }
    if(effect.effecttype == EffectTypes.ProducerMultiplierProduction){
      var ind = this.multipliereffects.indexOf(effect);
      if(ind > -1){
        this.multipliereffects.splice(ind, 1);
        this.recalculateproductionmultiplier();
      }
    }
    if(effect.effecttype == EffectTypes.ProducerExponentialProduction){
      var ind2 = this.exponentialeffects.indexOf(effect);
      if(ind2 > -1){
        this.exponentialeffects.splice(ind2, 1);
        this.recalculateproductionexponential();
      }
    }
  }
}
