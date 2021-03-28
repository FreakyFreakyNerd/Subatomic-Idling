class Upgrade{
    constructor(id, displayname, maxlevel, requirements, effects, costs, extra){
        this.id = id;
        this.displayname = displayname;
        this.maxlevel = new Decimal(maxlevel);
        if(requirements != null && requirements != undefined)
          if(Array.isArray(requirements))
            this.requirements = requirements;
          else
            this.requirements = [requirements]
        if(Array.isArray(effects))
          this.effects = effects;
        else
          this.effects = [effects];
        if(Array.isArray(costs))
          this.costs = costs;
        else
          this.costs = [costs];

        this.level = new Decimal(0);
        this.produced = new Decimal(0);

        console.log(extra);

        if(extra != null && extra != undefined)
          for(let [key,value] of Object.entries(extra)){
            this[key] = value;
          }

        upgraderegistry.push(this);
    }

    reset(){
      this.level = new Decimal(0);
      this.produced = new Decimal(0);
      this.recalculatecosts();
      this.recalculateeffects();
      this.onrevoke();
    }

    save(){
        return { produced : this.produced.toString(), level : this.level.toString()};
    }

    parse(data){
        if(data == undefined)
            return;
        if(data.level != undefined)
            this.level = Decimal.fromString(data.level);
        if(data.produced != undefined)
            this.produced = Decimal.fromString(data.produced);
        if(this.level.greaterThan(0)){
          this.onunlock();
        }
        this.recalculatecosts();
        this.recalculateeffects();
    }

    get leveldescription(){
      if(this.maxlevel.equals(-1))
        return formatDecimal(this.amount) + "/infinity-ish";
      var description = "";
      description += formatDecimal(this.amount) + "/" + formatDecimal(this.maxlevel);
      return description;
    }

    get effectsdescription(){
      var description = "";
      this.effects.forEach((effect, i) => {
          description += effect.geteffect()+"\n";
      });

      return description;
    }

    get saveData(){
        return this.save()
    }

    checkForUnlock(){
        if (this.requirements == null || this.requirements == undefined)
            return true;
        var unlock = true;
        this.requirements.forEach(element => {
            if(!element.hasrequirement){
                unlock = false;
                return false;
            }
        });
        return unlock;
    }

    buy() {
        if(!this.unlocked)
            return;
        if (this.canbuy){
            this.costs.forEach((cost, i) => {
              cost.subtractcost();
            });
            if(this.level.equals(0))
              this.onunlock();
            this.level = this.level.add(1)
            this.recalculatecosts();
            this.recalculateeffects();
        }
    }

    get unlocked(){
        return this.checkForUnlock();
    }

    get canbuy(){
      if(this.level.equals(this.maxlevel) && this.maxlevel != -1)
        return false;
      var boolcan = true;
      this.costs.forEach((cost, i) => {
        if(!cost.hascost){
          boolcan = false;
          return;
        }
      });
      return boolcan;
    }

    buymax(){
      if(!this.unlocked)
          return;
      var max = this.getmaxbuyable();
      if(!max.greaterThan(0))
        return;
      if(!this.applied)
        this.onunlock();
      this.costs?.forEach((cost, i) => {
        cost.recalculatecost(this.bought, max);
        cost.subtractcost();
      });
      this.bought = this.bought.add(max);
      this.recalculateeffects();
    }

    getmaxbuyable(){
      var maxamount = undefined;
      this.costs.forEach((cost, i) => {
        var cmax = cost.getmaxbuyable(this.bought);
        if(maxamount == undefined || maxamount.greaterThan(cmax)){
          maxamount = cmax;
        }
      });
      if(maxamount.greaterThan(this.maxbuyable) && this.maxbuyable.greaterThan(0))
        maxamount = this.maxbuyable;
      return maxamount;
    }

    get buyamount(){
      if(!this.unlocked)
        return "Locked";
      if(this.buykey == null || this.buykey == undefined)
        return 1;
      if(player.options.buyamounts[this.buykey] == undefined)
        return 1;

      var amount = new Decimal(0);
      if(player.options.buyamounts[this.buykey] == -1){
        amount = this.getmaxbuyable();
        this.onbuymax = true;
        if(this.buyauto)
          amount = Decimal.floor(amount.divide(10));
        if(amount.lessThanOrEqualTo(0))
          amount = new Decimal(1);
      }else{
        this.onbuymax = false
        amount =  new Decimal(player.options.buyamounts[this.buykey]);
      }
      if(this.maxbuyable == -1)
        return amount;
      if(this.bought.add(amount).greaterThan(this.maxbuyable))
        amount = this.maxbuyable.minus(this.bought);
      if(amount.lessThan(new Decimal(0)))
        amount = new Decimal(0);
      return amount;
    }

    get amount(){
      return this.produced.add(this.level);
    }

    recalculatecosts(){
      this.costs.forEach((cost, i) => {
        cost.recalculatecost(this.level);
      });
    }

    recalculateeffects(){
      this.effects.forEach((effect, i) => {
        effect.recalculatevalue(this.amount);
      });
    }

    getcost(index){
      return formatDecimal(this.costs[index].cost);
    }

    get costdescription(){
      if(this.ismaxlevel)
        return "Max Bought"
      var description = "";
      this.costs.forEach((cost, i) => {
        if(i < this.costs.length)
          description += cost.description + "\n";
        else
          description += cost.description;
      });

      return description;
    }

    onunlock(){
      this.effects.forEach((effect, i) => {
        effect.apply();
      });
    }

    onrevoke(){
      this.effects.forEach((effect, i) => {
        effect.remove();
      });
    }

    hasrequirement(amount){
        return this.bought.greaterThanOrEqualTo(amount);
    }

    get ismaxbuyable(){
      if(this.maxbuyable.lessThan(0))
        return false;
      return this.bought.greaterThanOrEqualTo(this.maxbuyable);
    }

    add(amount){
      if(!this.applied && amount != undefined && amount.greaterThan(0)){
        this.onunlock();
      }
      this.produced = this.produced.add(amount);
      this.recalculateeffects();
    }

    hastag(key){
      if(this.tags == undefined)
        return false;
      return this.tags.includes(key);
    }

    get amountdescription(){
      if(this.extraamount.equals(0))
        return  formatDecimalNormal(this.bought);
      return formatDecimalNormal(this.bought) + "[+" + formatDecimalNormal(this.extraamount) + "]";
    }

    get specialcostdescription(){
      if(this.costs == undefined)
        return "No Cost";
      if(this.ismaxbuyable)
        return "Max Level";
      var info = formatDecimalNormal(this.getcost(0)) + " " + this.costs[0].costobject.displayname;
      if(this.buyamount && this.onbuymax && this.getmaxbuyable().greaterThan(0) && (this.maxbuyable.greaterThan(1) || this.maxbuyable.equals(-1)))
        info = info + ` +${formatDecimalNormal(this.getmaxbuyable())}`
      return info;
    }

    get specialeffectdescription(){
      if(this.effects == undefined)
        return "No Effect";
      if(this.showall == undefined)
        return this.effects[0].geteffect();
      else{
        var str = "";
        this.effects.forEach(eff => {
          if(eff.effectdescription != undefined)
            str += ", " + eff.geteffect();
        });
        return str.substring(2);
      }
    }
    effectchanged(){
      if(effectneedsrecalculated.indexOf(this) == -1){
        effectneedsrecalculated.push(this);
      }
    }

    updateeffects(){
      if(this.effects != undefined)
        this.effects.forEach((effect, i) => {
          effect.effectchanged();
        });
      this.recalculatebonusmult();
      this.recalculatebonus();
      this.recalculateeffects();
      if((this.bought.greaterThan(0) || this.produced.greaterThan(0) || this.bonus.greaterThan(0)) && !this.applied)
        this.onunlock();
    }

    recalculatebonus(){
      this.bonus = new Decimal();
      this.bonuseffects.forEach((effect, i) => {
        this.bonus = this.bonus.add(effect.value);
      });
    }

    recalculatebonusmult(){
      this.bonusmult = new Decimal(1);
      this.bonusmulteffects.forEach((effect, i) => {
        this.bonusmult = this.bonusmult.times(effect.value);
      });
    }

    applyeffect(effect){
      if(effect.effecttype == EffectTypes.UpgradeIncreaseMultiplier || effect.effecttype == EffectTypes.UpgradeValuePower || effect.effecttype == EffectTypes.UpgradeValueMult || effect.effecttype == EffectTypes.UpgradeFinalMultiplier){
        this.effects.forEach((eff, i) => {
          eff.applyeffect(effect);
        });}
      switch (effect.effecttype) {
        case EffectTypes.UpgradeBonusLevels:
          if(!this.applied)
            this.onunlock();
          this.bonuseffects.push(effect);
          this.recalculatebonus();
          break;
        case EffectTypes.UpgradeBonusLevelMultiplier:
          this.bonusmulteffects.push(effect);
          this.recalculatebonusmult();
          break;
        default:
          return;
      }
      this.recalculateeffects();
    }

    removeeffect(effect){
      if(effect.effecttype == EffectTypes.UpgradeIncreaseMultiplier || effect.effecttype == EffectTypes.UpgradeValuePower || effect.effecttype == EffectTypes.UpgradeValueMult || effect.effecttype == EffectTypes.UpgradeFinalMultiplier){
        this.effects.forEach((eff, i) => {
          eff.removeeffect(effect);
        });}
      switch (effect.effecttype) {
        case EffectTypes.UpgradeBonusLevels:
          var ind = this.bonuseffects.indexOf(effect);
          if(ind > -1){
            this.bonuseffects.splice(this.bonuseffects.indexOf(effect), 1);
            this.recalculatebonus();
          }
          break;
        case EffectTypes.UpgradeBonusLevelMultiplier:
          ind = this.bonusmulteffects.indexOf(effect);
          if(ind > -1){
            this.bonusmulteffects.splice(this.bonusmulteffects.indexOf(effect), 1);
            this.recalculatebonusmult();
          }
          break;
        default:
          return;
      }
      this.recalculateeffects();
    }

    has(amount){
      return this.produced.greaterThanOrEqualTo(amount);
    }

    subtract(amount){
      this.produced = this.produced.minus(amount);
    }
}

