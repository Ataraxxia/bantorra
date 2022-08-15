import React from 'react'
import SearchPath from './searchpath/searchpath'
import Listing from './listing/listing'

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    state = {
        step: 1,
        search_path: '/home/bdrogo/anime/',
        dest_move_path: '',
        naming_type: '',
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

    render() {
        const { step } = this.state;
        const { search_path } = this.state;
        const values = { search_path }

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