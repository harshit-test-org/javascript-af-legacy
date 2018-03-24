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
  background-color: ${props => props.theme.primaryDark};
  color: #fff;
  font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 0.8rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
`

export default class NewRepo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props.location.state.repo
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render () {
    return (
      <Layout title="New Repository">
        <Container>
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
              value={this.state.description}
              placeholder="Description name goes here"
            />
          </InputGroup>
          <InputGroup>
            <label>Github URL</label>
            <Input
              onChange={this.handleChange}
              full
              disabled
              value={this.state.url}
            />
          </InputGroup>
          <InputSubmit type="submit" value="SUBMIT" />
        </Container>
      </Layout>
    )
  }
}
