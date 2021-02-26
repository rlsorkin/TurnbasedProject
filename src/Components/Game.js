import React, { Component } from 'react';
import SelectBox from "./SelectBox.js";
import PlayerHealthBar from "./PlayerHealthBar.js";
import NPCArea from "./NPCArea";
import PlayerArea from "./PlayerArea";
import ActionLog from "./ActionLog";

import AttackModel from "../Data Models/AttackModel.js";

import HomerImg from "../Assets/homer-simpson-decals.jpg";
import BartImg from "../Assets/barts_butt.png";
import ItemModel from '../Data Models/ItemModel.js';


class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player: {
                status: "OK",
                health: 100
            },
            NPC: {
                status: "OK",
                health: 100
            },
            playerTurn: true,
            currentAction: "Attack",
            currentSubOption: "",
            actionLogData: [],
            actionDisplay: "",
            availableActions: [],
            currentAttacks: new AttackModel(),
            currentItems: new ItemModel(),
            baseOptions: [
                "Attack",
                "Items",
                "Special",
                "Run"
            ]
        }

        this.newHandlePlayerDamage = this.newHandlePlayerDamage.bind(this);
        this.newHandleAttack = this.newHandleAttack.bind(this);
        this.passSubOption = this.passSubOption.bind(this);
        this.baseOptionHandler = this.baseOptionHandler.bind(this);
        this.subOptionHandler = this.subOptionHandler.bind(this);
    }

    // ------------------------------------------------------------------------------------------------
    //change name of state value for AttackModel to AttackModel, same w other models


    //PASSBACK from sub option button click event, will receive sub label 
    passSubOption(subOpt) {
        console.log("returning sub option: " + subOpt);
        this.setState({
            currentSubOption: subOpt,
            actionDisplay: subOpt
        });
        var thisAction = this.state.currentAttacks.defaultAttackOpts[subOpt.toLowerCase()];
        console.log(thisAction)
        if (this.state.currentAction === "Attack") {
            this.handleAttack(thisAction)
        } else {
            console.log("Not an attack")
        }
    }

    //log should probably take a log object?
    handleLog(logItem, logVal, itemType) {
        var temp = this.state.actionLogData;
        if (temp.length >= 6) {
            temp.pop()
        }
        var tempMsg = logItem + " " + logVal + " " + itemType;
        temp.unshift(tempMsg)
        this.setState({
            actionLogData: temp
        })
    }


    //hooked up as selectbox prop passSelection
    //will receive base option label on click
    //will set current action state and available action list based on current action
    //why am I setting action list here? this should only set base option (maybe not? dont change yet)
    baseOptionHandler(selection) {
        console.log("baseOptionHandler( " + selection + " )");
        if (this.state.playerTurn) {
            if (!this.state.baseOptions.includes(selection)) {
                console.log("not included in baseOpts: " + selection)
            }
            switch (selection) {
                case 'Attack':
                    this.setState({
                        currentAction: "Attack",
                        availableActions: this.state.currentAttacks.getOptions(selection)
                    })
                    break;
                case 'Items':
                    this.setState({
                        currentAction: "Items",
                        availableActions: this.state.currentItems.getOptions(selection)
                    })
                    break;
                case 'Special':
                    this.setState({
                        currentAction: "Special",
                        // availableActions: this.state.currentItems.getOptions(selection)
                    })
                    break;
                case 'Run':
                    this.setState({
                        currentAction: "Run",
                        // availableActions: this.state.currentItems.getOptions(selection)
                    })
                    break;
                default:
                    console.log("couldnt find matching action for: " + this.state.currentAction)
                    return;
            }
        }
    }

    //plugged into selectbox prop passSubOption
    //will receive sub option label from click
    //checks current base option and sends sub option to appropriate handler
    subOptionHandler(subOpt) {
        console.log("subOptionHandler( " + subOpt + " )");
        this.setState({
            currentSubOption: subOpt,
            actionDisplay: subOpt
        })
        switch (this.state.currentAction) {
            case 'Attack':
                this.newHandleAttack(subOpt)
                break;
            case 'Items':
                this.handleItem(subOpt)
                break;
            case 'Special':

                break;
            case 'Run':

                break;
            default:
                console.log("couldnt find matching action for: " + this.state.currentAction)
                return;
        }
    }


    //handler will receive sub label from subopthandler
    newHandleAttack(atkAction) {
        var thisAtkAction = atkAction.toLowerCase();
        console.log("handleAttack( " + atkAction + ")")
        var thisAction = this.state.currentAttacks.getOptions();
        var newHealthValue = this.state.NPC.health - thisAction[thisAtkAction].value;
        this.handleLog(thisAction[thisAtkAction].label + " for ", thisAction[thisAtkAction].value, " Damage")
        this.setState({
            NPC: {
                ...this.state.NPC,
                health: newHealthValue
            },
            playerTurn: !this.state.playerTurn,
            availableActions: []
        }, () => {
            setTimeout(() => { this.newHandleNPCTurn() }, 1000);
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

    newHandleNPCTurn(npc) {
        console.log("handleNPCTurn( " + npc + ")")
        this.setState({
            actionDisplay: "Enemy Attack"
        });
        setTimeout(() => { this.newHandlePlayerDamage(null, 2) }, 1000);
    }

    newHandlePlayerDamage(type, value) {
        console.log("handlePlayerDamage( " + value + ")")
        var newHealthValue = this.state.player.health - value;
        this.handleLog("Took", value, " damage")
        this.setState({
            player: {
                ...this.state.NPC,
                health: newHealthValue
            },
            playerTurn: !this.state.playerTurn,
        }, () => {
            this.setState({
                actionDisplay: "Your Turn"
            })
        })
    }

    render() {
        return (
            <div style={{ display: "grid", margin: "50px" }}>
                <div style={{ height: "50vh" }}>
                    <NPCArea
                        npcImage={HomerImg}
                        health={this.state.NPC.health}
                        status={this.state.NPC.status}
                    />
                    <PlayerArea
                        playerImage={BartImg}
                        health={this.state.player.health}
                        status={this.state.player.status}
                    />
                </div>
                <div>
                    <p style={{ textAlign: "center", minHeight: "20px", marginTop: "60px" }}>{this.state.actionDisplay}</p>
                    <SelectBox
                        passSelection={this.baseOptionHandler}
                        availActions={this.state.availableActions}
                        playerTurn={this.state.playerTurn}
                        passSubOption={this.subOptionHandler}
                        baseOptions={this.state.baseOptions}
                    />
                    <ActionLog
                        logItems={this.state.actionLogData}
                    />
                </div>
            </div>

        );
    }
} export default Game;