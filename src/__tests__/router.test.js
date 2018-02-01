/* eslint-env jest */
import React from 'react'
import { render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Router from '../routes/router'

describe('<Router />', () => {
  it('should render without crashing', () => {
    render(
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    )
  })
  it('should render without crashing on user home', () => {
    render(
      <MemoryRouter initialEntries={['/user/home']}>
        <Router />
      </MemoryRouter>
    )
  })
  // TODO: Check navigation
})
