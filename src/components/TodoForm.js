import React from 'react'

class TodoForm extends React.Component {
  render () {
    return <div>
      <input ref={input => { this.input = input }} />
      <button onClick={e => this.buttonClicked(e)}>Add</button>
    </div>
  }

  buttonClicked (e) {
    const text = this.input.value.trim()
    if (text.length > 0) {
      this.props.addTodo(this.input.value)
      this.input.value = ''
    }
  }
}

export default TodoForm
