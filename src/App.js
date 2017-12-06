import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import { addTodo, generateId, findById, toogleTodo, updateTodo, removeTodo, filterTodos } from './lib/todoHelpers';
import { pipe, partial } fromm './lib/utils'

class App extends Component {

  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Build an Awesome App', isComplete: flase},
      {id: 3, name: 'Ship It!', isComplete: flase},
    ],
    currentTodo: '',
  }
  static contextTypes = {
    route: React.PropTypes.string
  }

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo Name'
    })
  }

  handleToogle = (id) => {
    const getUpdatedTodos = pipe(findById, toogleTodo, partial(updateTodo, this.state.todos))
    const updatedTodo = getUpdatedTodos(id, this.state.todos)
    this.setState({todos: updatedTodo})
  }

  handleRemove = (id, event) => {
    event.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
  }

  handleSubmit = (event) => {
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

  handleInputChange = (event) => {
    this.setState({
      currentTodo: event.target.value,
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
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
          <TodoList
            handleRemove={this.handleRemove}
            handleToogle={this.handleToogle}
            todos={displayTodos}/>
            <Footer />
        </div>
      </div>
    );
  }
}

export default App;
