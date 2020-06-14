import React from 'react'
import { Component } from 'react-subx'
import classNames from 'classnames'
import pluralize from 'pluralize'
import ReactDOM from 'react-dom'

/* DEV-START */
import { Subject } from 'rxjs'
const render$ = new Subject()
global.render$ = render$
/* DEV-END */

export class App extends Component {
  render () {
    /* DEV-START */
    this.name = 'App'
    render$.next(this.name)
    /* DEV-END */
    const store = this.props.store
    return (
      <>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <input
              className='new-todo' autoFocus autoComplete='off' placeholder='What needs to be done?' onKeyUp={e => {
                if (e.key === 'Enter') {
                  store.add(e.target.value)
                  e.target.value = ''
                }
              }}
            />
          </header>
          <Body store={store} />
          <Footer store={store} />
        </section>
        <footer className='info'>
          <p>Double-click to edit a todo</p>
          <p>Written by <a href='https://github.com/tylerlong'>Tyler Long</a></p>
          <p><a href='https://github.com/tylerlong/subx-demo-todomvc'>Source code</a> available</p>
        </footer>
      </>
    )
  }
}

export class Body extends Component {
  render () {
    /* DEV-START */
    this.name = 'Body'
    render$.next(this.name)
    /* DEV-END */
    const store = this.props.store
    if (store.todos.length === 0) {
      return ''
    }
    return (
      <section className='main'>
        <input id='toggle-all' className='toggle-all' type='checkbox' checked={store.areAllDone} onChange={e => store.toggleAll()} />
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul className='todo-list'>
          {store.visibleTodos.map(todo => <TodoItem store={store} todo={todo} key={todo.id} />)}
        </ul>
      </section>
    )
  }
}

export class TodoItem extends Component {
  render () {
    /* DEV-START */
    this.name = 'TodoItem'
    render$.next(this.name)
    /* DEV-END */
    const { store, todo } = this.props
    return (
      <li className={classNames('todo', { completed: todo.completed, editing: todo.cache })}>
        <div className='view'>
          <input className='toggle' type='checkbox' checked={todo.completed} onChange={e => { todo.completed = e.target.checked }} />
          <label onDoubleClick={e => {
            store.edit(todo)
            setTimeout(() => ReactDOM.findDOMNode(this.refs.editField).focus(), 10)
          }}
          >{todo.title}
          </label>
          <button className='destroy' onClick={e => store.remove(todo)} />
        </div>
        <input
          ref='editField' className='edit' type='text' value={todo.title}
          onChange={e => { todo.title = e.target.value }}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              store.doneEdit(todo)
            } else if (e.key === 'Escape') {
              store.cancelEdit(todo)
            }
          }}
          onBlur={e => store.doneEdit(todo)}
        />
      </li>
    )
  }
}

export class Footer extends Component {
  render () {
    /* DEV-START */
    this.name = 'Footer'
    render$.next(this.name)
    /* DEV-END */
    const store = this.props.store
    if (store.todos.length === 0) {
      return ''
    }
    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{pluralize('item', store.leftCount, true)}</strong> left
        </span>
        <ul className='filters'>
          <li><a href='#/all' className={classNames({ selected: store.visibility === 'all' })}>All</a></li>
          <li><a href='#/active' className={classNames({ selected: store.visibility === 'active' })}>Active</a></li>
          <li><a href='#/completed' className={classNames({ selected: store.visibility === 'completed' })}>Completed</a></li>
        </ul>
        {store.doneCount > 0 ? <button className='clear-completed' onClick={e => store.clearCompleted()}>Clear completed</button> : ''}
      </footer>
    )
  }
}
