import React, { Component } from 'react';
import PlayerHealthBar from "./PlayerHealthBar"

class PlayerArea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{float: "left", height: "inherit", position: "absolute", maxWidth: "482px"}}>
                <img src={this.props.playerImage} title="Don't aggro a cow, man!" style={{height: "inherit", width: "auto"}}/>
                <PlayerHealthBar
                    health={this.props.health}
                    status={this.props.status}
                />
            </div>
        );
    }
} export default PlayerArea;