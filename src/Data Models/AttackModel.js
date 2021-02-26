export default class AttackModel {
    constructor() {
        this.options = "";
        this.modifiers = "";
    }

    defaultAttackOpts = {
        kick: { label: "Kick", value: 2 },
        punch: { label: "Punch", value: 4 },
        flail: { label: "Flail", value: 6 },
        crash: { label: "Crash", value: 50 }
    }

    advanceAttackOpts = [
        "Throw",
        "Crack",
        "Subdue",
        "Diminish"
    ]

    defaultItemOpts = {
        pills: { label: "Pills", value: 2, descript: "Heal 2 dmg" },
        bottle: { label: "Bottle", value: 4, descript: "Heal 4 dmg" },
        coins: { label: "Coins", value: 6, descript: "Heal 6 dmg" },
        powder: { label: "Powder", value: 10, descript: "Heal 10 dmg" }
    }

    getOptions(optType) {
        return this.defaultAttackOpts;
    }


    updateOptions() {

    }

    flushOptions() {

    }

    attachModifiers(type, val) {

    }
}