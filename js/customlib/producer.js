class Producer {
  constructor(id, displayname, costs, productions, unlockrequirements, buykey, autobuyrequirements) {
    this.id = id;
    this.buykey = buykey;
    this.displayname = displayname;
    this.bought = new Decimal(0);
    this.produced = new Decimal(0);
    this.onbuymax = false;
    this.buyauto = false;
    this.autobuyunlocked = false;
    this.doproduce = true;

    if (Array.isArray(productions))
      this.productions = productions;
    else
      this.productions = [productions];

    if (Array.isArray(costs) || costs == undefined)
      this.costs = costs;
    else
      this.costs = [costs];

    if (Array.isArray(unlockrequirements) || unlockrequirements == undefined)
      this.unlockrequirements = unlockrequirements;
    else
      this.unlockrequirements = [unlockrequirements];

    if (Array.isArray(autobuyrequirements) || autobuyrequirements == undefined)
      this.autobuyrequirements = autobuyrequirements;
    else
      this.autobuyrequirements = [autobuyrequirements];

    producerregistry.push(this);
    updaterequiredregistry.push(this);
    this.limiteffect = undefined;
    this.limit = new Decimal(-1);
  }

  tick() {
    if (this.onbuymax) {
      this.recalculatecosts();
    }
    if (this.buyauto && !this.autobuylocked) {
      this.buy();
    }
    if (!this.autobuyunlocked) {
      if (this.checkforautounlock()) {
        this.autobuyunlocked = true;
      }
    }
  }

  get autostate() {
    if (!this.autobuyunlocked)
      return "LOK"
    if (!this.buyauto)
      return "OFF"
    return "ON"
  }

  get autobuystate() {
    return this.buyauto;
  }

  setautobuystate(state) {
    if (this.autobuyunlocked)
      this.buyauto = state;
  }

  togglebuystate() {
    if (this.autobuyunlocked)
      this.buyauto = !this.buyauto;
  }

  reset(hard) {
    this.bought = new Decimal(0);
    this.produced = new Decimal(0);
    if (hard) {
      this.buyauto = false;
      this.autobuyunlocked = false;
    }
    this.effectchanged();
  }

  checkForUnlock() {
    if (this.unlockrequirements == null || this.unlockrequirements == undefined)
      return true;
    var unlock = true;
    this.unlockrequirements.forEach(element => {
      if (!element.hasrequirement) {
        unlock = false;
        return false;
      }
    });
    return unlock;
  }

  checkforautounlock() {
    if (this.autobuyrequirements == undefined)
      return false;
    var unlock = true;
    this.autobuyrequirements.forEach(element => {
      if (!element.hasrequirement) {
        unlock = false;
        return false;
      }
    });
    return unlock;
  }

  get unlocked() {
    return this.checkForUnlock();
  }

  get saveData() {
    return this.save()
  }

  updateamountchanged() {
    this.onamountchange.forEach(element => {
      element(element);
    });
  }

  has(amount) {
    return this.bought.greaterThanOrEqualTo(amount);
  }

  hasrequirement(amount) {
    return this.bought.greaterThanOrEqualTo(amount);
  }

  save() {
    return [this.bought.toString(), this.produced.toString(), this.buyauto];
  }

  parse(data) {
    if (data == undefined)
      return;
    if (data[0] != undefined)
      this.bought = Decimal.fromString(data[0]);
    if (data[1] != undefined)
      this.produced = Decimal.fromString(data[1]);
    if (data[2] != undefined)
      this.buyauto = data[2];
    this.recalculatecosts();
    this.recalculateproductions();
  }

  add(amount) {
    this.produced = this.produced.add(amount);
    this.recalculateproductions();
  }

  buy() {
    if (!this.unlocked)
      return;
    if (this.canbuy) {
      this.bought = this.bought.add(this.buyamount);
      this.costs.forEach((cost, i) => {
        cost.subtractcost();
      });
      this.recalculatecosts();
      this.recalculateproductions();
    }
  }

  get canbuy() {
    if (this.limit.equals(0))
      return false;
    if (!this.limit.equals(-1) && this.bought.greaterThanOrEqualTo(this.limit))
      return false;
    var boolcan = true;
    this.costs.forEach((cost, i) => {
      if (!cost.hascost) {
        boolcan = false;
        return;
      }
    });
    return boolcan;
  }

  getmaxbuyable() {
    var maxamount = undefined;
    this.costs.forEach((cost, i) => {
      var cmax = cost.getmaxbuyable(this.bought);
      if (maxamount == undefined || maxamount.greaterThan(cmax)) {
        maxamount = cmax;
      }
    });
    if (!this.limit.equals(-1) && this.bought.add(maxamount).greaterThan(this.limit)) {
      if (this.limit.minus(this.bought).lessThan(0))
        maxamount = new Decimal();
      else
        maxamount = this.limit.minus(this.bought);
    }
    return maxamount;
  }

  produce(prodratio) {
    if(!this.doproduce)
      return;
    this.productions.forEach((prod, i) => {
      prod.produce(prodratio);
    });
  }

  getproduction(index) {
    return this.productions[index].production;//.divide(settings.tickspersecond);
  }

  getproductionper(index) {
    return this.productions[index].productionper;
  }

  get amount() {
    return this.produced.add(this.bought);
  }

  get buyamount() {
    if (!this.unlocked)
      return "Locked";
    if (player.options.buyamounts[this.buykey] == -1) {
      var max = this.getmaxbuyable();
      if (this.buyauto)
        max = Decimal.floor(max.divide(10));
      this.onbuymax = true;
      if (max.lessThanOrEqualTo(new Decimal(0)))
        return new Decimal(1);
      return max;
    } else {
      this.onbuymax = false;
    }

    return player.options.buyamounts[this.buykey];
  }

  recalculatecosts() {
    if (this.costs == undefined)
      return;
    this.costs.forEach((cost, i) => {
      cost.recalculatecost(this.bought, this.buyamount);
    });
  }

  recalculateproductions() {
    this.productions.forEach((prod, i) => {
      prod.recalculateproduction(this.amount);
    });
  }

  getcost(index) {
    return this.costs[index].cost;
  }

  getpersec(objectid) {
    var outval = new Decimal(0);
    this.productions.forEach((prod, i) => {
      if (prod.productionobject.id == objectid) {
        outval = prod.production;
        return;
      }
    });
    return outval;
  }

  get productionPerSec() {
    return this.calcproductionper().times(this.amount);
  }

  applyeffect(effect) {
    switch (effect.effecttype) {
      case EffectTypes.ProducerMultiplierProduction:
        this.applyproductioneffect(effect);
        break;
      case EffectTypes.ProducerBaseProduction:
        this.applyproductioneffect(effect);
        break;
      case EffectTypes.ProducerExponentialProduction:
        this.applyproductioneffect(effect);
        break;
      case EffectTypes.PriceScaling:
        this.applycosteffect(effect);
        break;
      case EffectTypes.ForceLimit:
        this.applylimit(effect);
        break;
      default:
        return;
    }
  }

  applyproductioneffect(effect) {
    this.productions.forEach((prod, i) => {
      prod.applyeffect(effect)
    });
    this.recalculateproductions();
  }

  applycosteffect(effect) {
    var objid = effect.getarg("costobjectid");
    this.costs.forEach((cost, i) => {
      if (objid == undefined || objid == cost.id) {
        cost.applyeffect(effect)
      }
    });
  }

  applylimit(effect) {
    if (this.limiteffect == undefined) {
      this.limiteffect = effect;
      this.limit = effect.value;
    } else {
      console.log("A limit is already defined for " + this.id);
    }
  }

  removeeffect(effect) {
    switch (effect.effecttype) {
      case EffectTypes.ProducerMultiplierProduction:
        this.removeproductioneffect(effect);
        break;
      case EffectTypes.ProducerBaseProduction:
        this.removeproductioneffect(effect);
        break;
      case EffectTypes.ProducerExponentialProduction:
        this.removeproductioneffect(effect);
        break;
      case EffectTypes.PriceScaling:
        this.removecosteffect(effect);
        break;
      case EffectTypes.ForceLimit:
        this.removelimit(effect);
        break;
      default:
        return;
    }
  }

  removeproductioneffect(effect) {
    var objid = effect.getarg("productionobjectid");
    this.productions.forEach((prod, i) => {
      if (objid == undefined || prod.id == objid) {
        prod.removeeffect(effect)
      }
    });
  }

  removecosteffect(effect) {
    var objid = effect.getarg("costobjectid");
    this.costs.forEach((cost, i) => {
      if (objid == undefined || cost.id == objid) {
        cost.removeeffect(effect)
      }
    });
  }

  removelimit(effect) {
    this.limit = new Decimal(-1);
    if (this.limiteffect == effect) {
      this.limiteffect = undefined;
    }
  }

  effectchanged() {
    if (effectneedsrecalculated.indexOf(this) == -1) {
      effectneedsrecalculated.push(this);
    }
  }

  updateeffects() {
    this.productions.forEach((item, i) => {
      item.recalculateeffectvalues();
    });
    if (this.costs != undefined)
      this.costs.forEach((item, i) => {
        item.recalculateeffectvalues();
      });
    this.recalculateproductions();
    this.recalculatecosts();
  }

  get amountdescription() {
    if (this.produced.equals(0))
      return formatDecimalNormal(this.bought);
    return formatDecimalNormal(this.bought) + "[+" + formatDecimalNormal(this.produced) + "]";
  }

  get costdescription() {
    if (this.costs == undefined)
      return "No Costs WOW!";
    var info = formatDecimalNormal(this.getcost(0)) + " " + this.costs[0].costobject.displayname;
    if (this.onbuymax && this.getmaxbuyable().greaterThan(0))
      info = info + ` +${formatDecimalNormal(this.getmaxbuyable())}`;
    return info;
  }

  get productiondescription() {
    if (this.productions == undefined)
      return "No Productions WOW!"
    return formatDecimalNormal(this.getproduction(0)) + " " + this.productions[0].productionobject.displayname + "/Second";
  }
}
