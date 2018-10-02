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
    </section>
  }
}

ReactDOM.render(<App />, document.getElementById('container'))
