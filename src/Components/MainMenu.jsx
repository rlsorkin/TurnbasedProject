import React, { Component } from 'react';

class MainMenu extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){

    }

    render() {
        return (
            <div style={{ height: "inherit", textAlign: "center" }}>
                <p>This is a Main Menu! Pretty cool right?</p>
                <button onClick={this.props.startGame}>Start</button>
                {/* <button >Something else</button> */}
            </div>
        );
    }
} export default MainMenu;