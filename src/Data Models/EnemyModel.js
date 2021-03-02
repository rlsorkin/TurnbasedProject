export default class EnemyModel {
    constructor() {
        this.name = ""
        this.type = ""
        this.health = ""
        this.armor = ""
        this.armorType = ""
        this.status = ""
        this.baseImage = ""
        this.description = ""
        this.moveList = []
        this.baseDamage = 1
        this.mainAttack = ""
    }

    defaultAttackOpts = {
        swipe: { label: "Swipe", value: 2, descript: "Swipe for 2 dmg" },
    }


    initEnemy(health, status, baseImage, description, baseDamage, name, type){
        this.health = health;
        this.status = status;
        this.baseImage = baseImage;
        this.description = description;
        this.baseDamage = baseDamage;
        this.mainAttack = this.defaultAttackOpts.swipe;
        this.name = name;
        this.type = type;
    }

    calcDamageTaken(value){
        console.log("Enemy Model Damage take value: " + value);
        if((this.health - value) > 0){
            this.health = this.health - value
        } else {
            this.health = 0
        }
    }

    calcDamageDealt(){
        return this.mainAttack
    }

}