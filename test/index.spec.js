/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import * as R from 'ramda'

import { App } from '../src/components'
import store from '../src/store'

describe('default', () => {
  test('create todos', () => {
    const renderer = TestRenderer.create(<App store={store} />)
    expect(renderer).toBeDefined()
    expect(store.todos).toEqual([])

    const input = renderer.root.find(el => el.type === 'input' && el.props.className === 'new-todo')
    input.props.onKeyUp({ key: 'Enter', target: { value: '111' } })
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([{ title: '111', completed: false }])
    input.props.onKeyUp({ key: 'Enter', target: { value: '222' } })
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([
      { title: '111', completed: false },
      { title: '222', completed: false }
    ])

    input.props.onKeyUp({ key: 'Enter', target: { value: '333' } })
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([
      { title: '111', completed: false },
      { title: '222', completed: false },
      { title: '333', completed: false }
    ])

    input.props.onKeyUp({ key: 'Enter', target: { value: '444' } })
    input.props.onKeyUp({ key: 'Enter', target: { value: '555' } })
    expect(R.map(R.dissoc('id'), store.todos)).toEqual([
      { title: '111', completed: false },
      { title: '222', completed: false },
      { title: '333', completed: false },
      { title: '444', completed: false },
      { title: '555', completed: false }
    ])
  })
})
