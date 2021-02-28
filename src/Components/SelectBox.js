import React, { Component } from 'react';

class SelectBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            option1: "Attack",
            option2: "Item",
            option3: "Special",
            option4: "Run",
            showing: false,
            selectedOption: ""
        }

        this.createSelectOptions = this.createSelectOptions.bind(this);
    }


    //returns label for base option clicked
    clickAlert(e) {
        this.setState({
            selectedOption: e.target.innerText
        })
        this.props.passSelection(e.target.innerText);
    }

    //returns label of sub option clicked
    subClickAlert(e, baseList){
        this.props.passSubOption(e.target.innerText)
    }

    createSelectOptions(optionsType) {
        const selectOptionsStyle = {
            width: "max-content",
            minWidth: "65px",
        }
        if (optionsType) {
            const someOptions = Object.values(optionsType);
            var optArray = [];
            someOptions.forEach(element => {
                // console.log(element.label);
                optArray.push(element);
                // return <button style={selectOptionsStyle} onClick={e => this.subClickAlert(e)}>{element.label}</button>;
            });
            // console.log("Select box-createSelectOpts: " + someOptions);
            return optArray.map((opt,) => <button style={selectOptionsStyle} title={opt.descript} onClick={e => this.subClickAlert(e)}>{opt.label}</button>);
        }
    }

    createBaseOptions(baseOptions){
        const selectOptionsStyle = {
            width: "max-content",
            minWidth: "65px",
        }
        if(baseOptions){
            const tempOpts = baseOptions;
            return tempOpts.map((opt, i) => <button style = {selectOptionsStyle} onClick={e => this.clickAlert(e)}>{opt}</button>)
        }
    }

    render() {

        const selectBoxStyle = {
            borderStyle: "double",
            marginLeft: "20px",
            display: "grid",
            gridTemplateColumns: "80px 80px 80px 80px",
            gridTemplateRows: "30px 30px 30px 30px",
            gridGap: "10px",
            backgroundColor: "#2196F3",
            padding: "10px",
            justifyContent: "start",

        }

        const selectOptionsStyle = {
            width: "max-content",
            minWidth: "65px",
        }

        const baseOpts = this.createBaseOptions(this.props.baseOptions);
        const moreOpts = this.createSelectOptions(this.props.availActions);

        return (

            <div style={selectBoxStyle}>
                {baseOpts}
                <div style={this.props.playerTurn ? { visibility: "visible" } : { visibility: "hidden" }}>{moreOpts}</div>
            </div>

        )
    }
} export default SelectBox;