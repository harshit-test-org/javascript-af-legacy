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
      {
        name: 'Jobs',
        href: '/jobs'
      },
      {
        name: 'Terms',
        href: '/terms'
      },
      {
        name: 'Privacy Policy',
        href: '/privacy'
      }
    ]
    const creators = [
      {
        name: 'Jesse',
        href: 'https://www.instagram.com/jesse.weigel/'
      },
      {
        name: 'Jvscrpt.r',
        href: 'https://www.instagram.com/jvscrptr/'
      },
      // There is a reason for me doing this just trust me you'll see later on
      /*{
        name: 'Harshit',
        href: 'https://www.instagram.com/pantharshit00/'
      }*/
    ]
    return (
      <Footer>
        <p>
          Made with <span id="heart">&#9829;</span> by{' '}
          {creators.map((item, i) => (
            <React.Fragment key={`creator-${item.name}`}>
              <a href={item.href} id="name">
                {item.name}
              </a>
              {i === creators.length - 2
                ? ' and '
                : i === creators.length - 1 ? '' : ' ,'}
            </React.Fragment>
          ))}
        </p>
        {links.map(item => (
          <a href={item.href} key={`footer-link-${item.name}`}>
            {item.name}
          </a>
        ))}
      </Footer>
    )
  }
}
