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
  }

  recalculateproduction(amount){
    this.production = Decimal.pow(this.productionper.times(amount), this.exponent);
  }

  produce(){
    this.productionobject.add(this.production.divide(settings.tickspersecond));
  }

  get productionper(){
    return (this.productionincrease.add(this.additionproduction)).times(this.multiplier);
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
        this.additioneffects.splice(this.additioneffects.indexOf(effect), 1);
        this.recalculateproductionaddition();
      }
    }
    if(effect.effecttype == EffectTypes.ProducerMultiplierProduction){
      var ind = this.multipliereffects.indexOf(effect);
      if(ind > -1){
        this.multipliereffects.splice(this.multipliereffects.indexOf(effect), 1);
        this.recalculateproductionmultiplier();
      }
    }
    if(effect.effecttype == EffectTypes.ProducerExponentialProduction){
      var ind = this.exponentialeffects.indexOf(effect);
      if(ind > -1){
        this.exponentialeffects.splice(ind, 1);
        this.recalculateproductionexponential();
      }
    }
  }
}
