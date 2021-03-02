import React, { Component } from 'react';

class StatsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            target: ""
        }
    }

    componentDidMount() {
        // if (this.props.thisEnemy) {
        //     this.setState({
        //         target: this.props.thisEnemy
        //     })
        // }
    }

    renderStats() {
        if (this.props.thisEnemy) {
            var temp = []
            Object.entries(this.props.thisEnemy).map(([key, value]) => {
                if(typeof(value) !== "object" && key !== "baseImage"){
                temp.push(<div>{key}: {value}</div>)
                }
            })
            return temp;
        }
    }

    render() {
        return (
            <div style={{ maxWidth: "30%", float: "right", minWidth: "25%", borderStyle: "solid", padding: "10px" }}>
                this is the stats panel
                {this.renderStats()}
            </div>
        );
    }
} export default StatsPanel;