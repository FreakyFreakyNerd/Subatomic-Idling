function clamp(val1, val2){
  val1 = new Decimal(val1)
  if(val1.greaterThan(val2))
    return new Decimal(val2)

  else
    return val1
}
