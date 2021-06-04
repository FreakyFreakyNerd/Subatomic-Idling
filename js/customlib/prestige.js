class Prestige {
  constructor(id, displayname, onprestigefunction, onprestigecomplete, requirement, rewards) {
    this.id = id;
    this.displayname = displayname;
    this.onprestigefunction = onprestigefunction;
    this.onprestigecomplete = onprestigecomplete;
    this.requirement = requirement;
    if (Array.isArray(rewards))
      this.rewards = rewards;
    else
      this.rewards = [rewards];

    prestigeregistry.push(this);
    settings.defaultstats.times[this.id] = 0;
    settings.defaultstats.prestigeamounts[this.id] = 0;
    settings.defaultstats.past10prestiges[this.id] = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];
  }

  get unlocked() {
    return hasachievement(this.id + "unlock");
  }

  doprestige() {
    if (!this.requirement.hasrequirement)
      return;
    this.prestige();
  }

  async prestige(force) {
    this.producedamounts = [];
    this.rewards.forEach(reward => {
      this.producedamounts.push(reward.producedamount);
    });
    var apple = await this.onprestigefunction(this.requirement.hasrequirement, this.producedamounts, force);
    if (apple) {
      this.rewards.forEach(reward => {
        reward.apply();
      });
      this.onprestigecomplete();
    }
    forceeffectsupdate();
  }

  async forceprestige() {
    this.prestige(true);
  }

  applyeffect(effect) {
    this.rewards.forEach(reward => {
      reward.applyeffect(effect);
    });
  }

  removeeffect(effect) {
    this.rewards.forEach(reward => {
      reward.removeeffect(effect);
    });
  }

  effectchanged() {
    this.rewards.forEach(reward => {
      reward.effectchanged();
    });
  }

  addreward(reward){
    this.rewards.push(reward);
  }
  removereward(reward){
    var ind = this.rewards.indexOf(reward);
    if(ind > -1){
      this.rewards = this.rewards.splice(ind);
    }
  }
}

class PrestigeReward {
  constructor(produces, basedon, amountfunction) {
    this.produces = produces;
    this.amountfunction = amountfunction;
    this.basedon = basedon;
    this.effectadd = new Decimal(0);
    this.addeffects = [];
    this.effectmult = new Decimal(1);
    this.multeffects = [];
    this.effectexpo = new Decimal(1);
    this.expoeffects = [];
  }

  get iconpath() {
    return this.produces.iconpath;
  }

  get colorclass() {
    return this.produces.colorclass;
  }

  apply() {
    var amt = this.producedamount;
    this.produces.add(amt);
    return amt;
  }

  get producedamount() {
    if (this.baseamount.equals("0"))
      return new Decimal();
    return Decimal.floor(Decimal.pow(this.baseamount.add(this.effectadd).times(this.effectmult), this.effectexpo));
  }

  get baseamount() {
    return this.amountfunction(this.basedon.gained);
  }

  get gained(){
    return this.producedamount;
  }

  applyeffect(effect) {
    switch (effect.effecttype) {
      case EffectTypes.PrestigeBaseGain:
        if (!this.addeffects.includes(effect)) {
          this.addeffects.push(effect);
          this.recalculateaddeffect();
        }
        break;
      case EffectTypes.PrestigeMultiplicativeGain:
        if (!this.multeffects.includes(effect)) {
          this.multeffects.push(effect);
          this.recalculatemulteffect();
        }
        break;
      case EffectTypes.PrestigeExponentialGain:
        if (!this.expoeffects.includes(effect)) {
          this.expoeffects.push(effect);
          this.recalculateexpoeffect();
        }
        break;
    }
  }

  removeeffect(effect) {
    switch (effect.effecttype) {
      case EffectTypes.PrestigeBaseGain:
        if (this.addeffects.includes(effect)) {
          this.addeffects.splice(this.addeffects.indexOf(effect), 1);
          this.recalculateaddeffect();
        }
        break;
      case EffectTypes.PrestigeMultiplicativeGain:
        if (this.multeffects.includes(effect)) {
          this.multeffects.splice(this.multeffects.indexOf(effect), 1);
          this.recalculatemulteffect();
        }
        break;
      case EffectTypes.PrestigeExponentialGain:
        if (this.expoeffects.includes(effect)) {
          this.expoeffects.splice(this.expoeffects.indexOf(effect), 1);
          this.recalculateexpoeffect();
        }
        break;
    }
  }

  effectchanged() {
    this.recalculateaddeffect();
    this.recalculatemulteffect();
    this.recalculateexpoeffect();
  }

  recalculateaddeffect() {
    this.effectadd = new Decimal(0);
    this.addeffects.forEach((item, i) => {
      this.effectadd = this.effectadd.add(item.value);
    });
  }

  recalculatemulteffect() {
    this.effectmult = new Decimal(1);
    this.multeffects.forEach((item, i) => {
      this.effectmult = this.effectmult.times(item.value);
    });
  }

  recalculateexpoeffect() {
    this.effectexpo = new Decimal(1);
    this.expoeffects.forEach((item, i) => {
      this.effectexpo = this.effectexpo.times(item.value);
    });
  }
}
