import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/UserLayout'
import Input, { InputGroup } from '../components/Input'

const Container = styled.div`
  background: #ffffff;
  padding: 1.2rem;
  min-height: 100%;
`

const InputSubmit = styled.input`
  outline: none;
  border: none;
  text-align: center;
  background-color: ${props => props.theme.primaryDark};
  color: #fff;
  font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
  font-weight: 600;
  font-size: 16px;
  padding: 0.8rem 0;
  border-radius: 50px;
  cursor: pointer;
`

export default class NewRepo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props.location.state.repo
    }
  }
  render () {
    const { location: { state: { repo } } } = this.props
    return (
      <Layout title="New Repository">
        <Container>
          <InputGroup>
            <label>Repo Name</label>
            <Input full value={repo.name} placeholder="Repo name goes here" />
          </InputGroup>
          <InputGroup>
            <label>Description</label>
            <Input
              full
              value={repo.description}
              placeholder="Description name goes here"
            />
          </InputGroup>
          <InputGroup>
            <label>Github URL</label>
            <Input full disabled value={repo.url} />
          </InputGroup>
          <InputSubmit value="SUBMIT" />
        </Container>
      </Layout>
    )
  }
}
