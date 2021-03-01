import React, { Component } from 'react';
import NPCHealthBar from "./NPCHealthBar";
import StatsPanel from "./StatsPanel.jsx";

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
            <div>
                <NPCHealthBar
                    // health={this.props.health}
                    // status={this.props.status}
                    health={this.state.currentEnemy.health}
                    status={this.state.currentEnemy.status}
                />
                <img src={this.state.currentEnemy.baseImage} title={this.state.currentEnemy.description} />
                <StatsPanel
                    thisEnemy = {this.state.currentEnemy}
                />
            </div>
        );
    }
} export default NPCArea;