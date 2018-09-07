import React from 'react'

class TodoItem extends React.Component {
  componentWillMount () {
    this.todo = this.props.todo
    this.doneSubscription = this.todo.done$.subscribe(this.forceUpdate())
  }
  componentWillUnmount () {
    this.doneSubscription.unsubscribe()
  }
  render () {
    return <li>
      <input type='checkbox' checked={this.todo.done} onChange={e => { this.todo.done = e.target.checked }} />
      {this.todo.text}
    </li>
  }
}

export default TodoItem
