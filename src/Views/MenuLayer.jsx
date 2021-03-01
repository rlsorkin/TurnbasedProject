import React, { Component } from 'react';
import Game from "../Components/Game.js";
import MainMenu from "../Components/MainMenu.jsx";
import TempGame from "../Components/TempGame.jsx";
class MenuLayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: true
        }

        this.switchView = this.switchView.bind(this);
    }

    switchView() {
        this.setState({
            showMenu: false
        })
    }

    setComponent() {
        if (this.state.showMenu) {
            return <MainMenu
                switchView={this.switchView}
            />
        } else {
            return <TempGame
                switchView={this.switchView}
            />
        }
    }

    render() {
        return (
            <div>
                {this.setComponent()}
            </div>
        );
    }
} export default MenuLayer;