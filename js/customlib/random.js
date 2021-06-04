class Random {
    constructor(seed, mult, incr, modulus) {
        if(seed != undefined)
            this.seed = seed;
        else
            this.seed = 0;
        if (mult != undefined)
            this.multiplier = mult;
        else
            this.multiplier = 1664525;
        if (incr != undefined)
            this.increment = incr;
        else
            this.increment = 1013904223;
        if(modulus != undefined)
            this.modulus = modulus;
        else
            this.modulus = Math.pow(2, 32);
    }

    next() {
        this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
        return this.seed / this.modulus;
    }
    nextFloat(min, max){
        if(min > max)
            return max;
        return this.next() * (max-min) + min;
    }

    nextInt(min, max){
        return Math.floor(this.next() * (max - min + 1) + min);
    }
}