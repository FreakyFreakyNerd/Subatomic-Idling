class Prestige{
  constructor(displayname, onprestigefunction, requirement, rewards){
    this.displayname = displayname;
    this.onprestigefunction = onprestigefunction;
    this.requirement = requirement;
    if(Array.isArray(rewards))
      this.rewards = rewards;
    else
      this.rewards = [rewards];

    prestigeregistry.push(this);
  }

  doprestige(){
    if(!this.requirement.hasrequirement)
      return;
    this.producedamounts = [];
    this.rewards.forEach(reward =>{
      this.producedamounts.push(reward.apply());
    });
    this.prestige();
  }

  prestige(){
    this.onprestigefunction(this.requirement.hasrequirement, this.producedamounts);
  }

  applyeffect(effect){
    this.rewards.forEach(reward => {
      reward.applyeffect(effect);
    });
  }

  removeeffect(effect){
    this.rewards.forEach(reward => {
      reward.removeeffect(effect);
    });
  }

  oneffectchange(){
    this.rewards.forEach(reward => {
      reward.oneffectchange();
    });
  }
}

class PrestigeReward{
  constructor(produces, basedon, amountfunction){
    this.produces = produces;
    this.amountfunction = amountfunction;
    this.basedon = basedon;
    this.effectadd = new Decimal(0);
    this.addeffects = [];
    this.effectmult = new Decimal(1);
    this.multeffects = [];
  }

  get iconpath(){
    return this.produces.iconpath;
  }

  get colorclass(){
    return this.produces.colorclass;
  }

  apply(){
    var amt = this.producedamount;
    this.produces.add(amt);
    return amt;
  }

  get producedamount(){
    if(this.baseamount.equals("0"))
      return new Decimal();
    return this.baseamount.add(this.effectadd).times(this.effectmult);
  }

  get baseamount(){
    return this.amountfunction(this.basedon.gained);
  }

  applyeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.PrestigeBaseGain:
        if(!this.addeffects.includes(effect)){
          this.addeffects.push(effect);
          this.recalculateaddeffect();
        }
        break;
      case EffectTypes.PrestigeMultiplicativeGain:
        if(!this.multeffects.includes(effect)){
          this.multeffects.push(effect);
          this.recalculatemulteffect();
        }
        break;
    }
  }

  removeeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.PrestigeBaseGain:
        if(this.addeffects.includes(effect)){
          this.addeffects.splice(this.addeffects.indexOf(effect));
          this.recalculateaddeffect();
        }
        break;
      case EffectTypes.PrestigeMultiplicativeGain:
        if(this.multeffects.includes(effect)){
          this.multeffects.splice(this.multeffects.indexOf(effect));
          this.recalculatemulteffect();
        }
        break;
    }
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
}
