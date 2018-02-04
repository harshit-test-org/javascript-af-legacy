import React, { Component } from 'react'
import Layout from '../components/UserLayout'

class Index extends Component {
  render () {
    const links = [
      {
        name: "Repo's",
        href: '/home/prejects'
      },
      {
        name: 'Feed',
        href: '/home/feed'
      }
    ]
    return <Layout title="Home" links={links} />
  }
}

export default Index
