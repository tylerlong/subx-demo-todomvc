import React from 'react'
import ReactDOM from 'react-dom'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import MarkdownIt from 'markdown-it'

import Editor from './components/Editor'

const mdi = new MarkdownIt()

class Store extends Subject {
  set text (val) {
    this._text = val
    this.next(val)
  }
  get text () {
    return this._text
  }
}
const store = new Store()

const render = () => {
  ReactDOM.render((<div>
    <Editor store={store} />
  </div>), document.getElementById('root'))
}

render()

store.subscribe(render)

store.pipe(
  debounceTime(1000)
).subscribe(val => {
  store.html = mdi.render(val)
  render()
})
