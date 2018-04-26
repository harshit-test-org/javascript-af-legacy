import React from 'react'
import styled from 'styled-components'
import Downshift from 'downshift'
import getConfig from 'next/config'
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
`

function RawAutoComplete({ refine, hits }) {
  return (
    <Downshift
      itemToString={i => (i ? i.name : i)}
      defaultIsOpen={true}
      onChange={item => alert(JSON.stringify(item))}
      render={({ getInputProps, getItemProps, selectedItem, highlightedIndex, isOpen }) => (
        <div>
          <Search
            {...getInputProps({
              onChange(e) {
                refine(e.target.value)
              }
            })}
            placeholder="Search...."
          />
          {isOpen && (
            <SearchItemsDisplay>
              {hits.map((item, index) => (
                <div
                  key={item.objectID}
                  {...getItemProps({
                    item,
                    style: {
                      backgroundColor: highlightedIndex === index ? 'gray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal'
                    }
                  })}
                >
                  <Highlight attribute="name" hit={item} tagName="mark" />
                </div>
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

    <InstantSearch appId={ALGOLIA_APP_ID} apiKey={ALGOLIA_API_KEY} indexName="repos">
      <AutoCompleteWithData />
      <SearchIcon />
    </InstantSearch>
    {/* <Search autoCapitalize="off" spellCheck="false" autoCorrect="off" placeholder="Search" autoComplete="off" />
       */}
  </Nav>
)

export default Navbar
