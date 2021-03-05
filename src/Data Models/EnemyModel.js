import EnemyClass from "../EnemyJSON/enemyClass.json"

export default class EnemyModel {
    constructor() {
        this.name = ""
        this.type = ""
        this.health = ""
        this.status = ""
        this.armor = ""
        this.armorType = ""
        this.baseImage = ""
        this.description = ""
        this.level = 1
        this.str = 1
        this.agi = 1
        this.int = 1
        this.luck = 1
        this.moveList = []
    }

    // defaultAttackOpts = {
    //     swipe: { label: "Swipe", value: 2, descript: "Swipe for 2 dmg" },
    // }

    //Ok, Im trying to initialize the model from inside the model?
    //Is this safer or just straight stupid

    initEnemy(enemyClass, enemyImg) {
        Object.assign(this, EnemyClass[enemyClass]);
        this.baseImage = enemyImg;
        // this.health = health;
        // this.status = status;
        // this.baseImage = baseImage;
        // this.description = description;
        // this.mainAttack = this.defaultAttackOpts.swipe;
        // this.name = name;
        // this.type = type;
    }

    calcDamageTaken(value) {
        if ((this.health - value) > 0) {
            this.health = this.health - value
        } else {
            this.health = 0
        }
    }

    calcDamageDealt() {
        var choice = Math.random() * (2 - 0) + 0;
        console.log(choice);
        if (choice >= 1) {
            choice = "punch"
        } else {
            choice = "kick"
        }
        console.log(choice);
        console.log(this.moveList[choice]);
        return this.moveList[choice]
    }

}