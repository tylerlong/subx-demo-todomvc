import React from 'react'
import ReactDOM from 'react-dom'

import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

class App extends React.Component {
  render () {
    return <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <input className='new-todo' autoFocus autoComplete='off' placeholder='What needs to be done?' />
      </header>
      <section className='main'>
        <input id='toggle-all' className='toggle-all' type='checkbox' />
        <label for='toggle-all'>Mark all as complete</label>
        <ul className='todo-list'>
          <li className='todo'>
            <div className='view'>
              <input className='toggle' type='checkbox' />
              <label>todo.title</label>
              <button className='destroy' />
            </div>
            <input className='edit' type='text' />
          </li>
        </ul>
      </section>
    </section>
  }
}

ReactDOM.render(<App />, document.getElementById('container'))
