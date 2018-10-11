/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import SubX from 'subx'
import { Component } from 'react-subx'
import delay from 'timeout-as-promise'

const store = SubX.create({
  todos: [
    { title: '111', completed: false },
    { title: '222', completed: false },
    { title: '333', completed: false }
  ],
  removeFirst () {
    this.todos.shift()
  }
})

class App extends Component {
  render () {
    renders.push('App')
    return <>
      <ul>{this.props.store.todos.map(todo => <TodoItem todo={todo} key={todo.title} />)}</ul>
      <button onClick={e => {
        this.props.store.removeFirst()
      }}>Remove first</button>
    </>
  }
}

class TodoItem extends React.Component {
  render () {
    renders.push('TodoItem')
    return this.props.todo.title
  }
}

let renders = []

describe('react array render', () => {
  test('default', async () => {
    const renderer = TestRenderer.create(<App store={store} />)
    const button = renderer.root.find(el => el.type === 'button')
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem', 'TodoItem'])

    renders = []
    button.props.onClick()
    await delay(15)
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem']) // it DOES render two remaining TodoItems again.
  })
})
