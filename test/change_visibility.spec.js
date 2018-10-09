/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'

import { App } from '../src/components'
import store, { Todo } from '../src/store'

store.todos = [
  Todo.create('111'),
  Todo.create('222'),
  Todo.create('333')
]
describe('change visibility', () => {
  test('default', () => {
    let renders = []
    global.render$.subscribe(event => renders.push(event))

    const renderer = TestRenderer.create(<App store={store} />)
    expect(renderer).toBeDefined()
    expect(renders).toEqual(['App', 'Body', 'TodoItem', 'TodoItem', 'TodoItem', 'Footer'])

    renders = []
    store.visibility = 'active'
    expect(renders).toEqual(['Footer'])
    expect(store.todos.length).toBe(store.todos.filter(todo => !todo.completed).length)
    expect(store.todos).not.toBe(store.todos.filter(todo => !todo.completed))
    expect(store.todos).toEqual(store.todos.filter(todo => !todo.completed))

    renders = []
    store.visibility = 'all'
    expect(renders).toEqual(['Footer'])

    renders = []
    store.visibility = 'completed'
    expect(renders).toEqual(['Body', 'Footer'])

    renders = []
    store.visibility = 'completed'
    expect(renders).toEqual([])

    renders = []
    store.visibility = 'active'
    expect(renders).toEqual(['Body', 'TodoItem', 'TodoItem', 'TodoItem', 'Footer'])
  })
})
