class NumRequirement{
    constructor(requiredobject , amount){
        this.requiredobject = requiredobject;
        this.amount = new Decimal(amount);
    }

    hasRequirement(){
        return this.requiredobject.hasrequirement(this.amount);
    }

    get hasrequirement(){
        return this.hasRequirement();
    }

    get requirementtext(){
      return formatDecimal(this.amount) + "x " + this.requiredobject.displayname;
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
