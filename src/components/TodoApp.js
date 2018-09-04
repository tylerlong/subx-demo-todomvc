import React from 'react'

class TodoApp extends React.Component {
  constructor (props) {
    super(props)
    this.article = props.article
    this.state = {
    }
    this.propsChanged = () => this.forceUpdate()
  }
  componentDidMount () {
    this.article.text$.subscribe(this.propsChanged)
  }
  componentWillUnmount () {
    this.article.text$.unsubscribe(this.propsChanged)
  }
  render () {
    console.log('render')
    return (
      <div>
        Todo App
      </div>
    )
  }
}

export default TodoApp
