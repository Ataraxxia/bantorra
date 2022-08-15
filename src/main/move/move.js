import React from 'react'

class Move extends React.Component {

    constructor(props) {
        super(props);
    }


    perform_move() {
                /*
        const params = {
            path: this.props.values.search_path,
            anidb_id: 1,
            naming_convention: "id",
            destination: "",
            files: this.state.selectedRows.map( row => row.original)
        };
        const options = {
            method: 'POST',
            body: JSON.stringify( params ) //only with POST 

        };

        fetch( '/api/movefiles', options );
        */
    }

    render() {
        return (
            <div>
                <h1>Moving...</h1>
            </div>
        )
    }
}

export default Move