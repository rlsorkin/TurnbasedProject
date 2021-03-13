import React, { Component } from 'react';
import MainMenu from "../Components/MainMenu.jsx";
import TempGame from "../Components/TempGame.jsx";
class MenuLayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: true,
            selectedChar: ""
        }

        this.switchView = this.switchView.bind(this);
        this.setCharacter = this.setCharacter.bind(this);
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
                passSelected = {this.setCharacter}
            />
        } else {
            return <TempGame
                switchView={this.switchView}
                selectedChar = {this.state.selectedChar}
            />
        }
    }

    setCharacter(selected){
        this.setState({
            selectedChar: selected
        })
    }



    render() {
        return (
            <div>
                {this.setComponent()}
            </div>
        );
    }
} export default MenuLayer;