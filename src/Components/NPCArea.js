import React, { Component } from 'react';
import NPCHealthBar from "./NPCHealthBar"

class NPCArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEnemy: ""
        }
    }

    componentDidMount(){
        this.setState({
            currentEnemy: this.props.currentEnemy
        })
    }

    render() {
        return (
            <div style={{ float: "right", height: "inherit" }}>
                <NPCHealthBar
                    // health={this.props.health}
                    // status={this.props.status}
                    health={this.state.currentEnemy.health}
                    status={this.state.currentEnemy.status}
                />
                <img src={this.state.currentEnemy.baseImage} title={this.state.currentEnemy.description} style={{ height: "inherit" }} />
            </div>
        );
    }
} export default NPCArea;