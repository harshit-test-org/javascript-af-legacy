import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import Container from '../components/styles/Container'
import { InstantSearch, SearchBox, Highlight } from 'react-instantsearch/dom'
import { connectInfiniteHits } from 'react-instantsearch/connectors'
import '../components/styles/algolia.min.css'
import Sidemenu from '../components/Sidemenu'

import styled from 'styled-components'

const SearchInput = styled.div`
  background: #2a2d34;
  height: 34px;
  padding: 10px;
  text-align: center;
  & div {
    margin-left: 12%;
    margin-right: 12%;
  }
`
const CardLink = styled(Link)`
  text-decoration: none;
  color: #000;
`

const Box = () => (
  <SearchInput>
    <div>
      <SearchBox />
    </div>
  </SearchInput>
)

const Card = styled.div`
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background: white;
  margin: 1rem 0;
  padding: 1rem;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  & .picture {
    flex: 1;
  }
  & .picture > img {
    height: 100px;
    width: 100px;
    border-radius: 55%;
  }
  & .title {
    flex: 2;
  }
  & .title .ais-Highlight > span,
  em {
    font-size: 28px;
  }
`

function CustomHits ({ hits }) {
  return <main>{hits.map(hit => <Hit item={hit} key={hit.objectID} />)}</main>
}

const ConnectedHits = connectInfiniteHits(CustomHits)

const Hit = ({ item }) => {
  return (
    <CardLink to={`/user/${item.objectID}`}>
      <Card>
        <div className="picture">
          <img src={item.photoURL} alt={item.name} />
        </div>
        <div className="title">
          <Highlight attribute="name" hit={item} />
        </div>
      </Card>
    </CardLink>
  )
}

export default class Layout extends Component {
  render () {
    return (
      <InstantSearch
        appId={process.env.REACT_APP_ALGOLIA_APP_ID}
        apiKey={process.env.REACT_APP_ALGOLIA_API_KEY}
        indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
      >
        <Helmet>
          <title>Search | Javascript.af</title>
        </Helmet>
        <Box />
        <Sidemenu />
        <Container>
          <ConnectedHits />
        </Container>
      </InstantSearch>
    )
  }
}