class DiminishingUpgrade extends Upgrade{
  constructor(id, displayname, maxbuyable, requirements, effects, costs, buykey, diminishingstart, diminishingfunction, autobuyrequirements, extra){
    super(id, displayname, maxbuyable, requirements, effects, costs, buykey, autobuyrequirements, extra);
    this.dimstart = diminishingstart;
    this.dimfunction = diminishingfunction;
  }

  add(amount){
    if(!this.applied && amount != undefined && amount.greaterThan(0)){
      this.onunlock();
    }
    this.produced = this.produced.add(amount);
    this.checkdiming();
    this.recalculateeffects();
  }

  get amount(){
    var amt = this.extraamount.add(this.bought)
    if(!this.diming)
      return amt;
    else {
      return this.dimstart.add(this.dimfunction(amt.minus(this.dimstart)));
    }
  }

  buy() {
      if(!this.unlocked)
          return;
      if (this.canbuy){
          this.onunlock();
          this.bought = this.bought.add(this.buyamount);
          this.costs.forEach((cost, i) => {
            cost.subtractcost();
          });
          this.recalculatecosts();
          this.checkdiming();
          this.recalculateeffects();
      }
  }

  checkdiming(){
    if(!this.diming && this.extraamount.add(this.bought).greaterThan(this.dimstart))
      this.diming = true;
    if(this.diming && this.extraamount.add(this.bought).lessThan(this.dimstart))
      this.diming = false;
  }

