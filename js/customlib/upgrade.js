class Upgrade{
    constructor(id, displayname, maxlevel, requirements, effects, costs){
        this.id = id;
        this.displayname = displayname;
        this.maxlevel = new Decimal(maxlevel);
        this.requirements = requirements;
        this.effects = effects;
        this.costs = costs;
        this.level = new Decimal(0);
        this.produced = new Decimal(0);
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
        this.recalculatecosts();
        this.recalculateeffects();
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

    recalculatecosts(){
      this.costs.forEach((cost, i) => {
        cost.recalculatecost(this.level);
      });
    }

    recalculateeffects(){
      this.effects.forEach((effect, i) => {
        effect.recalculatevalue(this.level);
      });
    }

    getcost(index){
      return this.costs[index].cost;
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
}
