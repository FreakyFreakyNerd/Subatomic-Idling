class Producer {
    constructor(id, displayname, costs, productions, unlockrequirements){
        this.id = id;
        this.displayname = displayname
        this.costs = costs;
        this.productions = productions;
        this.bought = new Decimal(0);
        this.produced = new Decimal(0);
        this.unlockrequirements = unlockrequirements;
        producerregistry.push(this);
    }

    reset(){
      this.bought = new Decimal(0);
      this.produced = new Decimal(0);
      this.recalculatecosts();
      this.recalculateproductions();
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
            this.costs.forEach((cost, i) => {
              cost.subtractcost();
            });
            this.bought = this.bought.add(player.options.buyamount);
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
      return new Decimal(10000)
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

    recalculatecosts(){
      this.costs.forEach((cost, i) => {
        cost.recalculatecost(this.bought, player.options.buyamount);
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
      var objid = effect.getarg("productionobjectid");
      this.productions.forEach((prod, i) => {
        if(objid == undefined || objid == prod.id){
          prod.applyeffect(effect)
        }
      });
    }

    removeeffect(effect){
      var objid = effect.getarg("productionobjectid");
      this.productions.forEach((prod, i) => {
        if(objid == undefined || prod.id == objid){
          prod.removeeffect(effect)
        }
      });
    }

    effectchanged(){
      this.productions.forEach((item, i) => {
        item.recalculateeffectvalues();
      });
      this.recalculateproductions();
    }
}
