import React from 'react'

class MarkdownEditor extends React.Component {
  render () {
    const { article } = this.props
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea' value={article.text} onChange={e => { article.text = e.target.value }} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: article.html }} />
      </div>
    )
  }
}

export default MarkdownEditor
