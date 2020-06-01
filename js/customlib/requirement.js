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
}
