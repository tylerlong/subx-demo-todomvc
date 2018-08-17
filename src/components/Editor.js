import React from 'react'

class Editor extends React.Component {
  render () {
    const { store } = this.props
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea'
          value={store.text} onChange={e => { store.text = e.target.value }} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: store.html }} />
      </div>
    )
  }
}

export default Editor
