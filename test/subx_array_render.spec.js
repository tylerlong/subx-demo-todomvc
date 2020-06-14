/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import SubX from 'subx'
import { Component } from 'react-subx'
import delay from 'timeout-as-promise'

import { App } from '../src/components'
import globalStore from '../src/store'

let store, renders

beforeEach(() => {
  store = SubX.create({
    todos: [
      { title: '111', completed: false },
      { title: '222', completed: false },
      { title: '333', completed: false }
    ],
    removeFirst () {
      this.todos.shift()
    }
  })
  renders = []
})

describe('subx array render', () => {
  test('subx + react', async () => {
    class App extends Component {
      render () {
        renders.push('App')
        this.name = 'App'
        return (
          <>
            <ul>{this.props.store.todos.map(todo => <TodoItem todo={todo} key={todo.title} />)}</ul>
            <button onClick={e => {
              this.props.store.removeFirst()
            }}
            >Remove first
            </button>
          </>
        )
      }
    }

    class TodoItem extends React.Component {
      render () {
        this.name = 'TodoItem'
        renders.push('TodoItem')
        return this.props.todo.title
      }
    }

    const renderer = TestRenderer.create(<App store={store} />)
    const button = renderer.root.find(el => el.type === 'button')
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem', 'TodoItem'])

    renders = []
    button.props.onClick()
    await delay(15)
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem']) // it DOES render two remaining TodoItems again.
  })

  test('subx + react 2', async () => {
    class App extends Component {
      render () {
        renders.push('App')
        this.name = 'App'
        return (
          <>
            <ul>{this.props.store.todos.map(todo => <TodoItem todo={todo} key={todo.title} />)}</ul>
            <button onClick={e => {
              this.props.store.removeFirst()
            }}
            >Remove first
            </button>
          </>
        )
      }
    }

    class TodoItem extends React.Component {
      render () {
        this.name = 'TodoItem'
        renders.push('TodoItem')
        return this.props.todo.title
      }

      shouldComponentUpdate (nextProps, nextState) {
        return this.props.todo.title !== nextProps.todo.title
      }
    }

    const renderer = TestRenderer.create(<App store={store} />)
    const button = renderer.root.find(el => el.type === 'button')
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem', 'TodoItem'])

    renders = []
    button.props.onClick()
    await delay(15)
    expect(renders).toEqual(['App']) // it does NOT render two remaining TodoItems again.
  })

  test('pure subx', async () => {
    class App extends Component {
      render () {
        renders.push('App')
        return (
          <>
            <ul>{this.props.store.todos.map(todo => <TodoItem todo={todo} key={todo.title} />)}</ul>
            <button onClick={e => {
              this.props.store.removeFirst()
            }}
            >Remove first
            </button>
          </>
        )
      }
    }

    class TodoItem extends Component {
      render () {
        renders.push('TodoItem')
        return this.props.todo.title
      }
    }

    const renderer = TestRenderer.create(<App store={store} />)
    const button = renderer.root.find(el => el.type === 'button')
    expect(renders).toEqual(['App', 'TodoItem', 'TodoItem', 'TodoItem'])

    renders = []
    button.props.onClick()
    await delay(15)
    expect(renders).toEqual(['App']) // it does NOT render two remaining TodoItems again.
  })

  test('todomvc', async () => {
    const store = globalStore
    store.add('111')
    store.add('222')
    store.add('333')
    let renders = []
    global.render$.subscribe(event => renders.push(event))
    TestRenderer.create(<App store={store} />)
    expect(renders).toEqual(['App', 'Body', 'TodoItem', 'TodoItem', 'TodoItem', 'Footer'])
    renders = []
    store.todos.shift()
    await delay(15)
    expect(renders).toEqual(['Footer', 'Body']) // it does NOT render two remaining TodoItems again.
  })
})
