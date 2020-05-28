class Currency{
    constructor(id, displayname, startingamount){
        this.id = id;
        this.displayname = displayname;
        this.amount = new Decimal(startingamount);
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
        this.amount = this.amount.substract(amount)
    }

    add(val){
        this.addamount(val)
    }

    addamount(val){
        this.amount = this.amount.add(val)
    }
}