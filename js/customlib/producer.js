class Producer {
    constructor(id, displayname, buyingcurrency, productionobject, startingcost, costincrease, baseproduction){
        this.id = id;
        this.displayname = displayname
        this.startingcost = new Decimal(startingcost);
        this.costincrease = new Decimal(costincrease);
        this.baseproduction = new Decimal(baseproduction);
        this.bought = new Decimal(0);
        this.produced = new Decimal(0);
        this.buyingcurrency = buyingcurrency;
        this.productionobject = productionobject;
        producerregistry.push(this);
    }
    
    get saveData(){
        return this.save()
    }

    save(){
        return { produced : this.produced.toString(), bought : this.bought.toString()};
    }

    parse(data){
        if(data == undefined)
            return;
        if(data.bought != undefined)
            this.bought = Decimal.fromString(data.bought);
        if(data.produced != undefined)
            this.produced = Decimal.fromString(data.produced);
    }

    add(amount){
        this.produced = this.produced.add(amount);
    }

    buy() {
        if (this.buyingcurrency.has(this.cost)){
            this.buyingcurrency.removeamount(this.cost);
            this.bought = this.bought.add(1);
        }
    }

    produce(){
        this.productionobject.add(this.production);
    }

    calccost(){
        return this.startingcost * Decimal.pow(this.costincrease, this.bought)
    }

    calcproduction() {
        return this.amount.times(this.calcproductionper()).divide(settings.tickspersecond);
    }

    calcproductionper() {
        return this.baseproduction;
    }

    get amount(){
        return this.produced.add(this.bought);
    }

    get cost(){
        return this.calccost();
    }

    get oneProduction(){
        return this.calcproductionper();
    }

    get production(){
        return this.calcproduction();
    }

    get productionPerSec(){
        return this.calcproductionper().times(this.amount);
    }
}