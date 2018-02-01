/* eslint-env jest */
import React from 'react'
import { render } from 'enzyme'
import Index from '../routes/Index'

describe('<Index />', () => {
  it('should render without creashing', () => {
    render(<Index />)
  })
})
