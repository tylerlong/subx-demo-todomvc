import React from 'react'
import ReactDOM from 'react-dom'

import Todos from './models/Todos'
import Todo from './models/Todo'
import TodoList from './components/TodoList'

import './index.css'

const todos = new Todos()
todos.todos.push(new Todo({ text: 'hello' }))
todos.todos.push(new Todo({ text: 'world' }))

ReactDOM.render(<div>
  <h1>Todo App</h1>
  <TodoList todos={todos} />
  <input /> <button>Add</button>
</div>, document.getElementById('root'))
