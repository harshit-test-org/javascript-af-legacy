import React from 'react'
import { render, Simulate } from 'react-testing-library'
import SnackBar from '../components/SnackBar'

describe('SnackBar', () => {
  const actionClick = jest.fn()
  const fullComp = <SnackBar message="test message" actionText="action" actionClick={actionClick} />
  const noActionComp = <SnackBar message="test message" />

  jest.useFakeTimers()
  test('should not automatically hide when there is an action', () => {
    const { container } = render(fullComp)
    jest.runAllTimers()
    const postTimerDisplay = document.defaultView
      .getComputedStyle(container.firstChild, null)
      .getPropertyValue('display')
    expect(setTimeout).not.toBeCalled()
    expect(postTimerDisplay).not.toBe('none')
  })

  test('should render with text and action (Snapshot)', () => {
    const { container } = render(fullComp)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should call onClick when action is clicked', () => {
    const { getByText } = render(fullComp)
    Simulate.click(getByText('action'))
    expect(actionClick).toBeCalled()
  })

  test('should render without action', () => {
    const { queryByText } = render(noActionComp)
    expect(queryByText('action')).toBeNull()
  })

  jest.useFakeTimers()
  test('should change display based on timeout', async () => {
    const timeout = 2000
    const { container } = render(<SnackBar message="test message" timeout={timeout} />)

    // get CSS display prop before timer runs
    const preTimerDisplay = document.defaultView
      .getComputedStyle(container.firstChild, null)
      .getPropertyValue('display')
    expect(preTimerDisplay).not.toBe('none')

    // get CSS display prop during timer run
    jest.advanceTimersByTime(timeout - 1)
    const duringTimerDisplay = document.defaultView
      .getComputedStyle(container.firstChild, null)
      .getPropertyValue('display')
    expect(duringTimerDisplay).not.toBe('none')

    // get CSS display prop after timer run
    jest.runOnlyPendingTimers()
    const postTimerDisplay = document.defaultView
      .getComputedStyle(container.firstChild, null)
      .getPropertyValue('display')
    expect(postTimerDisplay).toBe('none')
  })
})
