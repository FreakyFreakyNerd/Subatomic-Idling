class Producer {
    constructor(id, displayname, costs, productions, unlockrequirements, buykey){
        this.id = id;
        this.buykey = buykey;
        this.displayname = displayname
        this.costs = costs;
        this.productions = productions;
        this.bought = new Decimal(0);
        this.produced = new Decimal(0);
        this.unlockrequirements = unlockrequirements;
        this.onbuymax = false;
        producerregistry.push(this);
        updaterequiredregistry.push(this);
    }

    tick(){
      if(this.onbuymax)
      {
        this.recalculatecosts();
      }
    }

    reset(){
      console.log(this.productions)
      this.bought = new Decimal(0);
      this.produced = new Decimal(0);
      this.effectchanged();
      console.log(this.productions)
    }

    checkForUnlock(){
        if (this.unlockrequirements == null || this.unlockrequirements == undefined)
            return true;
        var unlock = true;
        this.unlockrequirements.forEach(element => {
            if(!element.hasrequirement){
                unlock = false;
                return false;
            }
        });
        return unlock;
    }

    get unlocked(){
        return this.checkForUnlock();
    }

    get saveData(){
        return this.save()
    }

    has(amount){
        return this.bought.greaterThanOrEqualTo(amount);
    }

    hasrequirement(amount){
        return this.bought.greaterThanOrEqualTo(amount);
    }

    save(){
        return { produced : this.produced.toString(), bought : this.bought.toString()};
    }

    parse(data){
        if(data == undefined)
            return;
        if(data.bought != undefined)
            this.bought = Decimal.fromString(data.bought);
        if(data.produced != undefined)
            this.produced = Decimal.fromString(data.produced);
        this.recalculatecosts();
        this.recalculateproductions();
    }

    add(amount){
        this.produced = this.produced.add(amount);
        this.recalculateproductions();
    }

    buy() {
        if(!this.unlocked)
            return;
        if (this.canbuy){
          this.bought = this.bought.add(this.buyamount);
          this.costs.forEach((cost, i) => {
            cost.subtractcost();
          });
          this.recalculatecosts();
          this.recalculateproductions();
        }
    }

    get canbuy(){
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

    produce(){
      this.productions.forEach((prod, i) => {
        prod.produce();
      });
    }

    getproduction(index) {
        return this.productions[index].production;//.divide(settings.tickspersecond);
    }

    getproductionper(index) {
        return this.productions[index].productionper;
    }

    get amount(){
        return this.produced.add(this.bought);
    }

    get buyamount(){
      if(!this.unlocked)
        return "Locked";
      if(player.options.buyamounts[this.buykey].equals(-1)){
        var max = this.getmaxbuyable();
        this.onbuymax = true;
        if(max.lessThanOrEqualTo(new Decimal(0)))
          return new Decimal(1);
        return max;
      }else{
        this.onbuymax = false;
      }

      return player.options.buyamounts[this.buykey];
    }

    recalculatecosts(){
      this.costs.forEach((cost, i) => {
        cost.recalculatecost(this.bought, this.buyamount);
      });
    }

    recalculateproductions(){
      this.productions.forEach((prod, i) => {
        prod.recalculateproduction(this.amount);
      });
    }

    getcost(index){
      return this.costs[index].cost;
    }

    getpersec(objectid){
      var outval = new Decimal(0);
      this.productions.forEach((prod, i) => {
        if(prod.productionobject.id == objectid){
          outval = prod.production;
          return;
        }
      });
      return outval;
    }

    get productionPerSec(){
        return this.calcproductionper().times(this.amount);
    }

    applyeffect(effect){
      switch (effect.effecttype) {
        case EffectTypes.ProducerMultiplierProduction:
            this.applyproductioneffect(effect);
          break;
        case EffectTypes.ProducerBaseProduction:
            this.applyproductioneffect(effect);
          break;
        case EffectTypes.PriceScaling:
            this.applycosteffect(effect);
          break;
        default:
          return;
      }
    }

    applyproductioneffect(effect){
      var objid = effect.getarg("productionobjectid");
      this.productions.forEach((prod, i) => {
        if(objid == undefined || objid == prod.id){
          prod.applyeffect(effect)
        }
      });
    }

    applycosteffect(effect){
      var objid = effect.getarg("costobjectid");
      this.costs.forEach((cost, i) => {
        if(objid == undefined || objid == cost.id){
          cost.applyeffect(effect)
        }
      });
    }

    removeeffect(effect){
      switch (effect.effecttype) {
        case EffectTypes.ProducerMultiplierProduction:
            this.removeproductioneffect(effect);
          break;
        case EffectTypes.ProducerBaseProduction:
            this.removeproductioneffect(effect);
          break;
        case EffectTypes.PriceScaling:
            this.removecosteffect(effect);
          break;
        default:
          return;
      }
    }

    removeproductioneffect(effect){
      console.log("Haha Yeh");
      var objid = effect.getarg("productionobjectid");
      this.productions.forEach((prod, i) => {
        if(objid == undefined || prod.id == objid){
          prod.removeeffect(effect)
        }
      });
    }

    removecosteffect(effect){
      var objid = effect.getarg("costobjectid");
      this.costs.forEach((cost, i) => {
        if(objid == undefined || cost.id == objid){
          cost.removeeffect(effect)
        }
      });
    }

    effectchanged(){
      this.productions.forEach((item, i) => {
        item.recalculateeffectvalues();
      });
      this.costs.forEach((item, i) => {
        item.recalculateeffectvalues();
      });
      this.recalculateproductions();
      this.recalculatecosts();
    }
}
