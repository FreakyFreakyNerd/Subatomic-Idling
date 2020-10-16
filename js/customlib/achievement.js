class Achievement{
  constructor(id, displayname, unlockrequirements, showdescriptionrequirements, effects, tags){
    this.id = id;
    this.tags = tags;
    this.displayname = displayname;
    this.requirements = unlockrequirements;
    this.showdescriptionrequirements = showdescriptionrequirements;
    this.effects = effects;
    this.unlocked = false;
    this.show = false;

    achievementregistry.push(this);
  }

  hastag(tag){
    if (this.tags == undefined || this.tags == null)
      return false;
    return this.tags.includes(tag);
  }

  parse(list){
    if(list.includes(this.id))
      this.unlocked = true;
    if(this.unlocked)
      this.onunlock();
    this.checkforshow();
  }

  check(){
    this.checkforshow();
    this.checkforunlock();
  }

  checkforunlock(){
    if(this.unlocked)
      return;
    if (this.requirements == null || this.requirements == undefined){
      this.unlocked = true;
      return;
    }
    var unlock = true;
    this.requirements.forEach(element => {
      if(!element.hasrequirement){
        unlock = false;
        return;
      }
    });
    this.unlocked = unlock;
    if(this.unlocked)
      this.onunlock();
  }

  checkforshow(){
    if (this.showdescriptionrequirements == null || this.showdescriptionrequirements == undefined){
      this.show = true;
      return;
    }
    var show = true;
    this.showdescriptionrequirements.forEach(element => {
      if(!element.hasrequirement){
        show = false;
        return;
      }
    });
    this.show = show;
  }

  onunlock(){
    if(this.effects != null && this.effects != undefined)
      this.effects.forEach((effect, i) => {
        effect.apply();
      console.log("Applied Effect: " + effect.geteffect());
      });
  }

  onrevoke(){
    if(this.effects != null && this.effects != undefined)
      this.effects.forEach((effect, i) => {
        effect.remove();
      });
  }

  recalculateeffects(){
    if(this.effects != null && this.effects != undefined)
      this.effects.forEach((effect, i) => {
        effect.recalculatevalue(this.amount);
      });
  }

  getdescription(){
    if (!this.show)
      return "Idk Get Farther! Maybe?";
    var description = "";
    if(this.requirements != null && this.requirements != undefined && !this.hastag("hiderequirements")){
      description += "Requirements\n";
      this.requirements.forEach((requirement, i) => {
        description += requirement.requirementtext;
        if(i < this.requirements.length)
          description += "\n"
      });
      if(this.effects != null && this.effects != undefined && !this.hastag("hideeffects"))
        description += "\n\n";
    }
    if(this.effects != null && this.effects != undefined && !this.hastag("hideeffects")){
      description += "Effects\n";
      this.effects.forEach((effect, i) => {
        description += effect.geteffect();
        if(i < this.effects.length)
          description += "\n"
      });
    }
    return description;

  }

  get description(){
    return this.getdescription();
  }

  get effect(){
    if(this.effects == undefined)
      return "Nothing! Absoluting Nothing"
    return this.effects[0].geteffect();
  }
  get requirement(){
    if(this.requirements == undefined)
      return "Nothing! Absoluting Nothing"
    return this.requirements[0].requirementtext;
  }

  reset(){
    this.unlocked = false;
    this.show = false;
  }
}
