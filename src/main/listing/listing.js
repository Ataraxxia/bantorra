import React from 'react'
import Table from "./table";
import "./listing.css"

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
            isMoving: false,
            selectedRows: [],
            columns: [
                {
                  // first group
                  Header: "Anime",
                  //
                  columns: [
                    {
                      Header: "Title",
                      accessor: "name",
                    }
                  ]
                }
            ]
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

            this.setState({ 
                animedata: response.anime_data,
                filelist: response.file_list,
                isFetching: false,
            });
        } );
    }

    handleSubmit(event) {

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

        if (this.state.isMoving) {
            return (
                <div>
                    <h1>Moving files</h1>
                </div>
            );
        }

        return (
            <div className='row'>
                <div className='column' style={{textAlign: "left", margin: "15px"}}>
                    <button className="btn btn-primary" onClick={this.prevStep}>Back</button>
                    <form onSubmit={this.handleSubmit}>
                        <label>Destination path</label>
                        <input type="text"  name="dest_move_path" onChange={this.handleChange} />

                        <br />

                        <label>Search AniDB show:</label>
                        <input type="text" name="anidb_show" list="anidb_show" onChange={this.handleChange} />
                        <datalist id="anidb_show">
                            {Object.entries(this.state.animedata).map(([key, item]) =>
                            <option key={key} value={key}>{item}</option>
                            )}
                        </datalist>

                        <br />

                        <label>Naming convention for directories: </label><br />

                        <label htmlFor="namingTitleJP">Show title JP</label>
                        <input type="radio" name="naming_type" value="jp" onChange={this.handleChange} />
                        <br />
                        <label htmlFor="namingID">AniDB ID</label>
                        <input type="radio" name="naming_type" value="id" onChange={this.handleChange} />
                        
                        <br />

                        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>

                <div className='triple-column'>
                    <Table 
                        onRowSelect={rows => this.setState({selectedRows: rows})}
                        columns={this.state.columns} 
                        data={this.state.filelist} />
                </div>
            </div>
        );
    }
}

export default Listing