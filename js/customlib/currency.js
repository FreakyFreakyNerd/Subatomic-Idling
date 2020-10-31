class Currency{
    constructor(id, displayname, singulardisplayname, startingamount){
        this.id = id;
        this.displayname = displayname;
        this.singulardisplayname = singulardisplayname;
        this.startingamount = new Decimal(startingamount)
        this.amount = new Decimal(startingamount);
        this.gained = new Decimal();
        currencyregistry.push(this);
        this.temp = {};
    }

    get iconpath(){
      return "images/currency/" + this.id + ".png";
    }

    get colorclass(){
      return "currency"+this.id+"display";
    }

    reset(){
      this.amount = new Decimal(this.startingamount)
      this.gained = new Decimal(0);
    }

    get saveData(){
        return this.save()
    }

    save(){
        return [this.amount.toString(),this.gained.toString()];
    }

    parse(data){
      if(data != undefined){
        if(data[0] != undefined)
            this.amount = Decimal.fromString(data[0]);
        if(data[1] != undefined)
          this.gained = Decimal.fromString(data[1]);
      }
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
        this.gained = this.gained.add(val);
    }

    has(amount){
        return this.amount.greaterThanOrEqualTo(amount);
    }

    hasrequirement(amount){
      return this.gained.greaterThanOrEqualTo(amount);
    }
}
