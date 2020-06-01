class LinearEffect{
  /*
  Valid Effect Types
  Producer : "base-production-increase"
  Producer : "production-multiplier"
  */
  constructor(objectsappliesto, effectincrease, effecttype, effectdefualtvalue, appliestotext, args){
    this.appliesto = objectsappliesto;
    this.appliestotext = appliestotext;
    this.args = args;
    this.effecttype = effecttype;
    this.increase = new Decimal(effectincrease);
    this.defaultval = new Decimal(effectdefualtvalue);
    this.value = new Decimal(effectdefualtvalue);
  }

  geteffectper(){
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Adds " + " +" + formatDecimal(this.increase) + " to above multiplier per level."
    }
    return
  }

  geteffect(){
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimal(this.value) + "."
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

}

const EffectTypes = {
  ProducerBaseProduction : 1,
  ProducerMultiplierProduction : 2
}
