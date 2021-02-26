import React, { Component } from 'react';

class ActionLog extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    renderLog(logItems) {
        const logging = logItems;
        return logging.map((log) => <li>{log}</li>);
    }

    render() {

        return (
            <div>
                <ul>
                    {this.renderLog(this.props.logItems)}
                </ul>
            </div>
        );
    }
} export default ActionLog;