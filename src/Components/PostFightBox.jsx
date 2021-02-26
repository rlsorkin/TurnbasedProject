import React, { Component } from 'react';
import NPCHealthBar from "./NPCHealthBar"

class PostFightBox extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){

    }

    render() {
        return (
            <div style={{ float: "right", height: "inherit" }}>
                <p>YOU WON!</p>
                <button onClick={this.props.loadNextScene}>LOAD NEXT</button>
            </div>
        );
    }
} export default PostFightBox;