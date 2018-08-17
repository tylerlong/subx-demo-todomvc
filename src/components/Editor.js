import React from 'react'

class Editor extends React.Component {
  render () {
    const { text, html, onTextChange } = this.props
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea'
          value={text} onChange={e => onTextChange(e.target.value)} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
  }
}

export default Editor
