export default class PlayerModel {
    constructor() {
        this.name = ""
        this.health = ""
        this.status = ""
        this.level = 1
        this.str = 1
        this.agi = 1
        this.int = 1
        this.luck = 1
        this.availableActions = []
        this.availableItems = []
        this.maxHealth = 100
        this.baseOptions = []
    }

    defaultOptions = [
        "Attack",
        "Items",
        "Special",
        "Run"
    ]

    defaultAttackOpts = {
        kick: { label: "Kick", value: 2, descript: "Kick for 2 dmg" },
        punch: { label: "Punch", value: 4, descript: "Punch for 4 dmg" },
        flail: { label: "Flail", value: 6, descript: "Flail for 6 dmg" },
        crash: { label: "Crash", value: 10, descript: "Crash for 10 dmg" }
    }

    defaultItemOpts = {
        pills: { label: "Pills", value: 2, descript: "Heal 2 dmg" },
        bottle: { label: "Bottle", value: 4, descript: "Heal 4 dmg" },
        coins: { label: "Coins", value: 6, descript: "Heal 6 dmg" },
        powder: { label: "Powder", value: 10, descript: "Heal 10 dmg" }
    }

    initialize(health, status) {
        this.health = health;
        this.status = status;
        this.availableActions = this.defaultAttackOpts;
        this.availableItems = this.defaultItemOpts;
        this.baseOptions = this.defaultOptions;
    }

    setActions(availableActions){
        this.availableActions = availableActions
    }

    setItems(availableItems){
        this.availableItems = availableItems
    }

    //passSubOption will pass the label of the sub opt
    //how do I handle logging? 
    handleAttack(atkAction) {
        // console.log("Player Model handleAttack using: " + atkAction);
        var selected = this.availableActions[atkAction.toLowerCase()];
        // console.log("Player model is returning: " + selected + " and value: " + selected.value)
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
        // console.log("handlePlayerDamage( " + value + ")")
        var newHealthValue = this.health - value;
        this.health = newHealthValue;
    }
}