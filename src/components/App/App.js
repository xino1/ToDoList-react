import React, { Component } from "react";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import ToDoList from "../ToDoList";
import AddItem from "../AddItem";
import ItemStatusFilter from '../ItemStatusFilter';

import './App.css'

export default class App extends Component {

    maxId = 100;

    state =  {
        ToDoListData: [
            this.createToDoItem('Drink Coffee'),
            this.createToDoItem('Panic'),
            this.createToDoItem('Panic again')
        ],
        term: '',
        filter: 'all' // all, active, done
    };

    createToDoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ ToDoListData }) => {
            const idx = ToDoListData.findIndex((el) => el.id === id);
            const newToDoListData = [
                ... ToDoListData.slice(0, idx),
                ... ToDoListData.slice(idx + 1)
            ];
            return{
                ToDoListData: newToDoListData
            }
        })
    };

    createItem = (text) => {
        const newItem = this.createToDoItem(text);
        this.setState(({ ToDoListData }) => {
            const newToDoListData = [ ... ToDoListData, newItem ];
            return{
                ToDoListData: newToDoListData
            }
        })
    };

    toggleProperty(arr, id, propName){
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ... oldItem, [propName]: !oldItem[propName] };
        return [
            ... arr.slice(0, idx),
            newItem,
            ... arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({ ToDoListData }) => {
            return{
                ToDoListData: this.toggleProperty(ToDoListData, id, 'done')
            }
        })
    };

    onToggleImportant = (id) => {
        this.setState(({ ToDoListData }) => {
            return{
                ToDoListData: this.toggleProperty(ToDoListData, id, 'important')
            }
        })
    };

    search(items, term) {
        if (term.length === 0){
            return items
        }
        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        })
    }

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items
        }
    }

    onSearchChange = (term) => {
        this.setState({ term })
    };

    onFilterChange = (filter) => {
        this.setState({ filter })
    };

    render() {

        const { ToDoListData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(ToDoListData, term), filter);

        const doneCount = ToDoListData
            .filter((el) => el.done).length;

        const todoCount = ToDoListData.length - doneCount;

        return (
            <div className="app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel" >
                    <SearchPanel onSearchChange={ this.onSearchChange } />
                    <ItemStatusFilter
                        filter={ filter }
                        onFilterChange={ this.onFilterChange } />
                </div>
                <ToDoList
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }/>
                <AddItem
                    onCreated={ this.createItem }
                />
            </div>
        )
    }
}