  get amountdescription(){
    var out = formatDecimalNormal(this.bought);
    if(!this.extraamount.equals(0))
       out += "[+" + formatDecimalNormal(this.extraamount) + "]";
    if(this.diming)
      out += " \n[DR: " + formatDecimalNormal(this.amount) + "]";
    return out;
  }

  recalculatebonus(){
    super.recalculatebonus();
    if(!this.diming && this.extraamount.add(this.bought).greaterThan(this.dimstart))
      this.diming = true;
    this.recalculateeffects();
  }

  reset(){
    this.bought = new Decimal(0);
    this.produced = new Decimal(0);
    this.recalculatecosts();
    this.recalculateeffects();
    this.onrevoke();
    this.applied = false;
    this.diming = false;
  }

  parse(data){
    super.parse(data);
    this.checkdiming();
    this.recalculatecosts();
    this.recalculateeffects();
  }
}

class AppliableUpgrade extends Upgrade{
  constructor(id, displayname, maxbuyable, requirements, effects, costs, buykey, extra){
    super(id, displayname, maxbuyable, requirements, effects, costs, buykey, extra);
    this.appliedamount = new Decimal();
  }

  get maxappliable(){
    return this.bought;
  }

  get available(){
    return this.maxappliable.minus(this.appliedamount);
  }

