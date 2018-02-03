/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Sidemenu from '../../components/Sidemenu'

describe('<Sidebar />', () => {
  it('should have five links', () => {
    const result = shallow(<Sidemenu />)
    const length = result.find('a')
    expect(length).toHaveLength(5)
  })
  it('should have proper hrefs', () => {
    const result = shallow(<Sidemenu />)
    const links = result.find('a')
    const hrefs = ['/', '/search', '/work', '/social', '/profile']
    let index = 0
    links.forEach(link => {
      expect(link.prop('href')).toBe(hrefs[index])
      index++
    })
  })
})
