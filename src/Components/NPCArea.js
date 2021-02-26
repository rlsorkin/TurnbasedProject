import React, { Component } from 'react';
import NPCHealthBar from "./NPCHealthBar"

class NPCArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEnemy: "",
        }
    }

    render() {
        return (
            <div style={{ float: "right", height: "inherit" }}>
                <NPCHealthBar
                    health={this.props.health}
                    status={this.props.status}
                />
                <img src={this.props.npcImage} title="Look at him go!" style={{ height: "inherit" }} />
            </div>
        );
    }
} export default NPCArea;