import React from 'react'

import TodoItem from './TodoItem'

class TodoList extends React.Component {
  render () {
    const { todos } = this.props
    return <ul>{todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}</ul>
  }
}

export default TodoList
