class Prestige{
  constructor(producescurrency, consumescurrency, amountfunction, onprestigefunction){
    this.producescurrency = producescurrency;
    this.consumescurrency = consumescurrency;
    this.amountfunction = amountfunction;
    this.onprestigefunction = onprestigefunction;
  }

  doprestige(){
    this.producescurrency.add(this.producedcurrencyamount)
    this.onprestigefunction(this.producedcurrencyamount);
  }

  get producedcurrencyamount(){
    return this.amountfunction(this.consumescurrency.amount);
  }
}
