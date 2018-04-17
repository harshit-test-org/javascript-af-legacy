import React, { Component } from 'react'
import Layout from '../components/UserLayout'

class Jobs extends Component {
  render() {
    const links = [
      {
        name: 'Front-end',
        href: '/jobs/front-end',
      },
      {
        name: 'Back-end',
        href: '/jobs/back-end',
      },
      {
        name: 'JavaScript',
        href: '/jobs/javascript',
      },
      {
        name: 'ReactJS',
        href: '/jobs/reactjs',
      },
      {
        name: 'Angular',
        href: '/jobs/angular',
      },
      {
        name: 'PHP',
        href: '/jobs/php',
      },
      {
        name: 'Ruby',
        href: '/jobs/ruby',
      },
      {
        name: 'C/C++',
        href: '/jobs/c',
      },
    ]
    return <Layout title="Home" links={links} />
  }
}
export default Jobs
