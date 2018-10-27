/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import delay from 'timeout-as-promise'

import { App, TodoItem } from '../src/components'
import store from '../src/store'

store.add('111')
store.add('222')
store.add('333')

describe('parent', () => {
  test('default', async () => {
    expect(store.todos.length).toBe(3)
    const renderer = TestRenderer.create(<App store={store} />)
    const secondItem = renderer.root.findAllByType(TodoItem)[1]
    const removeButton = secondItem.find(el => el.type === 'button')
    removeButton.props.onClick()
    expect(store.todos.length).toBe(2)

    await delay(15)

    renderer.root.findAllByType(TodoItem).forEach(todoItem => {
      const toggleButton = todoItem.find(el => el.type === 'input' && el.props.className === 'toggle')
      toggleButton.props.onChange({ target: { checked: true } })
    })

    await delay(15)

    const toggleAllButton = renderer.root.find(el => el.props.id === 'toggle-all')
    expect(store.areAllDone).toBeTruthy()
    expect(toggleAllButton.props.checked).toBeTruthy()
  })
})
