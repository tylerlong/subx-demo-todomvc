/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import { App } from '../src/components'
import store from '../src/store'

describe('default', () => {
  test('default', () => {
    const renderer = TestRenderer.create(<App store={store} />)
    expect(renderer).toBeDefined()
  })
})
