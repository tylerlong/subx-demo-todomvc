import React from 'react'
import ReactDOM from 'react-dom'
import MarkdownIt from 'markdown-it'
import SubX from 'subx'

import Editor from './components/Editor'

import './index.css'

const mdi = new MarkdownIt()

const Article = SubX({
  text: ''
}).computed({
  html () {
    return mdi.render(this.text)
  }
})
const article = new Article()

ReactDOM.render(<Editor article={article} />, document.getElementById('root'))
