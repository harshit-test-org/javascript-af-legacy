import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import Layout from '../components/UserLayout'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Head from 'next/head'
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
  background: #fff;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
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
  grid-area: readme;
`

export default withData(
  class RepoDetailsTemplate extends Component {
    static getInitialProps = ({ query }) => {
      return { query }
    }
    render () {
      return (
        <Fragment>
          <Head>
            <link rel="stylesheet" href="/static/gfm.css" />
          </Head>
          <Query
            query={query}
            variables={{
              id: this.props.query.id
            }}
          >
            {({ data, loading, error }) => {
              if (loading) {
                return <Layout title="Loading">Loading...</Layout>
              }
              if (error) {
                return <Layout title="Error">Error...</Layout>
              }
              let { getRepo: { description, readme, name } } = data
              if (!readme) {
                readme = `
                <i>(No readme found on github. Add one on github)</i>
              `
              }
              return (
                <Layout title={name}>
                  <Card>
                    <Description>{description}</Description>
                    <ReadmeArea
                      className="markdown-body"
                      dangerouslySetInnerHTML={{ __html: readme }}
                    />
                  </Card>
                </Layout>
              )
            }}
          </Query>
        </Fragment>
      )
    }
  }
)
