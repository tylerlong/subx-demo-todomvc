import React from 'react'
import ReactDOM from 'react-dom'
import MarkdownIt from 'markdown-it'

const mdi = new MarkdownIt()

class MarkdownEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { markdown: '' }
  }
  render () {
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea' value={this.state.markdown} onChange={(e) => this.setState({ markdown: e.target.value })} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: mdi.render(this.state.markdown) }} />
      </div>
    )
  }
}

ReactDOM.render(<MarkdownEditor />, document.getElementById('root'))
