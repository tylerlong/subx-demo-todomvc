import React from 'react'

class TodoItem extends React.Component {
  render () {
    const { todo } = this.props
    return <li>{todo.text}</li>
  }
}

export default TodoItem
