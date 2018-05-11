/* eslint-env jest */
import React from 'react'
import { render, Simulate } from 'react-testing-library'
import FabButton from '../components/FabButton'

describe('FabButton', () => {
  const mock = jest.fn()
  const comp = (
    <FabButton
      onClick={() => {
        mock()
      }}
    />
  )
  test('it should render properly (snapshot)', () => {
    expect(render(comp).container.firstChild).toMatchSnapshot()
  })

  test('it should call onClick when passed to it', () => {
    Simulate.click(render(comp).container.firstChild)
    expect(mock).toBeCalled()
  })
})
