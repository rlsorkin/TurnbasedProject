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
    }


    initialize(health, status) {
        this.health = health;
        this.status = status;
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
        return selected.value;
    }

    handleItem(itemAction) {
        var selected = this.availableItems[itemAction.toLowerCase()]
        if ((this.health + selected.value) >= 100) {
            this.health = 100
        } else {
            this.health = this.health + selected.value;
        }

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