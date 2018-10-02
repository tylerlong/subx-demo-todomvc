import React from 'react'
import ReactDOM from 'react-dom'

import TodoApp from './components/TodoApp'
import Todos from './models/Todos'
import Todo from './models/Todo'

import './index.css'

const todos = new Todos()
todos.todos.push(new Todo({ text: 'hello' }))
todos.todos.push(new Todo({ text: 'world' }))

ReactDOM.render(<TodoApp todos={todos} />, document.getElementById('root'))
