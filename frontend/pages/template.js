import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Layout from '../components/UserLayout'
import GitIcon from '../assets/icons/github'
import { InvertedButton, LinkBtn } from '../components/Button'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Head from 'next/head'
import withAuth from '../components/withAuth'
import { Sparklines, SparklinesLine } from 'react-sparklines'

const query = gql`
  query getRepo($id: ID!) {
    getRepo(id: $id) {
      description
      readme
      url
      name
      nameWithOwner
      homepage
      activity
      starCount
      posted
      pushedAt
      license
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
  @media all and (max-width: 1024px) {
    grid-template-columns: 65% 1fr;
  }
  @media all and (max-width: 790px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 75px;
  }
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
  @media all and (max-width: 790px) {
    border-left: none;
    border-top: 1px solid #cbcbcb;
    padding: 0.7rem;
    margin-top: 0.7rem;
  }
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
const SideContainer = styled.div`
  margin: 0.5rem 0;
  border-bottom: 1px solid #cbcbcb;
  h2 i {
    font-size: 1rem;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.3rem;
  &:not(:last-child) {
    border-bottom: 1px solid #cbcbcb;
  }
  padding: 0.1rem;
  h3 {
    flex: 2;
  }
  h4 {
    flex: 1;
    color: #111;
  }
`

export default withAuth(
  class RepoDetailsTemplate extends Component {
    static getInitialProps = ({ query }) => {
      return { query }
    }
    render() {
      return (
        <>
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
                getRepo: {
                  description,
                  readme,
                  homepage,
                  name,
                  url,
                  nameWithOwner,
                  activity,
                  starCount,
                  posted,
                  pushedAt,
                  license
                }
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
                    <ReadmeArea className="markdown-body" dangerouslySetInnerHTML={{ __html: readme }} />
                    <ExtrasArea>
                      <SideContainer>
                        <BtnContainer>
                          <GitBtn href={url} target="_blank" rel="noopener">
                            <GitIcon style={{ fill: '#fff', height: 'auto', width: '1.7rem' }} />&nbsp; {nameWithOwner}
                          </GitBtn>
                        </BtnContainer>
                        {homepage && (
                          <BtnContainer>
                            <InvBtn href={homepage} target="_blank" rel="noopener">
                              Visit
                            </InvBtn>
                          </BtnContainer>
                        )}
                      </SideContainer>
                      <SideContainer>
                        <h2>
                          Activity <i>(Past 1 year)</i>
                        </h2>
                        <a href={`${url}/graphs/commit-activity`} target="_blank" rel="noopener">
                          {activity && (
                            <Sparklines data={activity} height={90}>
                              <SparklinesLine color="#3031b4" />
                            </Sparklines>
                          )}
                        </a>
                      </SideContainer>
                      <SideContainer>
                        <h2>Stats</h2>
                        <Info>
                          <h4>Github Stars</h4>
                          <h4>{starCount}</h4>
                        </Info>
                        <Info>
                          <h4>Posted on JSaf</h4>
                          <h4>{posted}</h4>
                        </Info>
                        <Info>
                          <h4>Last Pushed</h4>
                          <h4>{pushedAt}</h4>
                        </Info>
                        <Info>
                          <h4>License</h4>
                          <h4>{license || 'n/a'}</h4>
                        </Info>
                      </SideContainer>
                    </ExtrasArea>
                  </Card>
                </Layout>
              )
            }}
          </Query>
        </>
      )
    }
  }
)
