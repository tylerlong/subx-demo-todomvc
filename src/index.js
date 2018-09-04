import React from 'react'
import ReactDOM from 'react-dom'

import Todos from './models/Todos'
import TodoList from './components/TodoList'

import './index.css'

const todos = new Todos()

ReactDOM.render(<div>
  <h1>Todo App</h1>
  <TodoList todos={todos} />
</div>, document.getElementById('root'))
