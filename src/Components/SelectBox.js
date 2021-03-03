import React, { Component } from 'react';

class SelectBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showing: true,
            selectedOption: ""
        }

        this.createSelectOptions = this.createSelectOptions.bind(this);
        this.subClickAlert = this.subClickAlert.bind(this);
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

    consoleAlert(){
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
                optArray.push(element);
                // return <button style={selectOptionsStyle} onClick={e => this.subClickAlert(e)}>{element.label}</button>;
            });
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

        var currentSubOptions = "";
        if(this.state.selectedOption === this.props.baseOptions[0]){
            currentSubOptions = this.props.availActions;
        } else if(this.state.selectedOption === this.props.baseOptions[1]){
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
        
        const baseOpts = this.createBaseOptions(this.props.baseOptions);
        var moreOpts = [];
        if(this.props.playerTurn){
            moreOpts = this.createSelectOptions(currentSubOptions);
        }

        return (

            <div style={selectBoxStyle}>
                {baseOpts}
                <div style={this.props.playerTurn ? { visibility: "visible" } : { visibility: "hidden" }}>{moreOpts}</div>
            </div>

        )
    }
} export default SelectBox;