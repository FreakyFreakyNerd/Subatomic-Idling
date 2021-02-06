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
    this.defaultincrease = new Decimal(effectincrease);
    this.increase = new Decimal(effectincrease);
    this.defaultval = new Decimal(effectdefualtvalue);
    this.basevalue = new Decimal(effectdefualtvalue);
    this.increasemultipliereffects =[];
    this.basevaluepow = new Decimal(1);
    this.poweffects = [];
    this.finalmultiplier = new Decimal(1);
    this.finalmulteffects = [];
    this.onconstructfinish();
    this.queuedamount = new Decimal();
    this.applied = false;
  }

  onconstructfinish(){}

  recalculateincrease(){
    this.increase = this.defaultincrease;
    this.increasemultipliereffects.forEach((effect, i) => {
      if(effect.basevalue)
        this.increase = this.increase.times(effect.basevalue);
    });
  }
  recalculatemultiplier(){
    this.finalmultiplier = new Decimal(1);
    this.finalmulteffects.forEach((effect, i) => {
      if(effect.basevalue)
        this.finalmultiplier = this.finalmultiplier.times(effect.basevalue);
    });
  }
  applyeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.UpgradeIncreaseMultiplier:
        this.increasemultipliereffects.push(effect);
        this.recalculateincrease();
        break;
      case EffectTypes.UpgradeValuePower:
        this.poweffects.push(effect);
        this.recalculatepow();
      break
      case EffectTypes.UpgradeValueMult:
        this.finalmulteffects.push(effect);
        this.recalculatemultiplier();
      break;
    }
  }
  removeeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.UpgradeIncreaseMultiplier:
        var ind = this.increasemultipliereffects.indexOf(effect);
        if(ind > -1){
          this.increasemultipliereffects.splice(ind, 1);
          this.recalculateincrease();
        }
        break;
      case EffectTypes.UpgradeValuePower:
        var ind2 = this.poweffects.indexOf(effect);
        if(ind2 > -1){
          this.poweffects.splice(ind2, 1);
          this.recalculatepow();
        }
        break;
      case EffectTypes.UpgradeValueMult:
        var ind = this.finalmulteffects.indexOf(effect);
        if(ind > -1){
          this.finalmulteffects.splice(ind2, 1);
          this.recalculatemultiplier();
        }
        break;
    }
  }

  recalculatepow(){
    this.basevaluepow = new Decimal(1);
    this.poweffects.forEach(effect => {
      this.basevaluepow = this.basevaluepow.times(effect.value);
    })
  }

  effectchanged(){
    this.recalculateincrease();
    this.recalculatemultiplier();
    this.recalculatepow();
    this.recalculatevalue(this.queuedamount);
  }

  geteffect(){
    if(this.effectdescription != undefined)
      return this.effectdescription(this);
    else {
      return this.description;
    }
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
    this.basevalue = new Decimal();
    oneffectchanged();
  }

  oneffectchanged(){
    if(!this.applied)
      return;
    this.appliesto.forEach((item, i) => {
      item.effectchanged();
    });
  }

  apply(){
    this.applied = true;
    this.appliesto.forEach((obj, i) => {
      obj.applyeffect(this);
    });
  }

  remove(){
    this.applied = false;
    this.appliesto.forEach((obj, i) => {
      obj.removeeffect(this);
    });
  }

  get value(){
    return Decimal.pow((this.basevalue.minus(this.defaultval)).times(this.finalmultiplier).add(this.defaultval), this.basevaluepow);
  }
}

class LinearEffect extends Effect{
  recalculatevalue(amount){
    this.queuedamount = amount;
    this.basevalue = this.defaultval.add(this.increase.times(amount));
    this.oneffectchanged();
  }

  get description(){
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimal(this.basevalue) + "(+" + formatDecimal(this.increase) + " per level)";
      case EffectTypes.PrestigeCurrencyBaseGain:
        return "Adds " + formatDecimal(this.basevalue) + "(+" + formatDecimal(this.increase) + "per bought) to " + this.appliestotext + " gain on " + this.appliesto[0].displayname + ".";
      case EffectTypes.PrestigeCurrencyMultiplicativeGain:
        return "Multiplies " + this.appliestotext + " gain on " + this.appliesto[0].displayname + " by " + formatDecimal(this.basevalue)+ "(+" + formatDecimal(this.increase) + "per bought).";
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
    this.basevalue = this.defaultval.add(this.increase.times(this.getlinkednum()));
    this.oneffectchanged();
  }
}

class ExponentialEffect extends Effect{

