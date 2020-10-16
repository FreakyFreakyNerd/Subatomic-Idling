class Upgrade{
    constructor(id, displayname, maxbuyable, requirements, effects, costs, buykey, extra){
        this.id = id;
        this.buykey = buykey;
        this.displayname = displayname;
        this.maxbuyable = new Decimal(maxbuyable);
        this.onbuymax = false;
        this.lastbuyamount = undefined;
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

        if(costs == undefined){
          this.costs = undefined;
          this.applied = false;
        }

        this.bought = new Decimal(0);
        this.produced = new Decimal(0);
        this.bonus = new Decimal(0);
        this.bonuseffects = [];

        if(extra != null && extra != undefined)
          for(let [key,value] of Object.entries(extra)){
            this[key] = value;
          }

        upgraderegistry.push(this);
        updaterequiredregistry.push(this);
    }

    tick(){
      if(this.onbuymax)
      {
        this.recalculatecosts();
      }
    }

    get extraamount(){
      return this.produced.add(this.bonus);
    }

    reset(){
      this.bought = new Decimal(0);
      this.produced = new Decimal(0);
      console.log("reseting")
      this.recalculatecosts();
      this.recalculateeffects();
      this.onrevoke();
    }

    save(){
        return [this.bought.toString(),this.produced.toString()];
    }

    parse(data){
        if(data == undefined)
            return;
        if(data[0] != undefined)
            this.bought = Decimal.fromString(data[0]);
        if(data[1] != undefined)
            this.produced = Decimal.fromString(data[1]);
        if(this.bought.greaterThan(0)){
          this.onunlock();
        }
        if(this.produced.greaterThan(0)){
          this.onunlock();
          this.applied = true;
        }
        this.recalculatecosts();
        this.recalculateeffects();
    }

    get boughtdescription(){
      if(!this.unlocked)
        return "Locked";
      if(this.ismaxbuyable)
        return "Upgrade Maxed";
      if(this.maxbuyable.equals(-1))
        return "Bought: " + formatDecimalNormal(this.amount);
      return "Bought: " + formatDecimalNormal(this.amount) + "/" + formatDecimalNormal(this.maxbuyable);
    }

    get effectsdescription(){
      var description = "";
      if(this.effects.length == 1)
        description += "Effect:\n";
      else
        description += "Effects:\n";
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
            if(this.bought.equals(0))
              this.onunlock();
            this.bought = this.bought.add(this.buyamount);
            this.costs.forEach((cost, i) => {
              cost.subtractcost();
            });
            this.recalculatecosts();
            this.recalculateeffects();
        }
    }

    get unlocked(){
        return this.checkForUnlock();
    }

    get canbuy(){
      if(this.bought.equals(this.maxbuyable) && this.maxbuyable != -1)
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

    getmaxbuyable(){
      var maxamount = undefined;
      this.costs.forEach((cost, i) => {
        var cmax = cost.getmaxbuyable(this.bought);
        if(maxamount == undefined || maxamount.greaterThan(cmax)){
          maxamount = cmax;
        }
      });
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
      if(player.options.buyamounts[this.buykey].equals(-1)){
        amount = this.getmaxbuyable();
        this.onbuymax = true;
        if(amount.lessThanOrEqualTo(0))
          amount = new Decimal(1);
      }else{
        this.onbuymax = false
        amount =  player.options.buyamounts[this.buykey];
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
      return this.extraamount.add(this.bought);
    }

    recalculatecosts(){
      if(this.costs == undefined || this.costs == null || this.costs.length == 0){
        return;
      }
      this.costs.forEach((cost, i) => {
        cost.recalculatecost(this.bought, this.buyamount);
      });
    }

    recalculateeffects(){
      if(this.effects == undefined || this.effects == null)
        return;
      this.effects.forEach((effect, i) => {
        effect.recalculatevalue(this.amount);
      });
    }

    getcost(index){
      return this.costs[index].cost;
    }

    get costdescription(){
      if(this.ismaxbuyable)
        return "Max Level"
      var description = "";
      if(this.costs.length == 1)
        description += "Cost:\n";
      else
        description += "Costs:\n";
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
        this.applied = true;
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
      return formatDecimalNormal(this.getcost(0)) + " " + this.costs[0].costobject.displayname;
    }

    get specialeffectdescription(){
      if(this.costs == undefined)
        return "No Effect";
      return this.effects[0].geteffect();
    }

    effectchanged(){
      this.effects.forEach((effect, i) => {
        effect.effectchanged();
      });
      this.recalculatebonus();
    }

    recalculatebonus(){
      this.bonus = new Decimal();
      this.bonuseffects.forEach((effect, i) => {
        this.bonus = this.bonus.add(effect.value);
      });
      this.recalculateeffects();
    }

    applyeffect(effect){
      switch (effect.effecttype) {
        case EffectTypes.UpgradeIncreaseMultiplier:
            this.effects.forEach((eff, i) => {
              eff.applyeffect(effect);
            });
          break;
        case EffectTypes.UpgradeBonusLevels:
          this.bonuseffects.push(effect);
          this.recalculatebonus();
          break;
        default:
          return;
      }
    }

    removeeffect(effect){
      switch (effect.effecttype) {
        case EffectTypes.UpgradeIncreaseMultiplier:
            this.effects.forEach((eff, i) => {
              eff.removeeffect(effect);
            });
          break;
        case EffectTypes.UpgradeBonusLevels:
          var ind = this.bonuseffects.indexOf(effect);
          if(ind > -1){
            this.bonuseffects.splice(this.bonuseffects.indexOf(effect), 1);
            this.recalculatebonus();
          }
          break;
        default:
          return;
      }
    }
}

class DiminishingUpgrade extends Upgrade{
  constructor(id, displayname, maxbuyable, requirements, effects, costs, buykey, diminishingstart, diminishingfunction, extra){
    super(id, displayname, maxbuyable, requirements, effects, costs, buykey, extra);
    this.dimstart = diminishingstart;
    this.dimfunction = diminishingfunction;
  }

  add(amount){
    if(!this.applied && amount != undefined && amount.greaterThan(0)){
      this.applied = true;
      this.onunlock();
    }
    this.produced = this.produced.add(amount);
    this.recalculateeffects();
    if(!this.diming && this.extraamount.add(this.bought).greaterThan(this.dimstart))
      this.diming = true;
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
          if(this.bought.equals(0))
            this.onunlock();
          this.bought = this.bought.add(this.buyamount);
          this.costs.forEach((cost, i) => {
            cost.subtractcost();
          });
          if(!this.diming && this.extraamount.add(this.bought).greaterThan(this.dimstart))
            this.diming = true;
          this.recalculatecosts();
          this.recalculateeffects();
      }
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
    this.bonus = new Decimal();
    this.bonuseffects.forEach((effect, i) => {
      this.bonus = this.bonus.add(effect.value);
    });
    if(!this.diming && this.extraamount.add(this.bought).greaterThan(this.dimstart))
      this.diming = true;
    this.recalculateeffects();
  }

  reset(){
    this.bought = new Decimal(0);
    this.produced = new Decimal(0);
    console.log("reseting")
    this.recalculatecosts();
    this.recalculateeffects();
    this.onrevoke();
    this.diming = false;
  }

  parse(data){
      if(data == undefined)
          return;
      if(data[0] != undefined)
          this.bought = Decimal.fromString(data[0]);
      if(data[1] != undefined)
          this.produced = Decimal.fromString(data[1]);
      if(this.bought.greaterThan(0)){
        this.onunlock();
      }
      if(this.produced.greaterThan(0)){
        this.onunlock();
        this.applied = true;
      }
      if(!this.diming && this.extraamount.add(this.bought).greaterThan(this.dimstart))
        this.diming = true;
      this.recalculatecosts();
      this.recalculateeffects();
  }
}
