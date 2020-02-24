import React, { Component } from 'react'

import './ToDoListItem.css'

export default class ToDoListItem extends Component {
    render() {
        const {label, onDeleted, onToggleImportant, onToggleDone, done, important, disabled} = this.props;

        let classNames = 'todo-list-item';
        if (done){
            classNames += ' done'
        }
        if (important) {
            classNames += ' important'
        }
        return (
            <span className={ classNames }>
                <span className="todo-list-item-label"
                      onClick={ onToggleDone }>
                    { label }
                </span>
                <div className="todo-list-item-buttons">
                    <button type="button"
                            className="btn btn-outline-danger"
                            onClick={ onDeleted}>
                        <i className="fa fa-trash-o"></i>
                    </button>

                    <button type="button"
                            className="btn btn-outline-success"
                            onClick={ onToggleImportant }>
                        <i className="fa fa-exclamation"></i>
                    </button>
                </div>
            </span>
        )
    }
}
