import React from 'react'
import { debounceTime, map } from 'rxjs/operators'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.textChanged = this.textChanged.bind(this)
    this.htmlChanged = this.htmlChanged.bind(this)
    this.article = props.article
    this.state = {
      text: this.article.text,
      html: this.article.html()
    }
    this.text$ = this.article.text$.pipe(map(() => this.article.text))
    this.html$ = this.article.text$.pipe(debounceTime(1000), map(() => this.article.html()))
  }
  textChanged (text) {
    this.setState({ text })
  }
  htmlChanged (html) {
    this.setState({ html })
  }
  componentDidMount () {
    this.text$.subscribe(this.textChanged)
    this.html$.subscribe(this.htmlChanged)
  }
  componentWillUnmount () {
    this.text$.unsubscribe(this.textChanged)
    this.html$.unsubscribe(this.htmlChanged)
  }
  render () {
    console.log('render')
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea'
          value={this.state.text} onChange={e => { this.article.text = e.target.value }} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </div>
    )
  }
}

export default Editor
