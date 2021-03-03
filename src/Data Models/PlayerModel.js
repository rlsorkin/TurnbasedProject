export default class PlayerModel {
    constructor() {
        this.name = ""
        this.class = ""
        this.health = ""
        this.status = ""
        this.level = ""
        this.str = ""
        this.agi = ""
        this.int = ""
        this.luck = ""
        this.availableActions = []
        this.availableItems = []
        this.maxHealth = ""
        this.baseOptions = []
    }

    //should the player model fetch its own actions or do I need to put it higher


    //Migrating all of these to their respective json objects
    // defaultOptions = [
    //     "Attack",
    //     "Items",
    //     "Special",
    //     "Run"
    // ]

    // defaultAttackOpts = {
    //     kick: { label: "Kick", value: 2, descript: "Kick for 2 dmg" },
    //     punch: { label: "Punch", value: 4, descript: "Punch for 4 dmg" },
    //     flail: { label: "Flail", value: 6, descript: "Flail for 6 dmg" },
    //     crash: { label: "Crash", value: 10, descript: "Crash for 10 dmg" }
    // }

    // defaultItemOpts = {
    //     pills: { label: "Pills", value: 2, descript: "Heal 2 dmg" },
    //     bottle: { label: "Bottle", value: 4, descript: "Heal 4 dmg" },
    //     coins: { label: "Coins", value: 6, descript: "Heal 6 dmg" },
    //     powder: { label: "Powder", value: 10, descript: "Heal 10 dmg" }
    // }

    initialize(actions, items) {
        this.availableActions = actions;
        this.availableItems = items;
        // this.baseOptions = this.defaultOptions;
    }

    setActions(availableActions){
        this.availableActions = availableActions
    }

    setItems(availableItems){
        this.availableItems = availableItems
    }

    //passSubOption will pass the label of the sub opt
    //how do I handle logging? let log take the whole object and parse it itself
    handleAttack(atkAction) {
        var selected = this.availableActions[atkAction.toLowerCase()];
        return selected;
    }

    handleItem(itemAction) {
        var selected = this.availableItems[itemAction.toLowerCase()]
        if ((this.health + selected.value) > 100) {
            this.health = 100
        } else {
            this.health = this.health + selected.value;
        }
        return selected;
    }

    handleSpecial() {

    }

    handleRun() {

    }

    takeDamage(value) {
        var newHealthValue = this.health - value;
        this.health = newHealthValue;
    }
}