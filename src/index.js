import React from 'react'
import ReactDOM from 'react-dom'

import Article from './models/Article'
import Editor from './components/Editor'

import './index.css'

const article = new Article()

ReactDOM.render(<Editor article={article} />, document.getElementById('root'))
