import React from 'react'
import TodoItem from './TodoItem'

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.todos = props.todos
    this.propsChanged = () => this.forceUpdate()
  }
  componentDidMount () {
    this.todos.todos$.subscribe(this.propsChanged)
  }
  componentWillUnmount () {
    this.todos.todos$.unsubscribe(this.propsChanged)
  }
  render () {
    console.log('render')
    return <ul>
      { this.todos.todos.map(todo => <TodoItem todo={todo} key={todo.id} />) }
    </ul>
  }
}

export default TodoList
