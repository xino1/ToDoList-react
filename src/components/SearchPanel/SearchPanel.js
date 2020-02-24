import React, { Component } from "react";

import './SearchPanel.css'

export default class SearchPanel extends Component {
    state = {
        term: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState( { term });
        this.props.onSearchChange(term)
    };

    render() {
        return (
            <div className="search-panel">
                <input className="search-panel-input form-control"
                       placeholder="Type here to search"
                       onChange={this.onSearchChange}
                       value={this.state.term}/>
            </div>
        )
    }
};
