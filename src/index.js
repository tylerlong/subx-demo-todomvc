import React from 'react'
import ReactDOM from 'react-dom'

import TodoList from './models/TodoList'
import TodoApp from './components/TodoApp'

import './index.css'

const todoList = new TodoList()

ReactDOM.render(<TodoApp todoList={todoList} />, document.getElementById('root'))
