import React from 'react'
import ReactDOM from 'react-dom'

import 'todomvc-app-css/index.css'

class App extends React.Component {
  render () {
    return <div>
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input className='new-todo' autoFocus autoComplete='off' placeholder='What needs to be done?' />
        </header>
        <section className='main'>
          <input id='toggle-all' className='toggle-all' type='checkbox' />
          <label htmlFor='toggle-all'>Mark all as complete</label>
          <ul className='todo-list'>
            <li className='todo'>
              <div className='view'>
                <input className='toggle' type='checkbox' />
                <label>todo.title 1</label>
                <button className='destroy' />
              </div>
              <div className='view'>
                <input className='toggle' type='checkbox' />
                <label>todo.title 2</label>
                <button className='destroy' />
              </div>
              <input className='edit' type='text' />
            </li>
          </ul>
        </section>
        <footer className='footer'>
          <span className='todo-count'>
            <strong>2</strong> items left
          </span>
          <ul className='filters'>
            <li><a href='#/all'>All</a></li>
            <li><a href='#/active'>Active</a></li>
            <li><a href='#/completed'>Completed</a></li>
          </ul>
          <button className='clear-completed'>
          Clear completed
          </button>
        </footer>
      </section>,
      <footer className='info'>
        <p>Double-click to edit a todo</p>
        <p>Written by <a href='https://github.com/tylerlong'>Tyler Long</a></p>
        <p><a href='https://github.com/tylerlong/subx-demo-todomvc'>Source code</a> available</p>
      </footer>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('container'))
