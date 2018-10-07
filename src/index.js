import React from 'react'
import ReactDOM from 'react-dom'
import { filter, debounceTime } from 'rxjs/operators'
import { Router } from 'director/build/director'
import * as R from 'ramda'
import 'todomvc-app-css/index.css'

import store from './store'
import { App } from './components'

const router = new Router({
  '/all': () => { store.visibility = 'all' },
  '/active': () => { store.visibility = 'active' },
  '/completed': () => { store.visibility = 'completed' }
})
router.init()

store.$.pipe(
  filter(event => R.startsWith(['todos'], event.path)),
  debounceTime(100)
).subscribe(event => global.localStorage.setItem('todomvc-subx-todos', JSON.stringify(store.todos)))

const savedTodos = global.localStorage.getItem('todomvc-subx-todos')
if (savedTodos) {
  store.todos = JSON.parse(savedTodos)
}

ReactDOM.render(<App store={store} />, document.getElementById('container'))
