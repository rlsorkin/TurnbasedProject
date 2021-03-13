import React, { Component } from 'react';
import EventModel from "../../Data Models/EventModel.js";

class EventScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventModel: new EventModel()
        }

        this.handleChoice = this.handleChoice.bind(this);
    }

    handleChoice(e){
        this.props.switchView(e)
    }

    render() {
        return (
            <div>
                <h3>{this.state.eventModel.evText}</h3>
                <button onClick={e => this.handleChoice(e)}>Choice 1</button>
                <button onClick={e => this.handleChoice(e)}>Choice A</button>
            </div>
        );
    }
} export default EventScreen;