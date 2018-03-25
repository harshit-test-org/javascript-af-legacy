import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'

const Card = styled.div`
  position: relative;
  z-index: 55;
  display: block;
  background: #ffffff;
  margin-bottom: 15px;
  cursor: pointer;
`

const CardContent = styled.div`
  background: white;
  padding: 16px;
  h2 {
    margin: 0;
    padding: 0 0 10px;
    font-size: 26px;
    word-wrap: break-word;
    font-weight: 700;
  }
  p {
    margin: 0;
    color: ${props => props.theme.secondary};
    padding: 0 0 20px;
    font-size: 18px;
    font-weight: 400;
  }
`
class RepoCard extends Component {
  handleCardClick = id => {
    Router.push(`/user/${id}`)
  }
  render () {
    return (
      <Fragment>
        <Card onClick={ () => this.handleCardClick(this.props.userId) }>
          <CardContent>
            <h2>{ this.props.title }</h2>
            <p>{ this.props.text }</p>
          </CardContent>
        </Card>
      </Fragment>
    )
  }
}

export default withRouter(RepoCard)
