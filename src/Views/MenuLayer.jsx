import React, { Component } from 'react';
import MainMenu from "../Components/MainMenu.jsx";
import TempGame from "../Components/TempGame.jsx";
import EventScreen from "../Components/EventComponents/EventScreen.jsx";

import PlayerModel from "../Data Models/PlayerModel.js";
import CharacterClass from "../PlayerJSON/characterClass.json";

import PlayerMoves from "../PlayerJSON/playerMoves.json";
import PlayerItems from "../PlayerJSON/playerItems.json";

class MenuLayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: true,
            selectedChar: "",
            metaPlayer: new PlayerModel(),
            showEvent: false,
            shouldInit: true
        }

        this.switchView = this.switchView.bind(this);
        this.setCharacter = this.setCharacter.bind(this);
    }

    switchView(ev) {
        if (ev === "event") {
            this.setState({
                showMenu: false,
                showEvent: true
            })
        } else {
            this.setState({
                showMenu: false,
                showEvent: false
            })
        }
    }

    setComponent() {
        if (this.state.showMenu === true) {
            return <MainMenu
                switchView={this.switchView}
                passSelected={this.setCharacter}
            />
            // return <EventScreen/>
        } else if (this.state.showEvent === true) {
            return <EventScreen
                switchView={this.switchView}
            />
        } else {
            return <TempGame
                switchView={this.switchView}
                selectedChar={this.state.selectedChar}
                player={this.state.metaPlayer}
                shouldInit={this.state.shouldInit}
            />
        }
    }

    setCharacter(selected) {
        // if (CharacterClass) {
            this.setState({
                selectedChar: selected
            })
        //     var charClass = CharacterClass[this.state.selectedChar];
        //     Object.assign(this.state.metaPlayer, charClass)
        //     this.state.metaPlayer.initialize(PlayerMoves[this.state.metaPlayer.class]["defaultAttackOpts"], PlayerItems[this.state.metaPlayer.class]["defaultItemOpts"])
        // }
    }



    render() {
        return (
            <div>
                {this.setComponent()}
            </div>
        );
    }
} export default MenuLayer;