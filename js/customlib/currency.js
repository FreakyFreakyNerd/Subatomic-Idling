class Currency{
    constructor(id, displayname, pluraldisplayname, startingamount){
        this.id = id;
        this.displayname = displayname;
        this.pluraldisplayname = pluraldisplayname;
        this.amount = new Decimal(startingamount);
        currencyregistry.push(this);
        this.temp = {};
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
}