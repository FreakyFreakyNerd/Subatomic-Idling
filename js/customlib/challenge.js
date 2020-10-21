class Challenge{
  constructor(id, displayname, description, inchallengeeffects, rewards, completionrequirements, maxcompletions, startfunc, endfunc){
    this.id = id;
    this.displayname = displayname;
    this.description = description;
    this.completed = 0;
    if(Array.isArray(inchallengeeffects))
      this.inchaleffects = inchallengeeffects;
    else
      this.inchaleffects = [inchallengeeffects];
    if(Array.isArray(rewards))
      this.rewards = rewards;
    else
      this.rewards = [rewards];
    if(Array.isArray(completionrequirements))
      this.completionrequirements = completionrequirements;
    else
      this.completionrequirements = [completionrequirements];
    this.maxcompletions = maxcompletions;
    this.in = false;
    this.startfunc = startfunc;
    this.endfunc = endfunc;
    this.updateinchaleffects();
    this.updaterewards();
  }

  reset(){
    this.completed = 0;
    this.updateinchaleffects();
    this.updaterewards();
  }

  save(){
      return [this.completed, this.in];
  }

  parse(data){
    if(data == undefined)
        return;
    if(data[0] != undefined)
        this.completed = parseInt(data[0]);
    if(data[1] != undefined)
        this.in = data[1];
    this.updateinchaleffects();
    this.updaterewards();
    if(this.in){
      this.inchaleffects.forEach((eff, i) => {
        eff.apply();
      });
      updaterequiredregistry.push(this);
    }
    if(this.completed > 0)
      this.applyrewards();
  }

  updateinchaleffects() {
    this.inchaleffects.forEach((chal, i) => {
      chal.recalculatevalue(this.completed);
    });
  }

  updaterewards() {
    this.rewards.forEach((reward, i) => {
      reward.recalculatevalue(this.completed);
    });
  }

  updaterequirements(){
    this.completionrequirements.forEach((req, i) => {
      req.recalculatevalue();
    });
  }

  applyrewards(){

  }

  hasrequirement(amount){
    return amount.lessThanOrEqualTo(this.completions);
  }

  start(){
    if(this.startfunc != undefined)
      this.startfunc();
    this.inchaleffects.forEach((eff, i) => {
      eff.apply();
    });
    updaterequiredregistry.push(this);
    this.in = true;
  }

  exit(){
    this.inchaleffects.forEach((eff, i) => {
      eff.remove();
    });
    var ind = updaterequiredregistry.indexOf(this);
    if(ind > -1)
      updaterequiredregistry.splice(ind, 1);
    this.in = false;
    if(this.endfunc != undefined)
      this.endfunc();
  }

  get iscomplete(){
    var can = true;
    this.completionrequirements.forEach((com, i) => {
      if(!com.hasrequirement)
        can = false;
    });
    return can;
  }

  tick(){
    if(this.iscomplete){
      if(this.completed = 0)
        this.applyrewards();
      this.completed += 1;
      if(this.completed >= this.maxcompletions){
        this.completed = this.maxcompletions;
        this.exit();
      }
      this.updateinchaleffects();
      this.updaterewards();
      if(!player.options.autochellengeretry){
        this.exit();
      }
    }
  }
}
