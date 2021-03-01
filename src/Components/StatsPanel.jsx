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
            console.log("trying to render stats")
            // Object.keys(this.props.thisEnemy).map(function(key){
            //     return <div>{key}: {temp[key]}</div>
            // });

            Object.entries(this.props.thisEnemy).map(([key, value]) => {
                console.log("Key: " + key + " value: " + value);
                if(typeof(value) !== "object" && key !== "baseImage"){
                temp.push(<div>{key}: {value}</div>)
                }
            })
            return temp;
            // return statsItems.map((log) => <div>{log}</div>);

            // var tempObj = {
            //     name: "",
            //     health: "",
            //     status: "",
            //     baseDamage: "",
            //     description: ""
            // }

            // tempObj.name = this.state.target.name
            // tempObj.health = this.state.target.health
            // tempObj.status = this.state.target.status
            // tempObj.baseDamage = this.state.target.baseDamage
            // tempObj.description = this.state.target.description
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