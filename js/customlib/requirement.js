class NumRequirement{
    constructor(requiredobject , amount){
        this.requiredobject = requiredobject;
        this.amount = new Decimal(amount);
        this.requirementmulteffects = [];
        this.requirementmult = new Decimal(1);
    }

    hasRequirement(){
        return this.requiredobject.hasrequirement(this.finalamount);
    }

    get hasrequirement(){
        return this.hasRequirement();
    }

    get requirementtext(){
      return formatDecimalNormal(this.finalamount) + " " + this.requiredobject.displayname;
    }

    get progresstext(){
        return formatDecimalNormal(this.requiredobject.gained) + "/" + this.requirementtext;
    }

    get finalamount(){
        return this.amount.times(this.requirementmult);
    }

    recalculatemult(){
        this.requirementmult = new Decimal(1);
        this.requirementmulteffects.forEach(elem => {
            this.requirementmult = this.requirementmult.times(elem.value)
        });
    }

    applyeffect(effect){
        switch(effect.effecttype){
            case EffectTypes.RequirementMult:
                this.requirementmulteffects.push(effect);
                this.recalculatemult();
                break;
        }
    }

    removeeffect(effect){
        switch(effect.effecttype){
            case EffectTypes.RequirementMult:
                ind = this.requirementmulteffects.indexOf(effect);
                if(ind > -1){
                    this.requirementmulteffects = this.requirementmulteffects.splice(ind, 1);
                    this.recalculatemult();
                }
                break;
        }
    }

    effectchanged(){
        this.recalculatemult();
    }
}
class AchievementRequirement{
    constructor(requiredachievement){
        this.requiredachievement = requiredachievement;
    }

    hasRequirement(){
        return hasachievement(this.requiredachievement);
    }

    get hasrequirement(){
        return this.hasRequirement();
    }

    get requirementtext(){
      return "Achievement: " + this.requiredachievement;
    }
}

class ExponentialNumRequirement extends NumRequirement{
    constructor(requiredobject , baseamount, scaling){
        super(requiredobject, baseamount);
        this.baseamount = new Decimal(baseamount);
        this.scaling = new Decimal(scaling)
    }

    recalculatevalue(num){
        this.amount = this.baseamount.times(Decimal.pow(this.scaling, num))
    }
}