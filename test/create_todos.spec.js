/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import * as R from 'ramda'
import delay from 'timeout-as-promise'

import { App } from '../src/components'
import store from '../src/store'

describe('create todos', () => {
  test('default', async () => {
    let renders = []
    global.render$.subscribe(event => renders.push(event))

    const renderer = TestRenderer.create(<App store={store} />)
    expect(renderer).toBeDefined()
    expect(store.todos).toEqual([])
    await delay(15)
    expect(renders).toEqual(['App', 'Body', 'Footer'])

    const input = renderer.root.find(el => el.type === 'input' && el.props.className === 'new-todo')

    renders = []
    input.props.onKeyUp({ key: 'Enter', target: { value: '111' } })
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([{ title: '111', completed: false }])
    await delay(15)
    expect(renders).toEqual(['Body', 'TodoItem', 'Footer'])

    renders = []
    input.props.onKeyUp({ key: 'Enter', target: { value: '222' } })
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([
      { title: '111', completed: false },
      { title: '222', completed: false }
    ])
    await delay(15)
    expect(renders).toEqual(['Footer', 'Body', 'TodoItem'])

    renders = []
    input.props.onKeyUp({ key: 'Enter', target: { value: '333' } })
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([
      { title: '111', completed: false },
      { title: '222', completed: false },
      { title: '333', completed: false }
    ])
    await delay(15)
    expect(renders).toEqual(['Footer', 'Body', 'TodoItem'])

    renders = []
    input.props.onKeyUp({ key: 'Enter', target: { value: '444' } })
    input.props.onKeyUp({ key: 'Enter', target: { value: '555' } })
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([
      { title: '111', completed: false },
      { title: '222', completed: false },
      { title: '333', completed: false },
      { title: '444', completed: false },
      { title: '555', completed: false }
    ])
    await delay(15)
    expect(renders).toEqual(['Footer', 'Body', 'TodoItem', 'Footer', 'Body', 'TodoItem'])
  })
})
