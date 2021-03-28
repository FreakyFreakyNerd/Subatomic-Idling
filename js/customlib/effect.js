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
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimal(this.value) + "(+" + formatDecimal(this.increase) + " per level)"
    }
    return
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
}

class LinkedLinearEffect extends Effect{
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
    this.value = this.defaultval.add(this.increase.times(this.getlinkednum()));
    this.oneffectchanged();
  }
}

class ExponentialEffect extends Effect{
  recalculatevalue(amount){
    this.value = this.defaultval.times(Decimal.pow(this.increase, amount));
    this.oneffectchanged();
  }
}

class StaticEffect extends Effect{

  constructor(objectsappliesto, effectvalue, effecttype, appliestotext, effectdescription, args){
    super(objectsappliesto, effectvalue, new Decimal(), effecttype, appliestotext, effectdescription, args);
  }

  geteffect(){
    if(this.effectdescription != undefined)
      return this.effectdescription(this);
    switch(this.effecttype){
      case EffectTypes.ProducerMultiplierProduction:
        return "Multiplies " + this.appliestotext + " production by x" + formatDecimal(this.value);
    }
    return
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
  geteffect(){
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
  UpgradeFinalMultiplier: 26,

  RequirementMult: 30,
  ChallengeScoreMult : 31
}
