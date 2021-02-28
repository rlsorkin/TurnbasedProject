import React, { Component } from 'react';
import PlayerHealthBar from "./PlayerHealthBar";
import StatsPanel from "./StatsPanel.jsx";

class PlayerArea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div >
                {/* <StatsPanel
                    currentEnemy={this.props.currentEnemy}
                /> */}
                <img src={this.props.playerImage} title="Don't aggro a cow, man!" />
                <PlayerHealthBar
                    health={this.props.health}
                    status={this.props.status}
                />
            </div>
        );
    }
} export default PlayerArea;