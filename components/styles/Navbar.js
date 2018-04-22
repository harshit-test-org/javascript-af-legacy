import React from 'react'
import styled from 'styled-components'
import SearchIcon from '../../assets/icons/search'

const Nav = styled.div`
  z-index: 120;
  position: fixed;
  margin-left: 80px;
  top: 0;
  height: 72px;
  width: 100%;
  background: #ffffff;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding-left: 1rem;
  box-shadow: 17px 0px 10px 9px rgba(0, 0, 0, 0.2);
  @media all and (max-width: 570px) {
    padding-left: 1rem;
    position: absolute;
    margin-left: auto;
    height: 50px;
  }
  h1 {
    grid-column: 1 / 2;
    font-size: x-large;
  }
  @media all and (max-width: 990px) {
    grid-template-columns: 1fr;
    h1 {
      font-size: 32px;
    }
  }
`

const Search = styled.input`
  background: transparent;
  width: 100%;
  color: #212121;
  font-size: 16px;
  outline: none;
  font-family: Roboto, sans-serif;
  border: none;
  margin-left: 0.25rem;
`

const SearchContainer = styled.div`
  background: rgb(240, 240, 240);
  transition: all 0.3s ease;
  border-radius: 30px;
  grid-column: 2 / 3;
  padding: 0.5rem;
  &:focus-within {
    border-radius: 0;
  }
  @media all and (max-width: 990px) {
    display: none;
  }
  margin-right: 1rem;
  display: inline-flex;
  svg {
    width: 26px;
    height: 26px;
    fill: rgba(0, 0, 0, 0.67);
  }
`

const Navbar = ({ title }) => (
  <Nav>
    <h1>{title}</h1>
    <SearchContainer>
      <Search autoCapitalize="off" spellCheck="false" autoCorrect="off" placeholder="Search" autoComplete="off" />
      <SearchIcon />
    </SearchContainer>
  </Nav>
)

export default Navbar
