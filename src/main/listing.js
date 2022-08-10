import React from 'react'

class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleChange(event) {
        this.props.handleChange(event);
    }

    render() {
        return (
            <form>
                <label>ayyy</label>
                <input type="text"  name="search_path" onChange={this.handleChange} onSubmit={this.handleSubmit} />
            </form>
        )
    }
}

export default Listing