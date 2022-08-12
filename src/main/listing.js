import React from 'react'

class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filterTable = this.filterTable.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.clickRow = this.clickRow.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.deselectAll = this.deselectAll.bind(this);

        this.state = { 
            animedata: null,
            filelist: null,
            filteredfilelist:null,
            isFetching: true,
            phrase: "",
            selected_files: {},
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

        var isSelected = false;

        fetch( '/api/listing?' + new URLSearchParams(params), options )
        .then( response => response.json() )
        .then( response => {

            this.setState({ 
                animedata: response.anime_data,
                filelist: response.file_list.map(fileObj => ({ ...fileObj, isSelected})),
                isFetching: false,
            });
        } );
    }

    clickRow(event) {
        //event.currentTarget.classList.toggle('table-active');

        const path = event.currentTarget.getAttribute("path");
        let selectedflist = {...this.state.selected_files}; // make a local copy of selected file list
        let flist = this.state.filelist

        flist.filter(o => o.path === path).map(fileObj => {
            fileObj.isSelected = !fileObj.isSelected;
        });

        if (selectedflist[path] !== true) {
            selectedflist[path] = true;
        } else {
            delete selectedflist[path];
        }

        this.setState({
            selected_files: selectedflist,
            filelist: flist,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleChange(event) {
        this.props.handleChange(event);
    }

    filterTable(event) {
        this.setState({
            phrase: event.target.value.toLowerCase(),
        });
    }

    selectAll(event) {

        let selectedflist = {};
        let flist = this.state.filelist;

        flist.filter(o => o.name.toLowerCase().includes(this.state.phrase)).map(fileObj => {
            selectedflist[fileObj.path] = true;
            fileObj.isSelected = true;
        });

        this.setState({
            filelist: flist,
            selected_files: selectedflist,
        });
    }

    deselectAll(event){
        let selectedflist = {};
        let flist = this.state.filelist;

        flist.filter(o => o.name.toLowerCase().includes(this.state.phrase)).map(fileObj => {
            fileObj.isSelected = false;
        });

        this.setState({
            filelist: flist,
            selected_files: selectedflist,
        });
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

                    <label>Search AniDB show:</label>
                    <input type="text" name="anidb_show" list="anidb_show" onChange={this.handleChange} />
                    <datalist id="anidb_show">
                        {Object.entries(this.state.animedata).map(([key, item]) =>
                        <option key={key} value={key}>{item}</option>
                        )}
                    </datalist>

                    <br />

                    <p>Naming convention for directories: </p>

                    <label htmlFor="namingTitleJP">Show title JP</label>
                    <input type="radio" name="naming_type" value="jp" onChange={this.handleChange} />
                    <br />
                    <label htmlFor="namingID">AniDB ID</label>
                    <input type="radio" name="naming_type" value="id" onChange={this.handleChange} />
                    
                    <br />

                    <button className="btn btn-primary" onClick={this.selectAll}>Select all</button>
                    <button className="btn btn-primary" onClick={this.deselectAll}>Deselect all</button>

                    <button className="btn btn-primary">Submit</button>
                </form>

                <div>
                    <input type="text" name="filter_phrase" onChange={this.filterTable} />
                    <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>File name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.filelist.filter(o => o.name.toLowerCase().includes(this.state.phrase)).map( fileObj => (
                            <tr>
                                <td className={fileObj.isSelected ? "table-active" : ""} onClick={this.clickRow} path={fileObj.path}>{fileObj.name}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Listing