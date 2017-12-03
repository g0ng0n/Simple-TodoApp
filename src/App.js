import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo';
import { addTodo, generateId } from './lib/todoHelpers';

class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [
        {id: 1, name: 'Learn JSX', isComplete: true},
        {id: 2, name: 'Build an Awesome App', isComplete: flase},
        {id: 3, name: 'Ship It!', isComplete: flase},
      ],
      currentTodo: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
  }

  handleEmptySubmit(event){
    event.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo Name'
    })
  }

  handleSubmit(event){
    event.preventDefault();
    const newId = generateId();
    const newTodo = {name: this.state.currentTodo, isComplete: false, id: newId }
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setStte({
      todos: updateTodos,
      currentTodo: '',
      errorMessage: '',
    })
  }

  handleInputChange (event){
    this.setState({
      currentTodo: event.target.value,
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Todos</h1>
        </header>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error"> {this.state.errorMessage} </span>}
          <TodoForm handleInputChange={this.handleInputChange}
                    currentTodo={this.state.currentTodo}
                    handleSubmit={this.submitHandler}/>
          <TodoList todos={this.state.todos}/>
        </div>
      </div>
    );
  }
}

export default App;
