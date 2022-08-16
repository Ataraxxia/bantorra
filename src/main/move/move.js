import React from 'react'

class Move extends React.Component {

    constructor(props) {
        super(props);

        this.prevStep = this.props.prevStep.bind(this);
    }

    state = {
        isMoving: true,
        returnCode: null
    }

    componentDidMount() {
        this.perform_move();
    }

    perform_move() {
        const params = {
            path: this.props.values.search_path,
            anidb_id: this.props.values.anidb_show,
            naming_convention: this.props.values.naming_type,
            destination: this.props.values.dest_move_path,
            files: this.props.values.selected_files,
        };
 
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( params ) //only with POST 

        };

        fetch('/api/movefiles', options )
        .then( response => {
            console.log(response);
            this.setState({ 
                isMoving: false,
                returnCode: response.status
            })
        });
    }

    render() {
        if (this.state.isMoving){
            return (
                <div>
                    <h1>Moving...</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{this.state.returnCode === 200 ? "Everything went OK" : "Got some error"}</p>
                    <button className="btn btn-primary" onClick={this.prevStep}>Go back</button>
                </div>
            )
        }

    }
}

export default Move