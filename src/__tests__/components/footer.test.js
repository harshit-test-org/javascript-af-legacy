/* eslint-env jest */
import React from 'react'
import render from 'react-test-renderer'
import Footer from '../../components/Footer'

describe('<Footer />', () => {
  it('should render correctly', () => {
    const tree = render.create(<Footer />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
