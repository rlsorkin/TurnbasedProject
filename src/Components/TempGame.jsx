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

import EnemyModel from '../Data Models/EnemyModel.js';
import PlayerModel from "../Data Models/PlayerModel.js";

import CharacterClass from "../PlayerJSON/characterClass.json";
import PlayerMoves from "../PlayerJSON/playerMoves.json";
import PlayerItems from "../PlayerJSON/playerItems.json";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {

            player: new PlayerModel(),
            showMenu: false,
            fightOver: false,
            NPC: new EnemyModel(),
            playerTurn: true,
            currentAction: "Attack",
            currentSubOption: "",
            actionLogData: ["Let Mortal Combat Commence"],
            actionDisplay: "",
            currentAttacks: [],
            currentItems: [],
            baseActions: [],
            moveBank: PlayerMoves
        }

        this.baseOptionHandler = this.baseOptionHandler.bind(this);
        this.subOptionHandler = this.subOptionHandler.bind(this);
        this.loadNextScene = this.loadNextScene.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleNPCTurn = this.handleNPCTurn.bind(this);
    }

    // ------------------------------------------------------------------------------------------------
    // List of props this component receives from MenuLayer:
    // switchView={this.switchView} toggle showing game or menu component
    // selectedChar = {this.state.selectedChar} passes down character string from select menu


    initialize() {
        console.log("Initializing");
        console.log("Loading moves from: " + PlayerMoves)
        // old initializer, initializing inside object now
        // this.state.NPC.initEnemy(100, "OK", HomerImg, "Look at him go!", 10, "Homie", "Big Boy");
        this.state.NPC.initEnemy("brute", HomerImg)
        if (this.props.shouldInit) {
            Object.assign(this.props.player, CharacterClass[this.props.selectedChar])
            this.props.player.initialize(PlayerMoves[this.props.player.class]["defaultAttackOpts"], PlayerItems[this.props.player.class]["defaultItemOpts"])
        } else {
            this.props.player.health = this.props.player.maxHealth
        }
        if (this.props.player.availableActions) {
            this.setState({
                baseActions: this.props.player.baseOptions,
                currentAttacks: this.props.player.availableActions,
                currentItems: this.props.player.availableItems
            })
        }
    }

    componentDidMount() {
        this.initialize()
    }

    //Base Option Handler receives label from selectbox and chooses correct player handler
    baseOptionHandler(selection) {
        if (!this.props.player.baseOptions) {
            console.log("Base options weren't found in baseOptionHandler")
            return
        }
        if (this.state.playerTurn) {
            if (!this.state.baseActions.includes(selection)) {
                console.log("not included in baseOpts: " + selection)
            }
            switch (selection) {
                case this.props.player.baseOptions[0]:
                    this.setState({
                        currentAction: this.props.player.baseOptions[0],
                        currentAttacks: this.props.player.availableActions,
                        actionDisplay: "Attacking"
                    })
                    break;
                case this.props.player.baseOptions[1]:
                    this.setState({
                        currentAction: this.props.player.baseOptions[1],
                        currentItems: this.props.player.availableItems,
                        actionDisplay: "Using item"
                    })
                    break;
                case this.props.player.baseOptions[2]:
                    this.setState({
                        currentAction: this.props.player.baseOptions[2],
                        // availableActions: this.state.currentItems.getOptions(selection)
                    })
                    break;
                case this.props.player.baseOptions[3]:
                    this.setState({
                        currentAction: this.props.player.baseOptions[3],
                        // availableActions: this.state.currentItems.getOptions(selection)
                    })
                    break;
                default:
                    console.log("couldnt find matching action for: " + this.state.currentAction)
                    return;
            }
        }
    }

    //Player now has received attack options from AttackModel, sends those options to selectbox
    //selectbox now populates its sub options buttons
    //sub option btn dispatches label to sub opt handler
    subOptionHandler(subOpt) {
        this.setState({
            currentSubOption: subOpt,
            actionDisplay: subOpt
        })
        setTimeout(() => {
            switch (this.state.currentAction) {
                case this.props.player.baseOptions[0]:
                    var dmgVal = this.props.player.handleAttack(subOpt);

                    this.handleNPCTurn(dmgVal);
                    this.handleLog(dmgVal);
                    setTimeout(() => {
                        this.setState({
                            actionDisplay: "Your turn",
                            playerTurn: true,
                            availableActions: [],
                            currentAction: "",
                            currentAttacks: [],
                            currentItems: []
                        })
                    }, 1500)
                    break;
                case this.props.player.baseOptions[1]:
                    var tempItem = this.props.player.handleItem(subOpt);
                    this.handleLog(tempItem);
                    this.handleNPCTurn()
                    this.setState({
                        actionDisplay: "Your turn",
                        playerTurn: true,
                        availableItems: [],
                        currentAction: "",
                        currentAttacks: [],
                        currentItems: []
                    })
                    break;
                case this.props.player.baseOptions[2]:
                    break;
                case this.props.player.baseOptions[3]:
                    break;
                default:
                    console.log("couldnt find matching action for: " + subOpt)
                    return;
            }
        }, 1000);
    }

    handleNPCTurn(dmgValue) {
        this.setState({
            playerTurn: false,
            availableActions: [],
            actionDisplay: "Enemy Turn",
            currentAction: ""
        })
        if (dmgValue) {
            this.state.NPC.calcDamageTaken(dmgValue.value);
        }
        if (this.state.NPC.health <= 0) {
            this.setState({
                endFight: true
            })
        } else {
            setTimeout(() => {
                this.setState({
                    //hard coding enemys action display, need to fetch dynamically once enemy has more moves
                    actionDisplay: this.state.NPC.moveList["kick"].label
                })
                //Remember the order, always log after the damage, so it seems in sync
                var temp = this.state.NPC.calcDamageDealt()
                this.props.player.takeDamage(temp.value);
                this.handleLog(temp);
            }, 1000)

        }
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
            actionLogData: ["Battle on!"],
            actionDisplay: "",
            currentAction: "",
            currentAttacks: "",
            currentItems: "",
        })
    }

    startGame() {
        console.log("Game Starting");
        this.setState({
            showMenu: false
        })
    }

    //log should probably take a log object?
    handleLog(action) {
        var temp = this.state.actionLogData;
        if (temp.length >= 6) {
            temp.pop()
        }
        var tempMsg = action.descript;
        temp.unshift(tempMsg)
        this.setState({
            actionLogData: temp
        })
    }

    render() {
        const enemyArea = this.endFight();
        return (
            <div style={{ margin: "50px" }}>

                <Row className="game-rows">
                    <Col className="game-cols">
                        <PlayerArea
                            playerImage={BartImg}
                            health={this.props.player.health}
                            status={this.props.player.status}
                            currentEnemy={this.props.player}
                        />
                    </Col>
                    <Col className="game-cols">
                        {enemyArea}
                    </Col>
                </Row>
                <Row className="action-display-row"> <p style={{ textAlign: "center", minHeight: "20px" }}>{this.state.actionDisplay}</p></Row>
                <Row className="select-row">
                    <Col className="select-col">
                        <SelectBox
                            passSelection={this.baseOptionHandler}
                            availActions={this.state.currentAttacks}
                            availItems={this.state.currentItems}
                            playerTurn={this.state.playerTurn}
                            passSubOption={this.subOptionHandler}
                            baseOptions={this.props.player.baseOptions}
                        />
                    </Col>
                    <Col className="select-col">
                        <ActionLog
                            logItems={this.state.actionLogData}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
} export default Game;