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
    }


    initialize(){

    }

    //takes an action label, fetches values from AttackModel
    //dispatches relevant values back to game layer
    //so do I instantiate an AttackModel here, or should I just parse the return 
    //obj here so theyre separate? does Game need to know attacks?
    handleAttack(atkAction) {
        var thisAtkAction = atkAction.toLowerCase();
        console.log("handleAttack( " + atkAction + ")")
        var thisAction = this.state.currentAttacks.getOptions();
        this.state.NPC.calcDamageTaken(thisAction[thisAtkAction].value);
        this.handleLog(thisAction[thisAtkAction].label + " for ", thisAction[thisAtkAction].value, " Damage")
        this.setState({
            playerTurn: !this.state.playerTurn,
            availableActions: []
        }, () => {
            if (this.state.NPC.health !== 0) {
                setTimeout(() => { this.newHandleNPCTurn() }, 1000);
            } else {
                this.setState({
                    endFight: true
                })
            }
        })
    }

    handleItem(itemAction) {
        console.log("handleItem()")
        var thisItemAction = itemAction.toLowerCase()
        var itemList = this.state.currentItems.getOptions();
        var newHealthValue = 0
        if ((this.state.player.health + itemList[thisItemAction].value) >= 100) {
            newHealthValue = 100
        } else {
            newHealthValue = this.state.player.health + itemList[thisItemAction].value;
        }
        this.handleLog(itemList[thisItemAction].label + " for ", itemList[thisItemAction].value, " health")
        this.setState({
            player: {
                ...this.state.NPC,
                health: newHealthValue
            },
            playerTurn: !this.state.playerTurn,
            availableActions: []
        }, () => {
            setTimeout(() => { this.newHandleNPCTurn() }, 1000);
        })
    }

    handleSpecial() {

    }

    handleRun() {

    }

}