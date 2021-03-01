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
import PlayerModel from "../Data Models/PlayerModel.js";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {

            // player: {
            //     status: "OK",
            //     health: 100
            // },

            player: new PlayerModel(),
            showMenu: false,
            fightOver: false,
            NPC: new EnemyModel(),
            playerTurn: true,
            currentAction: "Attack",
            currentSubOption: "",
            actionLogData: ["Let Mortal Combat Commence"],
            actionDisplay: "",
            availableActions: [],
            availableItems: [],
            currentAttacks: new AttackModel(),
            currentItems: new ItemModel(),
            baseOptions: [
                "Attack",
                "Items",
                "Special",
                "Run"
            ]
        }

        // this.newHandlePlayerDamage = this.newHandlePlayerDamage.bind(this);
        // this.newHandleAttack = this.newHandleAttack.bind(this);
        // this.passSubOption = this.passSubOption.bind(this);
        this.baseOptionHandler = this.baseOptionHandler.bind(this);
        this.subOptionHandler = this.subOptionHandler.bind(this);
        this.loadNextScene = this.loadNextScene.bind(this);
        this.startGame = this.startGame.bind(this);
        // this.endTurn = this.endTurn.bind(this);
        this.handleNPCTurn = this.handleNPCTurn.bind(this);
    }

    // ------------------------------------------------------------------------------------------------
    //change name of state value for AttackModel to AttackModel, same w other models

    initialize() {
        console.log("Initializing");
        this.state.NPC.initEnemy(100, "OK", HomerImg, "Look at him go!", 10);
        this.state.player.initialize(100, "OK")
        // this.setState({
        //     showMenu: true
        // })
    }

    componentDidMount() {
        this.initialize()
        console.log("Mounted and initialized");
    }

    //Base Option Handler receives label from selectbox and chooses correct player handler
    baseOptionHandler(selection) {
        console.log("Clicked on " + selection + " processing in baseOptHandler");
        if (this.state.playerTurn) {
            if (!this.state.baseOptions.includes(selection)) {
                console.log("not included in baseOpts: " + selection)
            }
            switch (selection) {
                case 'Attack':
                    this.state.player.setActions(this.state.currentAttacks.getOptions(selection));
                    this.setState({
                        currentAction: "Attack",
                        availableActions: this.state.player.availableActions,
                        actionDisplay: "Attacking"
                    })
                    break;
                case 'Items':
                    this.state.player.setItems(this.state.currentItems.getOptions(selection))
                    this.setState({
                        currentAction: "Items",
                        availableItems: this.state.player.availableItems
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
                    // console.log("couldnt find matching action for: " + this.state.currentAction)
                    return;
            }
        }
    }

    //Player now has received attack options from AttackModel, sends those options to selectbox
    //selectbox now populates its sub options buttons
    //sub option btn dispatches label to sub opt handler
    subOptionHandler(subOpt) {
        // console.log("fetching value from player model: " + this.state.player.handleAttack(subOpt));
        this.setState({
            currentSubOption: subOpt,
            actionDisplay: subOpt
        })
        switch (this.state.currentAction) {
            case 'Attack':
                // this.newHandleAttack(subOpt)
                var dmgVal = this.state.player.handleAttack(subOpt);
                console.log("Time out, then handleNPCTurn");
                this.handleNPCTurn(dmgVal);
                console.log("Exiting handleNPCTurn");
                this.setState({
                    actionDisplay: "Your turn",
                    playerTurn: true,
                    availableActions: [],
                    currentAction: ""
                })
                // this.state.NPC.calcDamageTaken(dmgVal);
                // console.log("Made it past calcDamage somehow");
                break;
            case 'Items':
                // this.handleItem(subOpt)
                this.state.player.handleItem(subOpt);
                this.handleNPCTurn(0)
                this.setState({
                    actionDisplay: "Your turn",
                    playerTurn: true,
                    availableItems: [],
                    currentAction: ""
                })
                break;
            case 'Special':
                break;
            case 'Run':
                break;
            default:
                console.log("couldnt find matching action for: " + subOpt)
                return;
        }
    }


    //this doesnt work this way, I need to write wrapper functions so I can manip state while modifying the models?
    // endTurn() {
    //     console.log("Ending turn now");
    //     var whosTurn = "";
    //     if(this.state.playerTurn){
    //         whosTurn = "Enemy turn"
    //     } else { whosTurn = "Your turn"}
    //     if (this.state.NPC.health !== 0) {
    //         this.setState({
    //             playerTurn: false,
    //             availableActions: [],
    //             actionDisplay: whosTurn,
    //             currentAction: ""
    //         })
    //         setTimeout(() => { 
    //             this.state.player.takeDamage(this.state.NPC.calcDamageDealt());
    //         }, 1000);
    //     } else {
    //         this.setState({
    //             endFight: true
    //         })
    //     }

    handleNPCTurn(dmgValue) {
        this.setState({
            playerTurn: false,
            availableActions: [],
            actionDisplay: "Enemy Turn",
            currentAction: ""
        })
        this.state.NPC.calcDamageTaken(dmgValue);
        this.state.player.takeDamage(this.state.NPC.calcDamageDealt());
    }


    endFight() {
        console.log("Ending fight?");
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
        console.log("Loading next scene");
        this.initialize()
        this.setState({
            endFight: false,
            playerTurn: true,
            actionLogData: [],
            actionDisplay: ""
        })
    }

    startGame() {
        console.log("Game Starting");
        this.setState({
            showMenu: false
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
                            health={this.state.player.health}
                            status={this.state.player.status}
                            currentEnemy={this.state.player}
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
                            availActions={this.state.availableActions}
                            availItems={this.state.availableItems}
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
            </div>
        );
    }
} export default Game;