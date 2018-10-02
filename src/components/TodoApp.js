import React from 'react'
import * as R from 'ramda'

import TodoList from './TodoList'
import Todo from '../models/Todo'

class TodoApp extends React.Component {
  constructor (props) {
    super(props)
    this.todos = this.props.todos
    this.state = {
      text: ''
    }
  }
  render () {
    return <div>
      <h1>Todo App</h1>
      <TodoList todos={this.todos} />
      <input value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />
      <button disabled={this.state.text.trim() === ''} onClick={e => {
        this.todos.todos = R.append(new Todo({ text: this.state.text.trim() }), this.todos.todos)
      }}>Add</button>
    </div>
  }
}

export default TodoApp
