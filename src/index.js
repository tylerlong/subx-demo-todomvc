import React from 'react'
import ReactDOM from 'react-dom'
import MarkdownEditor from './components/MarkdownEditor'
import Article from './models/Article'

const article = new Article()

const render = () => {
  ReactDOM.render(<MarkdownEditor article={article} />, document.getElementById('root'))
}

render()

article.on('textChanged', render)
