import React, { Component } from 'react';

class StatsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // amount: 0
        }
    }

    renderStats() {
        if (this.props.thisEnemy) {
            console.log("trying to render stats")
            var statsItems = Object.values(this.props.thisEnemy);
            return statsItems.map((log) => <div>{log}</div>);
        }
    }

    render() {
        return (
            <div style={{ maxWidth: "30%", float: "right", minWidth: "25%", borderStyle: "solid", padding: "10px"}}>
                this is the stats panel
                {this.renderStats()}
            </div>
        );
    }
} export default StatsPanel;