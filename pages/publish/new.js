import React, { Component } from 'react'
import withData from '../../apollo/wihData'
import withAuth, { Consumer } from '../../components/withAuth'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import Layout from '../../components/UserLayout'
import Input, { InputGroup } from '../../components/Input'
import Router from 'next/router'
import gql from 'graphql-tag'

const Container = styled.form`
  background: #ffffff;
  padding: 1.2rem;
  min-height: 100%;
`

const InputSubmit = styled.input`
  outline: none;
  background-color: ${props => props.theme.primaryDark};
  color: #fff;
  font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 0.8rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.primary};
  }
`

const RepoMutation = gql`
  mutation createRespository($name: String!, $nameWithOwner: String!, $description: String!) {
    createRepository(name: $name, nameWithOwner: $nameWithOwner, description: $description) {
      _id
      name
      owner {
        name
      }
      starCount
    }
  }
`

export default withData(
  withAuth(
    class NewRepo extends Component {
      static getInitialProps({ res, query: { ...repo } }) {
        if (Object.keys(repo).length === 0) {
          if (res) {
            res.writeHead(302, {
              Location: '/publish/post'
            })
            res.end()
            res.finished = true
          } else {
            Router.replace('/publish/post')
          }
        }
        return { repo }
      }
      constructor(props) {
        super(props)
        this.state = {
          transition: false,
          ...props.repo
        }
      }
      handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
      render() {
        return (
          <Layout title="New Repository">
            <Consumer>
              {user => (
                <Mutation mutation={RepoMutation}>
                  {(mutate, { loading, error }) => {
                    return (
                      <Container
                        onSubmit={e => {
                          e.preventDefault()
                          mutate({
                            variables: this.state
                          }).then(() => {
                            this.setState({ transition: true })
                            Router.replace(`/user?id=${user._id}`, `/user/${user._id}`)
                          })
                        }}
                      >
                        <InputGroup>
                          <label>Repo Name</label>
                          <Input
                            onChange={this.handleChange}
                            name="name"
                            full
                            value={this.state.name}
                            placeholder="Repo name goes here"
                          />
                        </InputGroup>
                        <InputGroup>
                          <label>Description</label>
                          <Input
                            full
                            onChange={this.handleChange}
                            name="description"
                            value={this.state.description || ''}
                            placeholder="Description name goes here"
                          />
                        </InputGroup>
                        <InputGroup>
                          <label>Github URL</label>
                          <Input onChange={this.handleChange} full disabled value={this.state.url} />
                        </InputGroup>
                        <InputSubmit
                          type="submit"
                          value={loading ? 'Loading' : 'Submit'}
                          disabled={this.state.transition || loading}
                        />
                        {error && <p>Error :( Please try again</p>}
                      </Container>
                    )
                  }}
                </Mutation>
              )}
            </Consumer>
          </Layout>
        )
      }
    }
  )
)