  unapplyall(){
    this.appliedamount = new Decimal();
  }

  canapply(amount){
    if (amount == undefined)
      return this.appliedamount.lessThan(this.maxappliable);
    return this.appliedamount.add(amount).lessThan(this.maxappliable)
  }

  applyamount(amount){
    this.appliedamount = this.appliedamount.add(amount);
  }
  removeamount(amount){
    this.appliedamount = this.appliedamount.minus(amount);
  }

  save(){
    return [this.bought.toString(),this.produced.toString(), this.buyauto, this.appliedamount.toString()];
  } 

  parse(data){
    super.parse(data);
    if(data == undefined)
      return;
    if(data[3] != undefined)
        this.appliedamount = Decimal.fromString(data[3]);
  }
}

class AppliedToUpgrade extends Upgrade{
  constructor(id, displayname, effects, cost, usedappliableupgrade){
    super(id, displayname, -1, null, effects, cost, "special", null, );
    this.usedappliableupgrade = usedappliableupgrade;
    this.upgradecurrency = new Currency(id + "_xp", null, null, new Decimal());
    this.upgradeproducer = new Producer(id + "_prod", null, null, new LinearProduction(this.upgradecurrency, 1, 0));
    this.costs[0].costobject = this.upgradecurrency;
    this.appliedpoints = new Decimal();

    updaterequiredregistry.push(this);
  }


  save(){
    return [this.bought.toString(),this.produced.toString(), this.buyauto, this.appliedpoints.toString()];
  }

  parse(data){
    super.parse(data);
    if(data == undefined)
      return;
    if(data[3] != undefined)
        this.appliedpoints = Decimal.fromString(data[3]);
  }

  tick(){
    this.buy();
  }

  applyamount(type){
    var amount = getbuyamount("apply" + type);
    if(amount == "Max" || !this.usedappliableupgrade.canapply(amount))
      amount = this.usedappliableupgrade.available;
    amount = new Decimal(amount);
    if(amount.greaterThan(0)){
      this.appliedpoints = this.appliedpoints.add(amount);
      this.usedappliableupgrade.applyamount(amount);
      this.updateproducer();
    }
  }

    get ismaxlevel(){
      return this.level.equals(this.maxlevel);
    }

  unapplyall(){
    this.setamount(0);
  }

  setamount(amount){
    this.appliedpoints = new Decimal(amount);
    this.updateproducer();
  }

  updateproducer(){
    this.upgradeproducer.bought = this.appliedpoints;
    this.upgradeproducer.recalculateproductions();
  }

  get progress(){
    return formatDecimalNormal(this.upgradecurrency.amount) + "/" + formatDecimalNormal(this.getcost(0));
  }
}
