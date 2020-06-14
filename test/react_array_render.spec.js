/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import * as R from 'ramda'

let renders = []

describe('react array render', () => {
  test('default', async () => {
    class App extends React.Component {
      constructor (props) {
        super(props)
        this.state = {
          todos: [
            { title: '111', completed: false },
            { title: '222', completed: false },
            { title: '333', completed: false }
          ]
        }
      }

      render () {
        renders.push('App')
        return (
          <>
            <ul>{this.state.todos.map(todo => <TodoItem todo={todo} key={todo.title} />)}</ul>
            <button onClick={e => {
              this.setState({ todos: R.tail(this.state.todos) })
            }}
            >Remove first
            </button>
          </>
        )
      }
    }

    class TodoItem extends React.Component {
      render () {
        renders.push('TodoItem')
        return this.props.todo.title
      }

      shouldComponentUpdate (nextProps, nextState) {
        return this.props.todo.title !== nextProps.todo.title
      }
    }

    const renderer = TestRenderer.create(<App />)
    const button = renderer.root.find(el => el.type === 'button')
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem', 'TodoItem'])

    renders = []
    button.props.onClick()
    expect(renders).toEqual(['App']) // it doesn't render two remaining TodoItems again.
  })

  test('without shouldComponentUpdate', async () => {
    class App extends React.Component {
      constructor (props) {
        super(props)
        this.state = {
          todos: [
            { title: '111', completed: false },
            { title: '222', completed: false },
            { title: '333', completed: false }
          ]
        }
      }

      render () {
        renders.push('App')
        return (
          <>
            <ul>{this.state.todos.map(todo => <TodoItem todo={todo} key={todo.title} />)}</ul>
            <button onClick={e => {
              this.setState({ todos: R.tail(this.state.todos) })
            }}
            >Remove first
            </button>
          </>
        )
      }
    }

    class TodoItem extends React.Component {
      render () {
        renders.push('TodoItem')
        return this.props.todo.title
      }
    }

    renders = []
    const renderer = TestRenderer.create(<App />)
    const button = renderer.root.find(el => el.type === 'button')
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem', 'TodoItem'])

    renders = []
    button.props.onClick()
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem']) // it DOES render two remaining TodoItems again.
  })
})
