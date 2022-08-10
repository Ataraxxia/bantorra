import React from 'react'

class SearchPath extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.nextStep();
        event.preventDefault();
    }

    handleChange(event) {
        this.props.handleChange(event);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Path</label>
                <input type="text" value={this.props.values.search_path} name="search_path" onChange={this.handleChange} />
                <input type="submit" value="Next"/>
            </form>
        )
    }
}

export default SearchPath