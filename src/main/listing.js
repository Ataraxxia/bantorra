import React from 'react'

class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.prevStep = this.prevStep.bind(this);

        this.state = { 
            animedata: null,
            filelist: null,
            isFetching: true,
         };

    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        const params = {
            path: this.props.values.search_path,
        };
        const options = {
            method: 'GET',
            //body: JSON.stringify( params ) //only with POST 

        };

        fetch( '/api/listing?' + new URLSearchParams(params), options )
        .then( response => response.json() )
        .then( response => {
            // Do something with response.
            //console.log(response);

            this.setState({ 
                animedata: response.anime_data,
                filelist: response.file_list,
                isFetching: false,
            });
        } );

        
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleChange(event) {
        this.props.handleChange(event);
    }

    prevStep(event) {
        this.props.prevStep();
    }

    render() {
        if (this.state.isFetching) {
            return( 
            <div>
                <h1>Loading data</h1>
            </div>
            );
        }

        return (
            <div>
                <button className="btn btn-primary" onClick={this.prevStep}>Back</button>
                <form onSubmit={this.handleSubmit}>
                    <label>Destination path</label>
                    <input type="text"  name="dest_move_path" onChange={this.handleChange} />

                    <br />

                    <label>Search phrase</label>
                    <input type="text" name="search_phrase" list="search_phrase" onChange={this.handleChange} />
                    <datalist id="search_phrase">
                        {Object.entries(this.state.animedata).map(([key, item]) =>
                        <option key={key} value={key}>{item}</option>
                        )}
                    </datalist>

                    <br />

                    <p>Naming convention for directories: </p>

                    <label htmlFor="namingTitleJP">Show title JP</label>
                    <input type="radio" name="naming_type" value="jp" onChange={this.handleChange} />
                    
                    <label htmlFor="namingID">AniDB ID</label>
                    <input type="radio" name="naming_type" value="id" onChange={this.handleChange} />
                    
                    <br />

                    <button className="btn btn-primary">Select all</button>
                    <button className="btn btn-primary">Deselect all</button>

                    <button className="btn btn-primary">Submit</button>
                </form>

                <div>
                    <table className="table table-stripped">
                    <thead>
                        <tr key="header">
                            <th>File name</th>
                            <th style={{display:"none"}}>Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(this.state.filelist).map(([i, fileObj]) =>
                            <tr>
                                <td>{fileObj.name}</td>
                                <td style={{display:"none"}}>{fileObj.path}</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Listing