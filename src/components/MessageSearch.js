import React, { Component } from 'react'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'

import Modal from './Modal'
// import gql from 'graphql-tag'

const SearchInput = styled.input`
  border: 1px solid #ccc;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  padding: 7px 14px;
  transition: 0.4s;
  background: transparent;
  width: 100%;
  height: 50px;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
  & ~ .focus-border:before,
  & ~ .focus-border:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: #fd267d;
    transition: 0.2s;
    transition-delay: 0.2s;
  }
  & ~ .focus-border:after {
    top: auto;
    bottom: 0;
    right: auto;
    left: 0;
    transition-delay: 0.6s;
  }
  & ~ .focus-border i:before,
  & ~ .focus-border i:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 0;
    background-color: #fd267d;
    transition: 0.2s;
  }
  & ~ .focus-border i:after {
    left: auto;
    right: 0;
    top: auto;
    bottom: 0;
    transition-delay: 0.4s;
  }
  &:focus ~ .focus-border:before,
  &:focus ~ .focus-border:after,
  .has-content& ~ .focus-border:before,
  .has-content& ~ .focus-border:after {
    width: 100%;
    transition: 0.2s;
    transition-delay: 0.6s;
  }
  &:focus ~ .focus-border:after,
  .has-content& ~ .focus-border:after {
    transition-delay: 0.2s;
  }
  &:focus ~ .focus-border i:before,
  &:focus ~ .focus-border i:after,
  .has-content& ~ .focus-border i:before,
  .has-content& ~ .focus-border i:after {
    height: 100%;
    transition: 0.2s;
  }
  &:focus ~ .focus-border i:after,
  .has-conten& ~ .focus-border i:after {
    transition-delay: 0.4s;
  }
`

const SearchContainer = styled.div`
  position: relative;
`

// const query = gql`
//   {
//     searchChannels(q: "Javascript", dm: false) {
//       name
//     }
//   }
// `

class SearchModal extends Component {
  state = {
    search: null
  }
  search = e => {
    console.log(this.props)
  }
  render () {
    return (
      <Modal show={this.props.open} toggle={this.props.toggle}>
        <h1>Search</h1>
        <br />
        <SearchContainer>
          <SearchInput onChange={this.search} type="text" autoFocus />
          <span className="focus-border">
            <i />
          </span>
        </SearchContainer>
      </Modal>
    )
  }
}

export default withApollo(SearchModal)
