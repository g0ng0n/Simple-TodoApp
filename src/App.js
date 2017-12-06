import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import { addTodo, generateId, findById, toogleTodo, updateTodo, removeTodo, filterTodos } from './lib/todoHelpers';
import { pipe, partial } fromm './lib/utils'
import { loadTodos , createTodo, saveTodo, destroyTodo } from './lib/todoService'

class App extends Component {

  state = {
    todos: [],
    currentTodo: '',
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMout() {
    loadTodos()
      .then( todos => this.setState({todos}))
  }

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo Name'
    })
  }

  handleToogle = (id) => {
    const getToogledTodo = pipe(findById, toogleTodo)
    const updated = getToogledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos))
    const updatedTodo = getUpdatedTodos(updated)
    this.setState({todos: updatedTodo})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
  }

  handleRemove = (id, event) => {
    event.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo Removed'))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newId = generateId();
    const newTodo = {name: this.state.currentTodo, isComplete: false, id: newId }
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updateTodos,
      currentTodo: '',
      errorMessage: '',
    })
    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo Added'))
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2500)
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
          {this.state.message && <span className="success"> {this.state.message} </span>}
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
