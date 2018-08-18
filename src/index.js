import React from 'react'
import ReactDOM from 'react-dom'
import { debounceTime } from 'rxjs/operators'
import MarkdownIt from 'markdown-it'
import SubX from 'subx'

import Editor from './components/Editor'

import './index.css'

const mdi = new MarkdownIt()

const Article = SubX({ text: '' })
const article = new Article()

const render = () => {
  ReactDOM.render((<div>
    <Editor article={article} />
  </div>), document.getElementById('root'))
}

render()

article.pipe(
  debounceTime(1000)
).subscribe(mutation => {
  article.html = mdi.render(mutation.val)
  render()
})
