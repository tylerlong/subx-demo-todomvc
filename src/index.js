import React from 'react'
import ReactDOM from 'react-dom'
import { Subject } from 'rxjs'
import MarkdownIt from 'markdown-it'
import { debounceTime } from 'rxjs/operators'

// import MarkdownEditor from './components/MarkdownEditor'
import Editor from './components/Editor'
// import Article from './models/Article'
// import TodoList from './components/TodoList'
// import Todos from './models/Todos'
// import Todo from './models/Todo'
// import TodoForm from './components/TodoForm'

// const article = new Article()
// const todos = new Todos([new Todo('hello'), new Todo('world')])

const mdi = new MarkdownIt()

const store = {
  text: '',
  html: ''
}
const subject = new Subject()

const render = () => {
  ReactDOM.render((<div>
    <Editor text={store.text} html={store.html} onTextChange={subject.next.bind(subject)} />
    {/* <h2>Markdown Editor</h2>
    <MarkdownEditor article={article} />
    <hr />
    <h2>Todo List</h2>
    <TodoList todos={todos.todos} />
    <TodoForm addTodo={text => { todos.addTodo(text) }} /> */}
  </div>), document.getElementById('root'))
}

render()

subject.subscribe(val => {
  store.text = val
  render()
})

subject.pipe(debounceTime(1000)).subscribe(val => {
  store.html = mdi.render(val)
  render()
})

// article.on('textChanged', render)
// todos.on('todoAdded', render)
