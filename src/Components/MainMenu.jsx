import React, { Component } from 'react';

class MainMenu extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){

    }

    setCharacter(e){
        this.props.passSelected(e.target.innerText);
        this.props.switchView();
    }

    render() {
        return (
            <div style={{ height: "inherit", textAlign: "center" }}>
                <p>This is a Main Menu! Pretty cool right? You can choose a character now!</p>
                <button onClick={e => this.setCharacter(e)}>fighter</button>
                <button onClick={e => this.setCharacter(e)}>mage</button>
                {/* <button >Something else</button> */}
            </div>
        );
    }
} export default MainMenu;