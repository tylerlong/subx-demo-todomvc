import React from 'react'

class TodoItem extends React.Component {
  constructor (props) {
    super(props)
    this.todo = this.props.todo
    this.propsChanged = () => this.forceUpdate()
  }
  componentDidMount () {
    this.todo.done$.subscribe(this.propsChanged)
  }
  componentWillUnmount () {
    this.todo.done$.unsubscribe(this.propsChanged)
  }
  render () {
    return <li>
      <input type='checkbox' checked={this.todo.done} onChange={e => { this.todo.done = e.target.checked }} />
      {this.todo.text}
    </li>
  }
}

export default TodoItem
