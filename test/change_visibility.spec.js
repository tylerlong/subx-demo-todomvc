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
    global.renders = []
    const renderer = TestRenderer.create(<App store={store} />)
    expect(renderer).toBeDefined()
    expect(global.renders).toEqual(['App', 'Body', 'TodoItem', 'TodoItem', 'TodoItem', 'Footer'])

    global.renders = []
    store.visibility = 'active'
    expect(global.renders).toEqual(['Footer'])
    expect(store.todos.length).toBe(store.todos.filter(todo => !todo.completed).length)
    expect(store.todos).not.toBe(store.todos.filter(todo => !todo.completed))
    expect(store.todos).toEqual(store.todos.filter(todo => !todo.completed))

    global.renders = []
    store.visibility = 'all'
    expect(global.renders).toEqual(['Footer'])

    global.renders = []
    store.visibility = 'completed'
    expect(global.renders).toEqual(['Body', 'Footer'])

    global.renders = []
    store.visibility = 'completed'
    expect(global.renders).toEqual([])

    global.renders = []
    store.visibility = 'active'
    expect(global.renders).toEqual(['Body', 'TodoItem', 'TodoItem', 'TodoItem', 'Footer'])
  })
})
