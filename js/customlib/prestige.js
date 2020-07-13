class Prestige{
  constructor(displayname, producescurrency, consumescurrency, amountfunction, onprestigefunction){
    this.displayname = displayname;
    this.producescurrency = producescurrency;
    this.consumescurrency = consumescurrency;
    this.amountfunction = amountfunction;
    this.onprestigefunction = onprestigefunction;
    this.effectadd = new Decimal(0);
    this.addeffects = [];
    this.effectmult = new Decimal(1);
    this.multeffects = [];
  }

  effectchanged(){
    this.recalculateaddeffect();
    this.recalculatemulteffect();
  }

  recalculateaddeffect(){
    this.effectadd = new Decimal(0);
    this.addeffects.forEach((item, i) => {
      this.effectadd = this.effectadd.add(item.value);
    });
  }

  recalculatemulteffect(){
    this.effectmult = new Decimal(0);
    this.multeffects.forEach((item, i) => {
      this.effectmult = this.effectmult.times(item.value);
    });
  }

  applyeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.PrestigeCurrencyBaseGain:
        if(!this.addeffects.includes(effect)){
          this.addeffects.push(effect);
          this.recalculateaddeffect();
        }
        break;
      case EffectTypes.PrestigeCurrencyMultiplicativeGain:
        if(!this.multeffects.includes(effect)){
          this.multeffects.push(effect);
          this.recal
        }
        break;
    }
  }

  doprestige(){
    this.producescurrency.add(this.producedcurrencyamount)
    this.onprestigefunction(this.producedcurrencyamount);
  }

  get producedcurrencyamount(){
    return this.baseamount.add(this.effectaddamount).times(this.effectmult);
  }

  get baseamount(){
    return this.amountfunction(this.consumescurrency.amount);
  }
}