  recalculateincrease(){
    this.increase = this.defaultincrease.minus(1);
    this.increasemultipliereffects.forEach((effect, i) => {
      if(effect.basevalue)
        this.increase = this.increase.times(effect.basevalue);
    });
    this.increase = this.increase.add(1);
  }

  recalculatevalue(amount){
    this.basevalue = this.defaultval.times(Decimal.pow(this.increase, amount));
    if(this.queuedamount == undefined || this.queuedamount.notEquals(this.basevalue))
    {
      this.queuedamount = this.basevalue;
      this.oneffectchanged();
    }
  }

  get description(){
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimalOverride(this.basevalue, 2) + "(x" + formatDecimalOverride(this.increase,2) + " per level)"
      case EffectTypes.PrestigeCurrencyBaseGain:
        return "Adds " + formatDecimal(this.basevalue) + "(x" + formatDecimal(this.increase) + "per bought) to " + this.appliestotext + " gain on " + this.appliesto[0].displayname + ".";
      case EffectTypes.PrestigeCurrencyMultiplicativeGain:
        return "Multiplies " + this.appliestotext + " gain on " + this.appliesto[0].displayname + " by " + formatDecimal(this.basevalue)+ "(x" + formatDecimal(this.increase) + "per bought).";
    }
    return "no effect description for this type";
  }
}

class LinkedExponentialEffect extends Effect{
  constructor(objectsappliesto, linkedfunction, effectdefualtvalue, effectincrease, effecttype, appliestotext, effectdescription, args){
    super(objectsappliesto, effectdefualtvalue, effectincrease, effecttype, appliestotext, effectdescription, args);
    this.linkedfunction = linkedfunction;
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
    this.basevalue = this.defaultval.times(Decimal.pow(this.increase, this.getlinkednum()));
    this.oneffectchanged();
  }
}

class StaticEffect extends Effect{

  constructor(objectsappliesto, effectvalue, effecttype, appliestotext, effectdescription, args){
    super(objectsappliesto, effectvalue, new Decimal(), effecttype, appliestotext, effectdescription, args);
  }

  get description(){
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimalOverride(this.basevalue, 2);
      case EffectTypes.PriceScaling:
        return "Multiplies " + this.appliestotext + " cost scaling by x" + formatDecimalOverride(this.basevalue, 2);
      case EffectTypes.PrestigeCurrencyBaseGain:
        console.log(this.appliesto);
        return "Adds " + formatDecimal(this.basevalue) + " to " + this.appliestotext + " gain on " + this.appliesto[0].displayname + ".";
      case EffectTypes.PrestigeCurrencyMultiplicativeGain:
        return "Multiplies " + this.appliestotext + " gain on " + this.appliesto[0].displayname + " by " + formatDecimal(this.basevalue) + ".";
    }
    return "no effect description for this type";
  }

  recalculatevalue(amount){
    return;
  }
}

class FunctionEffect extends Effect{
  constructor(objectsappliesto, effecttype, effectvaluefunction, effectdescriptionfunction){
    super(objectsappliesto,new Decimal(),new Decimal(),effecttype,null,null,null);
    if(Array.isArray(objectsappliesto))
      this.appliesto = objectsappliesto;
    else
      this.appliesto = [objectsappliesto];
    this.effectvaluefunction = effectvaluefunction;
    this.effectdescription = effectdescriptionfunction;
    this.amount = new Decimal();
    this.basevalue = new Decimal(1);
    this.delay = 10;

    updaterequiredregistry.push(this);
  }

  tick(){
    this.delay--;
    if(this.delay <= 0){
      this.recalculatevalue(this.amount);
      this.delay = 10;
    }
  }

  recalculatevalue(amount){
    this.amount = amount;
    if(this.effectvaluefunction != undefined)
      this.basevalue = this.effectvaluefunction(amount);
    else
      this.basevalue = new Decimal(1);
    this.oneffectchanged();
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
  get description(){
    return this.flavortext;
  }
}

const EffectTypes = {
  ProducerBaseProduction : 1,
  ProducerMultiplierProduction : 2,
  ProducerExponentialProduction: 3,
  PriceScaling : 9,

  PrestigeBaseGain: 10,
  PrestigeMultiplicativeGain: 11,
  PrestigeExponentialGain: 12,

  UpgradeBonusLevelMultiplier: 20,
  UpgradeIncreaseMultiplier: 21,
  UpgradeBonusLevels: 22,
  ForceLimit: 23,
  UpgradeValuePower : 24,
  UpgradeValueMult: 25,

  RequirementMult: 30
}
