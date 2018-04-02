import React from 'react'
import Footer from './styles/Footer'

export default class Foot extends React.Component {
  render () {
    const links = [
      {
        name: 'About',
        href: '/about'
      },
      {
        name: 'Team',
        href: '/team'
      },
      // {
      //   name: 'Jobs',
      //   href: '/jobs'
      // },
      {
        name: 'Terms',
        href: '/terms'
      },
      {
        name: 'Privacy Policy',
        href: '/privacy'
      }
    ]

    return (
      <Footer>
        {links.map(item => (
          <a href={item.href} key={`footer-link-${item.name}`}>
            {item.name}
          </a>
        ))}
      </Footer>
    )
  }
}
