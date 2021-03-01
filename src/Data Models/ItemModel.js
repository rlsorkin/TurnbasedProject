export default class ItemModel {
    constructor() {
        this.options = "";
        this.modifiers = "";
    }

    defaultItemOpts = {
        pills: { label: "Pills", value: 2, descript: "Heal 2 dmg" },
        bottle: { label: "Bottle", value: 4, descript: "Heal 4 dmg" },
        coins: { label: "Coins", value: 6, descript: "Heal 6 dmg" },
        powder: { label: "Powder", value: 10, descript: "Heal 10 dmg" }
    }

    getOptions(optType) {
        return this.defaultItemOpts;
    }


    updateOptions() {

    }

    flushOptions() {

    }

    attachModifiers(type, val) {

    }
}