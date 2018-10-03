import React from 'react'
import ReactDOM from 'react-dom'
import SubX from 'subx'
import { Component } from 'react-subx'
import uuid from 'uuid/v1'
import classNames from 'classnames'
import pluralize from 'pluralize'
import * as R from 'ramda'

import 'todomvc-app-css/index.css'

const Todo = new SubX({
  title: '',
  completed: false,
  editing: false
})
Todo.create = obj => new Todo({
  id: uuid(),
  ...obj
})
const store = SubX.create({
  todos: [],
  show: 'All',
  get visibleTodos () {
    if (this.show === 'All') {
      return this.todos
    } else if (this.show === 'Active') {
      return this.todos.filter(todo => !todo.completed)
    } else if (this.show === 'Completed') {
      return this.todos.filter(todo => todo.completed)
    }
  },
  get allDone () {
    return R.all(todo => todo.completed, this.todos)
  },
  get left () {
    return this.todos.filter(todo => !todo.completed).length
  },
  get done () {
    return this.todos.filter(todo => todo.completed).length
  },
  toggleAll () {
    if (this.allDone) {
      R.forEach(todo => { todo.completed = false }, this.todos)
    } else {
      R.forEach(todo => { todo.completed = true }, this.todos)
    }
  },
  remove (todo) {
    const index = R.findIndex(t => t.id === todo.id, this.todos)
    this.todos.splice(index, 1)
  },
  editTodo (todo) {
    todo.editing = true
    todo.cache = todo.title
  },
  doneEdit (todo) {
    todo.editing = false
    delete todo.cache
    todo.title = todo.title.trim()
    if (todo.title === '') {
      this.remove(todo)
    }
  },
  cancelEdit (todo) {
    todo.editing = false
    todo.title = todo.cache
    delete todo.cache
  },
  clearCompleted () {
    this.todos = this.todos.filter(todo => !todo.completed)
  }
})

class TodoItem extends Component {
  constructor (props) {
    super(props)
    this.todo = this.props.todo
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }
  handleKeyUp (e) {
    if (e.key === 'Enter') {
      store.doneEdit(this.todo)
    } else if (e.key === 'Escape') {
      store.cancelEdit(this.todo)
    }
  }
  render () {
    return <li className={classNames('todo', { completed: this.todo.completed, editing: this.todo.editing })}>
      <div className='view'>
        <input className='toggle' type='checkbox' checked={this.todo.completed} onChange={e => { this.todo.completed = e.target.checked }} />
        <label onDoubleClick={e => {
          store.editTodo(this.todo)
          setTimeout(() => ReactDOM.findDOMNode(this.refs.editField).focus(), 10)
        }}>{this.todo.title}</label>
        <button className='destroy' onClick={e => store.remove(this.todo)} />
      </div>
      <input ref='editField' className='edit' type='text' value={this.todo.title}
        onChange={e => { this.todo.title = e.target.value }}
        onKeyUp={this.handleKeyUp}
        onBlur={e => store.doneEdit(this.todo)} />
    </li>
  }
}

class Main extends Component {
  render () {
    const store = this.props.store
    const todos = store.todos
    if (todos.length === 0) {
      return ''
    }
    return <section className='main'>
      <input id='toggle-all' className='toggle-all' type='checkbox' checked={store.allDone} onChange={e => store.toggleAll()} />
      <label htmlFor='toggle-all'>Mark all as complete</label>
      <ul className='todo-list'>
        {store.visibleTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    </section>
  }
}

class Footer extends Component {
  render () {
    const store = this.props.store
    const todos = store.todos
    if (todos.length === 0) {
      return ''
    }
    return <footer className='footer'>
      <span className='todo-count'>
        <strong>{pluralize('item', store.left, true)}</strong> left
      </span>
      <ul className='filters'>
        <li><a href='#/all' className={classNames({ selected: store.show === 'All' })}>All</a></li>
        <li><a href='#/active' className={classNames({ selected: store.show === 'Active' })}>Active</a></li>
        <li><a href='#/completed' className={classNames({ selected: store.show === 'Completed' })}>Completed</a></li>
      </ul>
      {store.done > 0 ? <button className='clear-completed' onClick={e => store.clearCompleted()}>Clear completed</button> : ''}
    </footer>
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
    this.todos = this.store.todos
    this.handleEnter = this.handleEnter.bind(this)
  }
  handleEnter (e) {
    if (e.key !== 'Enter') {
      return
    }
    const title = e.target.value.trim()
    if (title === '') {
      return
    }
    e.target.value = ''
    this.todos.push(Todo.create({ title }))
  }
  render () {
    return <>
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input className='new-todo' autoFocus autoComplete='off' placeholder='What needs to be done?' onKeyUp={this.handleEnter} />
        </header>
        <Main store={store} />
        <Footer store={store} />
      </section>,
      <footer className='info'>
        <p>Double-click to edit a todo</p>
        <p>Written by <a href='https://github.com/tylerlong'>Tyler Long</a></p>
        <p><a href='https://github.com/tylerlong/subx-demo-todomvc'>Source code</a> available</p>
      </footer>
    </>
  }
}

ReactDOM.render(<App store={store} />, document.getElementById('container'))
