/* eslint-env jest */
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Router from '../routes/router'
import store from '../redux/store'

describe('<Router />', () => {
  it('should mount without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Router />
        </MemoryRouter>
      </Provider>
    )
  })
  it('should mount without crashing on user home', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/user/home']}>
          <Router />
        </MemoryRouter>
      </Provider>
    )
  })
  // TODO: Check navigation
})
