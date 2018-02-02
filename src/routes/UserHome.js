import React, { Component } from 'react'
import Layout from '../components/UserLayout'

class Index extends Component {
  render () {
    const links = [
      {
        name: 'Projects',
        href: '/projects'
      },
      {
        name: 'Feed',
        href: '/feed'
      }
    ]
    return <Layout links={links} />
  }
}

export default Index
