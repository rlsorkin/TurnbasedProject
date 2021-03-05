import React, { Component } from 'react';
import CharacterClass from "../PlayerJSON/characterClass.json";

class MainMenu extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    setCharacter(e) {
        var temp = e.target.id;
        this.props.passSelected(temp);
        this.props.switchView();
    }

    renderCharClass(char) {
        if (CharacterClass) {
            var temp = []
            Object.entries(CharacterClass[char]).map(([key, value]) => {
                if (typeof (value) !== "object" && key !== "baseImage") {
                    temp.push(<li>{key}: {value}</li>)
                }
            })
            return temp;
        }
    }

    render() {
        return (
            <div style={{ height: "inherit", textAlign: "center" }}>
                <p>This is a Main Menu! Pretty cool right? You can choose a character now!</p>
                <button id="fighter" className="char-select-btn" onClick={e => this.setCharacter(e)}>
                    fighter
                    <span className="tooltiptext" onClick='return false;'>{this.renderCharClass("fighter")}</span>
                </button>
                <button id="mage" className="char-select-btn" onClick={e => this.setCharacter(e)}>
                    mage
                    <ul className="tooltiptext" onClick='return false;'>{this.renderCharClass("mage")}</ul>
                </button>
                {/* <button >Something else</button> */}
            </div>
        );
    }
} export default MainMenu;