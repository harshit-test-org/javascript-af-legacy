import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import Layout from '../components/UserLayout'
import GitIcon from '../assets/icons/github'
import { InvertedButton, LinkBtn } from '../components/Button'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Head from 'next/head'
import withData from '../apollo/wihData'

const query = gql`
  query getRepo($id: ID!) {
    getRepo(id: $id) {
      description
      readme
      url
      name
      nameWithOwner
    }
  }
`

const Card = styled.div`
  padding: 1rem;
  background: #fff;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 75% 1fr;
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

const ExtrasArea = styled.div`
  grid-area: extras;
  padding: 1.5rem 0.7rem 0.7rem 0.7rem;
  border-left: 1px solid #cbcbcb;
`

const GitBtn = LinkBtn.extend`
  width: 100%;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
`
const InvBtn = InvertedButton.extend`
  width: 100%;
  text-align: center;
`
const BtnContainer = styled.div`
  width: 100%;
  margin: 1rem 0rem;
  display: flex;
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
              let {
                getRepo: { description, readme, name, url, nameWithOwner }
              } = data
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
                    <ExtrasArea>
                      <BtnContainer>
                        <GitBtn href={url} target="_blank" rel="noopener">
                          <GitIcon
                            style={{
                              fill: '#fff',
                              height: 'auto',
                              width: '1.7rem'
                            }}
                          />&nbsp; {nameWithOwner}
                        </GitBtn>
                      </BtnContainer>
                      <BtnContainer>
                        <InvBtn href={url} target="_blank" rel="noopener">
                          Visit
                        </InvBtn>
                      </BtnContainer>
                    </ExtrasArea>
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
