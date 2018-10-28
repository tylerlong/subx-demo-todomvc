/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import delay from 'timeout-as-promise'
import * as R from 'ramda'

import { App, TodoItem } from '../src/components'
import store from '../src/store'

store.add('111')
store.add('222')
store.add('333')

describe('remove todo', () => {
  test('default', async () => {
    let renders = []
    global.render$.subscribe(event => renders.push(event))

    expect(store.todos.length).toBe(3)
    const renderer = TestRenderer.create(<App store={store} />)
    const secondItem = renderer.root.findAllByType(TodoItem)[1]
    const removeButton = secondItem.find(el => el.type === 'button')
    renders = []
    removeButton.props.onClick()
    expect(store.todos.length).toBe(2)
    await delay(15)
    expect(renders).toEqual(['Footer', 'Body'])
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([
      {
        title: '111',
        completed: false
      },
      {
        title: '333',
        completed: false
      }
    ])

    renders = []
    renderer.root.findAllByType(TodoItem)[1].find(el => el.type === 'button').props.onClick() // remove button for 2nd todo
    expect(store.todos.length).toBe(1)
    await delay(15)
    expect(renders).toEqual(['Footer', 'Body'])
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([
      {
        title: '111',
        completed: false
      }
    ])

    renders = []
    store.todos.pop()
    expect(store.todos.length).toBe(0)
    await delay(15)
    expect(renders).toEqual(['Body', 'Footer'])
  })
})
