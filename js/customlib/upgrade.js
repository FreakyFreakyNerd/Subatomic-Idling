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

    reset(){
      this.bought = new Decimal(0);
      this.produced = new Decimal(0);
      console.log("reseting")
      this.recalculatecosts();
      this.recalculateeffects();
      this.onrevoke();
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

      if(player.options.buyamounts[this.buykey].equals(-1)){
        var max = this.getmaxbuyable();
        this.onbuymax = true;
        if(max.lessThanOrEqualTo(0))
          return new Decimal(1);
        return max;
      }else{
        this.onbuymax = false;
      }

      return player.options.buyamounts[this.buykey];
    }

    get amount(){
      return this.produced.add(this.bought);
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
      return this.bought.equals(this.maxbuyable);
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
      return this[key] != undefined;
    }
}
