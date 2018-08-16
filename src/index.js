import React from 'react'
import ReactDOM from 'react-dom'

import MarkdownEditor from './components/MarkdownEditor'
import Article from './models/Article'
import TodoList from './components/TodoList'
import Todos from './models/Todos'
import Todo from './models/Todo'
import TodoForm from './components/TodoForm'

const article = new Article()
const todos = new Todos([new Todo('hello'), new Todo('world')])

const render = () => {
  ReactDOM.render((<div>
    <h2>Markdown Editor</h2>
    <MarkdownEditor article={article} />
    <hr />
    <h2>Todo List</h2>
    <TodoList todos={todos.todos} />
    <TodoForm addTodo={text => { todos.addTodo(text) }} />
  </div>), document.getElementById('root'))
}

render()

article.on('textChanged', render)
todos.on('todoAdded', render)
