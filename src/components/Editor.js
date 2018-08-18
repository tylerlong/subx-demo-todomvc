import React from 'react'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.rerender = this.rerender.bind(this)
  }
  rerender () {
    this.setState(this.state)
  }
  componentDidMount () {
    this.props.article.subscribe(this.rerender)
  }
  componentWillUnmount () {
    this.props.article.unsubscribe(this.rerender)
  }
  render () {
    console.log('render')
    const { article } = this.props
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea'
          value={article.text} onChange={e => { article.text = e.target.value }} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: article.html }} />
      </div>
    )
  }
}

export default Editor
