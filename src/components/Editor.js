import React from 'react'

class Editor extends React.Component {
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
