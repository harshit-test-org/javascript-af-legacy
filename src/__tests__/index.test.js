/* eslint-env jest */
import React from 'react'
import { render } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import Index from '../routes/Index'
import store from '../redux/store'

describe('<Index />', () => {
  it('should render without creashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </Provider>
    )
  })
})
