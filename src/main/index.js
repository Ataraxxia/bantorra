import React from 'react'
import SearchPath from './searchpath/searchpath'
import Listing from './listing/listing'
import Move from './move/move'

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    state = {
        step: 1,
        search_path: '/home/bdrogo/anime/',
        dest_move_path: null,
        naming_type: null,
        anidb_show: null,
        selected_files: null,
    }

    prevStep() {
        const { step } = this.state;
        this.setState( { step: step - 1 });
    }

    nextStep() {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleUpdate(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const { step } = this.state;
        const values = { ...this.state }

        switch(step) {
            case 1:
                return (
                    <SearchPath 
                        nextStep={ this.nextStep }
                        handleChange={ this.handleChange }
                        values={ values }
                    />
                )
            case 2:
                return(
                    <Listing
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleUpdate={this.handleUpdate}
                        values={ values }
                    />
                )
            case 3:
                return (
                    <Move 
                        prevStep={this.prevStep}
                        values={ values }
                    />
                )
            default:
                return(
                    <SearchPath 
                    nextStep={ this.nextStep }
                    handleChange={ this.handleChange }
                    values={ values }
                />                   
                )
        }
    }
}

export default Main