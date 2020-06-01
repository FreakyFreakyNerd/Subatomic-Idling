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
    this.additionproduction = new Decimal(0);
    this.multiplier = new Decimal(1)
  }

  recalculateproductionaddition(){
    this.additionproduction = new Decimal(0);
    console.log(this.additioneffects.length)
    this.additioneffects.forEach((effect, i) => {
      this.additionproduction = this.additionproduction.add(effect.value);
      console.log(this.additionproduction)
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
  }

  recalculateproduction(amount){
    this.production = this.startingproduction.add(this.productionincrease.add(this.additionproduction).times(amount).times(this.multiplier));
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
  }


  removeeffect(effect){
    if(effect.effecttype == EffectTypes.ProducerBaseProduction){
      this.additioneffects.splice(this.additioneffects.indexOf(effect), 1);
      this.recalculateproductionaddition();
    }
    if(effect.effecttype == EffectTypes.ProducerMultiplierProduction){
      this.multipliereffects.splice(this.multipliereffects.indexOf(effect), 1);
      this.recalculateproductionmultiplier();
    }
  }
}
