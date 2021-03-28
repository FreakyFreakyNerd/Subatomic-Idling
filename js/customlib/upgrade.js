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
        return this.level.greaterThanOrEqualTo(amount);
    }

    get ismaxlevel(){
      return this.level.equals(this.maxlevel);
    }
}
