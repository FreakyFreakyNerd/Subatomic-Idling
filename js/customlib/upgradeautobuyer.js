class UpgradeAutoBuyer {
    constructor(id, buyupgrades, unlockrequirements) {
        this.id = id;
        if (Array.isArray(buyupgrades))
            this.buyupgrades = buyupgrades;
        else
            this.buyupgrades = [buyupgrades];
        if (Array.isArray(unlockrequirements))
            this.unlockrequirements = unlockrequirements;
        else
            this.unlockrequirements = [unlockrequirements];
        this.unlocked = false;
        this.autobuyon = false;

        autobuyerregistry.push(this);
        updaterequiredregistry.push(this);
    }

    reset(){
        this.unlocked = false;
        this.autobuyon = false;
    }

    tick() {
        if (!this.unlocked) {
            this.checkforunlock();
            return;
        }
        if (this.autobuyon) {
            this.dobuy();
        }
    }

    checkforunlock() {
        var unl = true;
        this.unlockrequirements.forEach((elem) => {
            if (!elem.hasrequirement) {
                unl = false;
                return;
            }
        });
        if (unl)
            this.unlocked = true;
    }

    dobuy() {
        this.buyupgrades.forEach((elem) => {
            elem.buymax();
        });
    }

    get saveData() {
        return this.save()
    }

    save() {
        return [this.autobuyon];
    }

    parse(data) {
        if (data == undefined)
            return;
        if (data[0] != undefined)
            this.autobuyon = data[0];
    }

    get state() {
        if (!this.unlocked)
            return "Locked";
        if (this.autobuyon)
            return "On"
        return "Off"
    }

    toggle() {
        if(!this.unlocked)
            return;
        this.autobuyon = !this.autobuyon;
    }
}