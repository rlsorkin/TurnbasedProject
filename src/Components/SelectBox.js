import React, { Component } from 'react';

class SelectBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            option1: "Attack",
            option2: "Items",
            option3: "Special",
            option4: "Run",
            showing: false,
            selectedOption: ""
        }

        this.createSelectOptions = this.createSelectOptions.bind(this);
        this.subClickAlert = this.subClickAlert.bind(this);
    }


    //returns label for base option clicked
    clickAlert(e) {
        console.log("sending base opt click");
        this.setState({
            selectedOption: e.target.innerText
        })
        this.props.passSelection(e.target.innerText);
    }

    //returns label of sub option clicked
    subClickAlert(e, baseList){
        console.log("passing the sub opt click");
        // console.log("SelectBox subClickAlert for: " + e.target.innerText)
        this.props.passSubOption(e.target.innerText)
    }

    consoleAlert(){
        // console.log("consoleAlert in Select Box, button clicked")
    }

    createSelectOptions(optionsType) {
        console.log("Creating sub opt buttons using " + optionsType);
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
            // console.log("Select box-createSelectOpts: " + optArray);
            return optArray.map((opt,) => <button style={selectOptionsStyle} title={opt.descript} onClick={e => this.subClickAlert(e)}>{opt.label}</button>);
        }
    }

    createBaseOptions(baseOptions){
        console.log("Creating base opt buttons");
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

        var currentSubOptions = "";
        if(this.state.selectedOption === "Attack"){
            currentSubOptions = this.props.availActions;
        } else if(this.state.selectedOption === "Items"){
            currentSubOptions = this.props.availItems;
        }

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
        const moreOpts = this.createSelectOptions(currentSubOptions);

        return (

            <div style={selectBoxStyle}>
                {baseOpts}
                <div style={this.props.playerTurn ? { visibility: "visible" } : { visibility: "hidden" }}>{moreOpts}</div>
            </div>

        )
    }
} export default SelectBox;