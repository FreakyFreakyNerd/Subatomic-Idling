class LinearEffect{
  /*
  Valid Effect Types
  Producer : "base-production-increase"
  Producer : "production-multiplier"
  */
  constructor(objectsappliesto, effectincrease, effecttype, effectdefualtvalue, args){
    this.appliesto = objectsappliesto;
    this.args = args;
    this.effecttype = effecttype;
    this.increase = new Decimal(effectincrease);
    this.defaultval = new Decimal(effectdefualtvalue);
    this.value = new Decimal(effectdefualtvalue);
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
