class Currency{
    constructor(id, displayname, singulardisplayname, startingamount){
        this.id = id;
        this.displayname = displayname;
        this.singulardisplayname = singulardisplayname;
        this.startingamount = new Decimal(startingamount)
        this.amount = new Decimal(startingamount);
        currencyregistry.push(this);
        this.temp = {};
    }

    reset(){
      this.amount = new Decimal(this.startingamount)
    }

    get saveData(){
        return this.save()
    }

    save(){
        return { amount : this.amount.toString()};
    }

    parse(data){
        if(data.amount != undefined)
            this.amount = Decimal.fromString(data.amount);
    }

    subtract(amount){
      this.removeamount(amount);
    }

    removeamount(amount){
        this.amount = this.amount.sub(amount)
    }

    add(val){
        this.addamount(val)
    }

    addamount(val){
        this.amount = this.amount.add(val)
    }

    has(amount){
        return this.amount.greaterThan(amount) || this.amount.equals(amount);
    }

    hasrequirement(amount){
      return this.has(amount);
    }
}
