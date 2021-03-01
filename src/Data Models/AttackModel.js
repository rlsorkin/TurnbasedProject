export default class AttackModel {
    constructor() {
        this.options = "";
        this.modifiers = "";
    }

    defaultAttackOpts = {
        kick: { label: "Kick", value: 2, descript: "Kick for 2 dmg" },
        punch: { label: "Punch", value: 4, descript: "Punch for 4 dmg" },
        flail: { label: "Flail", value: 6, descript: "Flail for 6 dmg" },
        crash: { label: "Crash", value: 10, descript: "Crash for 10 dmg" }
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