import React from 'react'
import styled from 'styled-components'
import Downshift from 'downshift'
import getConfig from 'next/config'
import Router from 'next/router'
import SearchIcon from '../../assets/icons/search'
import { InstantSearch, Highlight } from 'react-instantsearch/dom'
import { connectAutoComplete } from 'react-instantsearch/connectors'
const {
  publicRuntimeConfig: { ALGOLIA_API_KEY, ALGOLIA_APP_ID }
} = getConfig()

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

const SearchItemsDisplay = styled.div`
  position: absolute;
  top: 150%;
  width: 100%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24), inset 0 4px 6px -4px rgba(0, 0, 0, 0.24);
`

const SearchItem = styled.div`
  background: #fff;
  padding: 0.3rem;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
`
const Author = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    border-radius: 50%;
    height: 32px;
    filter: grayscale(60%);
  }
  .ais-Highlight {
    margin-left: 8px;
    padding: 0;
    font-size: 18px;
    color: ${props => props.theme.secondary};
  }
`

function RawAutoComplete({ refine, hits }) {
  return (
    <Downshift
      itemToString={i => (i ? i.name : i)}
      onChange={item => {
        Router.push(`/user/${item._id || item.objectID}`)
      }}
      render={({ getInputProps, getItemProps, selectedItem, highlightedIndex, isOpen }) => (
        <div>
          <Search
            {...getInputProps({
              id: 'autocomplete-input',
              onChange(e) {
                refine(e.target.value)
              }
            })}
            placeholder="Search...."
          />
          {isOpen && (
            <SearchItemsDisplay>
              {hits.map((item, index) => (
                <SearchItem
                  key={item.objectID}
                  {...getItemProps({
                    item,
                    style: {
                      backgroundColor: highlightedIndex === index ? 'rgb(240, 240, 240)' : 'rgb(255, 255, 255)',
                      fontWeight: selectedItem === item ? 'bold' : 'normal'
                    }
                  })}
                >
                  <Author>
                    <img src={`${item.photoURL}&s=40`} alt="" />
                    <Highlight attribute="name" hit={item} tagName="mark" />
                  </Author>
                </SearchItem>
              ))}
            </SearchItemsDisplay>
          )}
        </div>
      )}
    />
  )
}

const AutoCompleteWithData = connectAutoComplete(RawAutoComplete)

const Navbar = ({ title }) => (
  <Nav>
    <h1>{title}</h1>

    <InstantSearch appId={ALGOLIA_APP_ID} apiKey={ALGOLIA_API_KEY} indexName="users">
      <AutoCompleteWithData />
      <SearchIcon />
    </InstantSearch>
    {/* <Search autoCapitalize="off" spellCheck="false" autoCorrect="off" placeholder="Search" autoComplete="off" />
       */}
  </Nav>
)

export default Navbar
