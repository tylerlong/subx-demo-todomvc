/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import delay from 'timeout-as-promise'

import { App } from '../src/components'
import store from '../src/store'

store.add('111')
store.add('222')
store.add('333')

describe('change visibility', () => {
  test('default', async () => {
    let renders = []
    global.render$.subscribe(event => renders.push(event))

    const renderer = TestRenderer.create(<App store={store} />)
    expect(renderer).toBeDefined()
    expect(renders).toEqual(['App', 'Body', 'TodoItem', 'TodoItem', 'TodoItem', 'Footer'])

    renders = []
    store.visibility = 'active'
    await delay(15)
    expect(renders).toEqual(['Footer'])
    expect(store.todos.length).toBe(store.todos.filter(todo => !todo.completed).length)
    expect(store.todos).not.toBe(store.todos.filter(todo => !todo.completed))
    expect(store.todos).toEqual(store.todos.filter(todo => !todo.completed))

    renders = []
    store.visibility = 'all'
    await delay(15)
    expect(renders).toEqual(['Footer'])

    renders = []
    store.visibility = 'completed'
    await delay(15)
    expect(renders).toEqual(['Body', 'Footer'])

    renders = []
    store.visibility = 'completed'
    await delay(15)
    expect(renders).toEqual([])

    renders = []
    store.visibility = 'active'
    await delay(15)
    expect(renders).toEqual(['Body', 'TodoItem', 'TodoItem', 'TodoItem', 'Footer'])
  })
})
