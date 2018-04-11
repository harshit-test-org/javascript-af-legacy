import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Layout from '../components/UserLayout'
import styled from 'styled-components'
import gql from 'graphql-tag'
import withData from '../apollo/wihData'

const query = gql`
  query getRepo($id: ID!) {
    getRepo(id: $id) {
      description
      readme
      name
    }
  }
`

const Card = styled.div`
  padding: 1rem;
  width: 95%;
  background: #fff;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 30px 1fr;
  grid-template-areas:
    'heading heading'
    'readme extras';
`

const Description = styled.p`
  color: ${props => props.theme.secondary};
  font-size: 24px;
  font-family: Roboto;
  grid-area: heading;
`

const ReadmeArea = styled.div`
  font-family: Roboto, sans-serif;
  grid-area: readme;
  /*
  Dracula Theme v1.2.0
  https://github.com/zenorocha/dracula-theme
  Copyright 2015, All rights reserved
  Code licensed under the MIT license
  http://zenorocha.mit-license.org
  @author Éverton Ribeiro <nuxlli@gmail.com>
  @author Zeno Rocha <hi@zenorocha.com>
  */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme.primary};
    margin: 1rem 0;
  }
  pre {
    margin: 1rem;
  }
  h1 {
    font-size: 30px;
  }
  h2 {
    font-size: 26px;
  }
  h3 {
    font-size: 22px;
  }
  h4 {
    font-size: 18px;
  }
  h5 {
    font-size: 16px;
  }
  h6 {
    font-size: 12px;
  }
  a code {
    color: #2c8ebb;
    text-decoration: underline;
  }
  pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
    border-radius: 0;
  }
  code {
    padding: 0.2rem 0.4rem;
    font-size: 90%;
    color: #bd4147;
    background-color: #f7f7f9;
    border-radius: 0.25rem;
  }
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #282a36;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-section,
  .hljs-link {
    color: #8be9fd;
  }

  .hljs-function .hljs-keyword {
    color: #ff79c6;
  }

  .hljs,
  .hljs-subst {
    color: #f8f8f2;
  }

  .hljs-string,
  .hljs-title,
  .hljs-name,
  .hljs-type,
  .hljs-attribute,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition,
  .hljs-variable,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #f1fa8c;
  }

  .hljs-comment,
  .hljs-quote,
  .hljs-deletion,
  .hljs-meta {
    color: #6272a4;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-title,
  .hljs-section,
  .hljs-doctag,
  .hljs-type,
  .hljs-name,
  .hljs-strong {
    font-weight: bold;
  }

  .hljs-emphasis {
    font-style: italic;
  }
`

export default withData(
  class RepoDetailsTemplate extends Component {
    static getInitialProps = ({ query }) => {
      return { query }
    }
    render () {
      return (
        <Query
          query={query}
          variables={{
            id: this.props.query.id
          }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <Layout title="loading">Loading...</Layout>
            }
            if (error) {
              return <Layout title="Error">Error...</Layout>
            }
            console.log(data)
            const { getRepo: { description, readme, name } } = data
            return (
              <Layout title={name}>
                <Card>
                  <Description>{description}</Description>
                  <ReadmeArea dangerouslySetInnerHTML={{ __html: readme }} />
                </Card>
              </Layout>
            )
          }}
        </Query>
      )
    }
  }
)
