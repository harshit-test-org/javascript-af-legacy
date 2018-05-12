import React from 'react'
import { render, Simulate } from 'react-testing-library'
import SnackBar from '../components/SnackBar'

describe('SnackBar', () => {
  const actionClick = jest.fn()
  const fullComp = <SnackBar message="test message" actionText="action" actionClick={actionClick} />
  const noActionComp = <SnackBar message="test message" />
  test('should render with text and action (Snapshot)', () => {
    const wrapper = render(fullComp)
    expect(wrapper.container.firstChild).toMatchSnapshot()
  })
  test('should call onClick when action is clicked', () => {
    Simulate.click(render(fullComp).getByText('action'))
    expect(actionClick).toBeCalled()
  })
  test('should render without action', () => {
    const { container } = render(noActionComp)
    expect(container.firstChild.querySelector('a')).toBeNull()
  })
})
