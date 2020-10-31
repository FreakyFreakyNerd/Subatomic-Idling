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
      return formatDecimalNormal(this.amount) + " " + this.requiredobject.displayname;
    }

    get progresstext(){
        return formatDecimalNormal(this.requiredobject.gained) + "/" + this.requirementtext;
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
