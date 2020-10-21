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
    this.effectmult = new Decimal(1);
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
          this.recalculatemulteffect();
        }
        break;
    }
  }

  removeeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.PrestigeCurrencyBaseGain:
        if(this.addeffects.includes(effect)){
          this.addeffects.splice(this.addeffects.indexOf(effect));
          this.recalculateaddeffect();
        }
        break;
      case EffectTypes.PrestigeCurrencyMultiplicativeGain:
        if(this.multeffects.includes(effect)){
          this.multeffects.splice(this.multeffects.indexOf(effect));
          this.recalculatemulteffect();
        }
        break;
    }
  }

  doprestige(){
    if(this.producedamount.equals(0))
      return;
    this.producescurrency.add(this.producedcurrencyamount)
    this.onprestigefunction(this.producedcurrencyamount);
  }

  forceprestige(){
    this.producescurrency.add(this.producedcurrencyamount)
    this.onprestigefunction(this.producedcurrencyamount);
  }

  get producedcurrencyamount(){
    if(this.baseamount.equals("0"))
      return new Decimal();
    return this.baseamount.add(this.effectadd).times(this.effectmult);
  }

  get baseamount(){
    return this.amountfunction(this.consumescurrency.gained);
  }
}
