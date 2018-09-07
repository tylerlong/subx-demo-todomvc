import React from 'react'
import TodoItem from './TodoItem'

class TodoList extends React.Component {
  componentWillMount () {
    this.todos = this.props.todos
    this.todosSubscription = this.todos.todos$.subscribe(() => this.forceUpdate())
  }
  componentWillUnmount () {
    this.todosSubscription.unsubscribe()
  }
  render () {
    console.log('render')
    return <ul>
      { this.todos.todos.map(todo => <TodoItem todo={todo} key={todo.id} />) }
    </ul>
  }
}

export default TodoList
