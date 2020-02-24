import React, { Component } from 'react'

import './AddItem.css'

export default class AddItem extends Component {

    state = {
        text: ''
    };

    onTextChange = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onCreated(this.state.text);
        this.setState({
            text: ''
        })
    };

    render() {
        return (
            <form className="add-item" onSubmit={ this.onSubmit }>
                <input type="text"
                       id="newItemText"
                       className="form-control"
                       placeholder="Type here to add"
                       value={ this.state.text }
                       onChange={ this.onTextChange }/>
                <button type="submit"
                        className="btn btn-success"> Add Item </button>
            </form>
        )
    }
}
