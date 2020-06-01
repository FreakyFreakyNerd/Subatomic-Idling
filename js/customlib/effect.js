class LinearEffect{
  /*
  Valid Effect Types
  Producer : "base-production-increase"
  Producer : "production-multiplier"
  */
  constructor(objectsappliesto, effectincrease, effecttype, effectdefualtvalue, appliestotext, effectdescription, args){
    this.appliesto = objectsappliesto;
    this.appliestotext = appliestotext;
    this.args = args;
    this.effectdescription = effectdescription;
    this.effecttype = effecttype;
    this.increase = new Decimal(effectincrease);
    this.defaultval = new Decimal(effectdefualtvalue);
    this.value = new Decimal(effectdefualtvalue);
  }

  geteffect(){
    if(this.effectdescription != undefined)
      return this.effectdescription(this);
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimal(this.value) + ".\nAdds " + " +" + formatDecimal(this.increase) + " to above multiplier per level."
    }
    return
  }

  getarg(type){
    if(this.args == undefined)
    return undefined;
    return this.args[type];
  }

  recalculatevalue(amount){
    this.value = this.defaultval.add(this.increase.times(amount));
    this.appliesto.forEach((item, i) => {
      item.effectchanged();
    });

  }

  apply(){
    this.appliesto.forEach((obj, i) => {
      obj.applyeffect(this);
    });
  }

  remove(){
    this.appliesto.forEach((obj, i) => {
      obj.removeeffect(this);
    });
  }
}

class ExponentialEffect{
  constructor(objectsappliesto, effectincrease, effecttype, effectdefualtvalue, appliestotext, effectdescription, args){
    this.appliesto = objectsappliesto;
    this.appliestotext = appliestotext;
    this.effectdescription = effectdescription;
    this.args = args;
    this.effecttype = effecttype;
    this.increase = new Decimal(effectincrease);
    this.defaultval = new Decimal(effectdefualtvalue);
    this.value = new Decimal(effectdefualtvalue);
  }

  geteffect(){
    if(this.effectdescription != undefined)
      return this.effectdescription(this);
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
      return "Multiplies " + this.appliestotext + " production by " + formatDecimal(this.value) + "."
    }
    return
  }

  getarg(type){
    if(this.args == undefined)
    return undefined;
    return this.args[type];
  }

  recalculatevalue(amount){
    this.value = this.defaultval.times(Decimal.pow(this.increase, amount));
    this.appliesto.forEach((item, i) => {
      item.effectchanged();
    });

  }

  apply(){
    this.appliesto.forEach((obj, i) => {
      obj.applyeffect(this);
    });
  }

  remove(){
    this.appliesto.forEach((obj, i) => {
      obj.removeeffect(this);
    });
  }
}

const EffectTypes = {
  ProducerBaseProduction : 1,
  ProducerMultiplierProduction : 2
}
