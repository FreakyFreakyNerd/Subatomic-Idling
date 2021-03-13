class Challenge{
  constructor(id, displayname, description, inchallengeeffects, rewards, maxdifficulty, startfunc, endfunc, basescorefunc, chalcoe, challengesynergies){
    this.id = id;
    this.displayname = displayname;
    this.description = description;
    this.difficultylevel = 1;
    this.maxdifficulty = maxdifficulty;
    this.score = new Decimal();
    this.basescorefunc = basescorefunc;
    this.active = false;
    this.chalcoe = chalcoe;
    this.index = player.challenges.length;
    this.challengesynergies = challengesynergies;
    if(Array.isArray(inchallengeeffects))
      this.inchaleffects = inchallengeeffects;
    else
      this.inchaleffects = [inchallengeeffects];
    if(Array.isArray(rewards))
      this.rewards = rewards;
    else
      this.rewards = [rewards];
    this.in = false;
    this.startfunc = startfunc;
    this.endfunc = endfunc;
    this.updateinchaleffects();
    this.updaterewards();
  }

  reset(){
    this.difficultylevel = 1;
    this.updateinchaleffects();
    this.updaterewards();
    this.removerewards();
  }

  save(){
      return [this.score, this.in, this.active, this.difficultylevel];
  }

  parse(data){
    if(data == undefined)
        return;
    if(data[0] != undefined)
        this.score = new Decimal(data[0]);
    if(data[1] != undefined)
        this.in = data[1];
    if(data[2] != undefined)
        this.active = data[2];
    if(data[3] != undefined)
        this.difficultylevel = parseInt(data[3]);
    this.updateinchaleffects();
    console.log(this.score);
    if(this.in){
      this.inchaleffects.forEach((eff, i) => {
        eff.apply();
      });
      updaterequiredregistry.push(this);
      runningchallenges.push(this);
    }
    if(this.score.greaterThan(0)){
      this.updaterewards();
      this.applyrewards();
    }
  }

  get activetext(){
    if(this.active)
      return "Active"
    return "Inactive"
  }

  getsynergyvalue(chalind){
    if(this.challengesynergies != undefined && this.challengesynergies.length > chalind){
      return this.challengesynergies[chalind];
    }
    return 1;
  }

  updateinchaleffects() {
    this.inchaleffects.forEach((chal, i) => {
      chal.recalculatevalue(this.difficultylevel);
    });
  }

  updaterewards() {
    this.rewards.forEach((reward, i) => {
      if(reward.recalculatevalue != undefined)
        reward.recalculatevalue(this.score);
    });
  }

  applyrewards(){
    this.rewards.forEach((reward, i) => {
      if(reward.apply != undefined){
        if(this.score.greaterThanOrEqualTo(this.rewards[i-1]))
          reward.apply();
      }
    });
  }

  removerewards(){
    this.rewards.forEach((reward, i) => {
      if(reward.remove != undefined)
        reward.remove();
    });
  }

  start(){
    if(this.startfunc != undefined)
      this.startfunc();
    this.inchaleffects.forEach((eff, i) => {
      eff.apply();
    });
    updaterequiredregistry.push(this);
    updateeffects();
    this.in = true;
    runningchallenges.push(this);
  }

  exit(){
    this.inchaleffects.forEach((eff, i) => {
      eff.remove();
    });
    var ind = updaterequiredregistry.indexOf(this);
    if(ind > -1)
      updaterequiredregistry.splice(ind, 1);
    var ind2 = runningchallenges.indexOf(this);
    if(ind2 > -1)
      runningchallenges.splice(ind2, 1);
    this.in = false;
    if(this.newscore.greaterThan(this.score))
      this.score = this.newscore;
    this.newscore = undefined;
    this.updaterewards();
    this.applyrewards();
    updateeffects();
    if(this.endfunc != undefined)
      this.endfunc();
  }

  get calculatescore(){
    var score = new Decimal(1);
    if(this.basescorefunc != undefined)
      score = this.basescorefunc();
    score = score.times(Decimal.pow(this.chalcoe, (this.difficultylevel-1)));
    var chalsyn = 1;
    runningchallenges.forEach((chal) => {
      if(chal != this){
        chalsyn *= this.getsynergyvalue(chal.index);
      }
    });
    score = score.times(Decimal.pow(chalsyn, (runningchallenges.length)));
    return score;
  }

  tick(){
    this.newscore = this.calculatescore;
  }

  applyeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.ChallengeScoreMult:
        break;
    }
  }

  removeeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.ChallengeScoreMult:
        break;
    }
  }

  get difficultyinformation(){
    return this.difficultylevel.toString() + "/" + this.maxdifficulty.toString();
  }

  increasedifficulty(){
    if(this.in)
      return;
    var buyamount = getbuyamount("challengedifficulty");
    this.difficultylevel += buyamount;
    if(this.difficultylevel > this.maxdifficulty || buyamount == -1)
      this.difficultylevel = this.maxdifficulty;
    this.updateinchaleffects();
  }

  decreasedifficulty(){
    if(this.in)
      return;
    var buyamount = getbuyamount("challengedifficulty");
    this.difficultylevel -= buyamount;
    if(this.difficultylevel < 1 || buyamount == -1)
      this.difficultylevel = 1;
    this.updateinchaleffects();
  }

  get effectsdescription(){
    var effects = "";
    for(var i = 1; i < this.rewards.length; i += 2){
      if(this.score.greaterThan(this.rewards[i-1])){
        effects += this.rewards[i].geteffect();
        if(i != this.rewards.length-1)
          effects += "\n";
      }else{
        effects += "Next Bonus Unlocked at " + formatDecimalNormal(this.rewards[i-1]);
        return effects;
      }
    }
    return effects;
  }
}
