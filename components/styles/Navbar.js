import React from 'react'
import styled from 'styled-components'

const Nav = styled.div`
  z-index: 120;
  position: fixed;
  top: 0;
  margin-left: 80px;
  height: 72px;
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  box-shadow: 17px 0px 10px 9px rgba(0, 0, 0, 0.2);
  @media all and (max-width: 570px) {
    margin-left: auto;
  }
`

const Navbar = ({ title }) => (
  <Nav>
    <h1>{title}</h1>
  </Nav>
)

export default Navbar
