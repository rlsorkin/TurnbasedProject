import React, { Component } from 'react';
import { Col, Row } from "react-bootstrap"
import SelectBox from "./SelectBox.js";
import PlayerHealthBar from "./PlayerHealthBar.js";
import NPCArea from "./NPCArea";
import PlayerArea from "./PlayerArea";
import ActionLog from "./ActionLog";
import PostFightBox from "./PostFightBox";
import MainMenu from "./MainMenu";

import HomerImg from "../Assets/homer-simpson-decals.jpg";
import BartImg from "../Assets/barts_butt.png";

import ItemModel from '../Data Models/ItemModel.js';
import EnemyModel from '../Data Models/EnemyModel.js';
import AttackModel from "../Data Models/AttackModel.js";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {

            player: {
                status: "OK",
                health: 100
            },

            showMenu: false,
            fightOver: false,
            NPC: new EnemyModel(),
            playerTurn: true,
            currentAction: "Attack",
            currentSubOption: "",
            actionLogData: ["Let Mortal Combat Commence"],
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
        this.loadNextScene = this.loadNextScene.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    // ------------------------------------------------------------------------------------------------
    //change name of state value for AttackModel to AttackModel, same w other models

    initialize() {
        this.state.NPC.initEnemy(100, "OK", HomerImg, "Look at him go!", 1);
        // this.setState({
        //     showMenu: true
        // })
    }

    componentDidMount() {
        this.initialize()
    }

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

    newHandleNPCTurn(npc) {
        console.log("handleNPCTurn( " + npc + ")")
        this.setState({
            actionDisplay: "Enemy Attack"
        });
        setTimeout(() => { this.newHandlePlayerDamage(null, 2) }, 1000);
    }

    newHandlePlayerDamage(type, value) {
        console.log("handlePlayerDamage( " + value + ")")
        var valueFromNPC = this.state.NPC.calcDamageDealt();
        var newHealthValue = this.state.player.health - valueFromNPC;
        this.handleLog("Took", valueFromNPC, " damage")
        this.setState({
            player: {
                ...this.state.player,
                health: newHealthValue
            },
            playerTurn: !this.state.playerTurn,
        }, () => {
            this.setState({
                actionDisplay: "Your Turn"
            })
        })
    }

    endFight() {
        if (!this.state.endFight) {
            return <NPCArea
                npcImage={HomerImg}
                health={this.state.NPC.health}
                status={this.state.NPC.status}
                descript={this.state.NPC.description}
                currentEnemy={this.state.NPC}
            />
        } else {
            return <PostFightBox
                loadNextScene={this.loadNextScene}
            />
        }
    }

    loadNextScene() {
        this.initialize()
        this.setState({
            endFight: false,
            playerTurn: true,
            actionLogData: [],
            player: {
                ...this.state.player,
                health: 100
            },
            actionDisplay: ""
        })
    }

    startGame() {
        this.setState({
            showMenu: false
        })
    }

    render() {

        // this.initialize();
        const enemyArea = this.endFight();

        return (


            //Trying out Row and Cols, cutting out styled divs

            <div style={{margin: "50px"}}>

                {/* <div style={{ height: "50vh" }}> */}
                {/* <NPCArea
                        npcImage={HomerImg}
                        health={this.state.NPC.health}
                        status={this.state.NPC.status}
                        descript={this.state.NPC.description}
                        currentEnemy={this.state.NPC}
                    /> */}


                <Row className="game-rows">
                    <Col className="game-cols">
                        {/* Stats panel is customized to enemy area, need to genericize */}
                        <PlayerArea
                            playerImage={BartImg}
                            health={this.state.player.health}
                            status={this.state.player.status}
                            currentEnemy = {this.state.player}
                        />
                    </Col>
                    <Col className="game-cols">
                        {enemyArea}
                    </Col>
                </Row>


                {/* </div> */}

                {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
                <Row className="action-display-row"> <p style={{ textAlign: "center", minHeight: "20px"}}>{this.state.actionDisplay}</p></Row>
                {/* <div style={{ display: "flex", flexDirection: "row-reverse", margin: "auto" }}> */}

                <Row className="select-row">
                    <Col className="select-col">
                        <SelectBox
                            passSelection={this.baseOptionHandler}
                            availActions={this.state.availableActions}
                            playerTurn={this.state.playerTurn}
                            passSubOption={this.subOptionHandler}
                            baseOptions={this.state.baseOptions}
                        />
                    </Col>
                    <Col className="select-col">
                        <ActionLog
                            logItems={this.state.actionLogData}
                        />
                    </Col>
                </Row>

                {/* </div>
                </div> */}

            </div>

        );
    }
} export default Game;