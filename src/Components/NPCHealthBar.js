import React, { Component } from 'react';

class NPCHealthBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // amount: 0
        }
    }

    render() {

        const Filler = (props) => {
            return (
                <div className="filler" style={{ width: this.props.health + "%" }}></div>
            )
        }

        return (
            <div className="status-container">
                <div className="progress-bar" style={{marginLeft: "40%"}}>
                    <Filler />
                </div>
                <p style={{textAlign: "end"}}>Status: {this.props.status}</p>
            </div>
        );
    }
} export default NPCHealthBar;