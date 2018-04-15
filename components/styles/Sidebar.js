import React, { Children } from 'react'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'

const Sidebar = styled.div`
  background: ${props => props.theme.primary};
  box-shadow: 0 6px 10px 6px rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  width: 80px;
  height: 100%;
  top: 0;
  @media all and (max-width: 570px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    bottom: 0;
    top: auto;
    left: auto;
    height: 70px;
    z-index: 60;
    width: 100%;
  }
`
export default Sidebar

const NavA = styled.a`
  display: flex;
  padding: 20% 0 20% 0;
  justify-content: center;
  transition: all 0.2s ease;
  & > svg {
    transition: all 0.2s ease;
  }
  &.active {
    background: #f1f1f1;
  }
  &:hover {
    background: #ffffff;
  }
  &.active > svg,
  &:hover > svg {
    fill: ${props => props.theme.primaryDark};
  }
  &:hover > svg {
    width: 50px;
    height: 50px;
  }
  @media all and (max-width: 570px) {
    padding: 0;
    flex: 1;
    align-items: center;
  }
`

export const NavIcon = ({ children, active, ...props }) => (
  <ActiveLink prefetch {...props} passHref activeClassName>
    <NavA>{children}</NavA>
  </ActiveLink>
)

const ActiveLink = withRouter(({ router, children, ...props }) => {
  const child = Children.only(children)
  let className = child.props.className || null
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ''} active`.trim()
  }

  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
})
