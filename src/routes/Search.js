import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { InstantSearch, PoweredBy, Highlight } from 'react-instantsearch/dom'
import {
  connectSearchBox,
  connectInfiniteHits
} from 'react-instantsearch/connectors'
import Layout from '../components/UserLayout'
import styled from 'styled-components'

const SearchContainer = styled.div`
  padding: 0 15%;
  @media all and (max-width: 570px) {
    padding: 0;
  }
`

const SearchInput = styled.input`
  width: 100%;
  margin-bottom: 2rem;
  font-family: 'Quicksand', sans-serif;
  height: 38px;
  font-weight: 600;
  padding: 0 0.7rem;
  border-radius: 5px;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, 0.37);
  font-size: 20px;
  @media all and (max-width: 570px) {
    width: 90%;
    font-size: 1rem;
  }
`

function SearchBox ({ currentRefinement, refine }) {
  return (
    <SearchInput
      value={currentRefinement}
      onChange={e => refine(e.target.value)}
      autoFocus
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      type="text"
      placeholder="Search for people or repository"
      spellCheck="false"
    />
  )
}

const ConnectedSearch = connectSearchBox(SearchBox)

function CustomHits ({ hits, hasMore, refine }) {
  return (
    <Fragment>
      {hits.map(hit => <Hit item={hit} key={hit.objectID} />)}
      {hasMore && <button onClick={() => refine()}>Load More</button>}
    </Fragment>
  )
}

const SearchLink = styled(Link)`
  color: #000;
  text-decoration: none;
`

const ConnectedHits = connectInfiniteHits(CustomHits)

const Hit = ({ item }) => {
  return (
    <SearchLink to={`/user/${item.objectID}`}>
      <ResultCard>
        <div className="image">
          <img src={item.photoURL} alt={item.name} />
        </div>
        <div className="info">
          <h1>
            <Highlight attribute="name" hit={item} />
          </h1>
          <p>{item.bio}</p>
        </div>
      </ResultCard>
    </SearchLink>
  )
}

const ResultCard = styled.div`
  height: auto;
  background: #fff;
  width: 90%;
  padding: 0.5rem 0.7rem;
  display: flex;
  margin-bottom: 1rem;
  .image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    height: 100px;
    width: 100px;
    border-radius: 50px;
  }
  .info {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    flex: 4;
    h1 .ais-Highlight-highlighted {
      background: orange;
    }
    p {
      margin-top: 0.5rem;
      font-size: 18px;
    }
  }
   @media all and (max-width:570px){
    padding: 0 0.3rem;
     img {
    height: 50px;
    width: 50px;
  }
    .info {
    h1 {
      font-size: 24px;
    }
    p {
      margin-top: 0.5rem;
      font-size: 14px;
    }
  }
`

export default class Search extends Component {
  render () {
    return (
      <Layout title="Search">
        <SearchContainer>
          <InstantSearch
            appId={process.env.REACT_APP_ALGOLIA_APP_ID}
            apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
            indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
          >
            <ConnectedSearch />
            <ConnectedHits />
            <PoweredBy />
          </InstantSearch>
        </SearchContainer>
      </Layout>
    )
  }
}
