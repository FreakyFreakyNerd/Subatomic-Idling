class Effect{
  /*
  Valid Effect Types
  Producer : "base-production-increase"
  Producer : "production-multiplier"
  */

  constructor(objectsappliesto, effectdefualtvalue, effectincrease, effecttype, appliestotext, effectdescription, args){
    if(Array.isArray(objectsappliesto))
      this.appliesto = objectsappliesto;
    else
      this.appliesto = [objectsappliesto]
    this.appliestotext = appliestotext;
    this.args = args;
    this.effectdescription = effectdescription;
    this.effecttype = effecttype;
    console.log(effectdefualtvalue);
    this.increase = new Decimal(effectincrease);
    this.defaultval = new Decimal(effectdefualtvalue);
    this.value = new Decimal(effectdefualtvalue);
    this.onconstructfinish();
  }

  onconstructfinish(){}

  geteffect(){
    if(this.effectdescription != undefined)
      return this.effectdescription(this);
    else {
      return this.description;
    }
    return
  }

  get description(){
    return "no effect description assigned";
  }

  getarg(type){
    if(this.args == undefined)
    return undefined;
    return this.args[type];
  }

  recalculatevalue(){
    this.value = new Decimal();
    oneffectchanged();
  }

  oneffectchanged(){
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

class LinearEffect extends Effect{
  recalculatevalue(amount){
    this.value = this.defaultval.add(this.increase.times(amount));
    this.oneffectchanged();
  }

  get description(){
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimal(this.value) + "(+" + formatDecimal(this.increase) + " per level)";
      case EffectTypes.PrestigeCurrencyBaseGain:
        return "Adds " + formatDecimal(this.value) + "(+" + formatDecimal(this.increase) + "per bought) to " + this.appliestotext + " gain on " + this.appliesto.displayname + ".";
      case EffectTypes.PrestigeCurrencyMultiplicativeGain:
        return "Multiplies " + this.appliestotext + " gain on " + this.appliesto.displayname + " by " + formatDecimal(this.value)+ "(+" + formatDecimal(this.increase) + "per bought).";
    }
    return "no effect description for this type";
  }

}

class LinkedLinearEffect extends Effect{
  constructor(objectsappliesto, linkedfunction, effectdefualtvalue, effectincrease, effecttype, appliestotext, effectdescription, args){
    super(objectsappliesto, effectdefualtvalue, effectincrease, effecttype, appliestotext, effectdescription, args);
    this.linkedfunction = linkedfunction;
    this.oldvalue = undefined;
  }
  onconstructfinish(){
    updaterequiredregistry.push(this);
  }

  getlinkednum(){
    return this.linkedfunction();
  }

  tick(){
    this.recalculatevalue();
  }

  recalculatevalue(){
    this.value = this.defaultval.add(this.increase.times(this.getlinkednum()));
    this.oneffectchanged();
  }
}

class ExponentialEffect extends Effect{
  recalculatevalue(amount){
    this.value = this.defaultval.times(Decimal.pow(this.increase, amount));
    if(this.oldvalue == undefined || this.oldvalue.notEquals(this.value))
    {
      this.oldvalue = this.value;
      this.oneffectchanged();
    }
  }

  get description(){
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimalOverride(this.value, 2) + "(x" + formatDecimalOverride(this.increase,2) + " per level)"
      case EffectTypes.PrestigeCurrencyBaseGain:
        return "Adds " + formatDecimal(this.value) + "(x" + formatDecimal(this.increase) + "per bought) to " + this.appliestotext + " gain on " + this.appliesto.displayname + ".";
      case EffectTypes.PrestigeCurrencyMultiplicativeGain:
        return "Multiplies " + this.appliestotext + " gain on " + this.appliesto.displayname + " by " + formatDecimal(this.value)+ "(x" + formatDecimal(this.increase) + "per bought).";
    }
    return "no effect description for this type";
  }
}

class StaticEffect extends Effect{

  constructor(objectsappliesto, effectvalue, effecttype, appliestotext, effectdescription, args){
    super(objectsappliesto, effectvalue, new Decimal(), effecttype, appliestotext, effectdescription, args);
  }

  get description(){
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimalOverride(this.value, 2);
      case EffectTypes.PriceScaling:
        return "Multiplies " + this.appliestotext + " cost scaling by x" + formatDecimalOverride(this.value, 2);
      case EffectTypes.PrestigeCurrencyBaseGain:
        return "Adds " + formatDecimal(this.value) + " to " + this.appliestotext + " gain on " + this.appliesto.displayname + ".";
      case EffectTypes.PrestigeCurrencyMultiplicativeGain:
        return "Multiplies " + this.appliestotext + " gain on " + this.appliesto.displayname + " by " + formatDecimal(this.value) + ".";
    }
    return "no effect description for this type";
  }

  recalculatevalue(amount){
    return;
  }
}

class FlavorEffect extends Effect{
  constructor(flavortext){
    super();
    this.flavortext = flavortext;
  }

  apply(){}
  remove(){}
  recalculatevalue(){}
  geteffect(){
    return this.flavortext;
  }
}

const EffectTypes = {
  ProducerBaseProduction : 1,
  ProducerMultiplierProduction : 2,
  PriceScaling : 3,
  PrestigeCurrencyBaseGain: 4,
  PrestigeCurrencyMultiplicativeGain: 5
}
