import React from 'react'
import ReactDOM from 'react-dom'
import { debounceTime } from 'rxjs/operators'
import { Router } from 'director/build/director'
import 'todomvc-app-css/index.css'
import SubX from 'subx'

import store from './store'
import { App } from './components'

const router = new Router({
  '/all': () => { store.visibility = 'all' },
  '/active': () => { store.visibility = 'active' },
  '/completed': () => { store.visibility = 'completed' }
})
router.init()

const savedTodos = global.localStorage.getItem('todomvc-subx-todos')
if (savedTodos) {
  store.todos = JSON.parse(savedTodos)
}
SubX.autoRun(store, () => global.localStorage.setItem('todomvc-subx-todos', JSON.stringify(store.todos)), debounceTime(1000))

ReactDOM.render(<App store={store} />, document.getElementById('container'))
