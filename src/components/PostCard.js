import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

const Card = styled.div`
  position: relative;
  z-index: 55;
  display: block;
  background: #ffffff;
  margin-bottom: 15px;
  cursor: pointer;
`

const CardThumb = styled.div`
  height: auto;
  clip-path: polygon(0px 0px, 100% 0px, 98.8889% 84.6667%, 0% 100%);
  & img {
    display: block;
    width: 100%;
    height: auto;
  }
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
    this.props.history.push(`/user/${id}`)
  }
  render () {
    return (
      <Fragment>
        <Card onClick={() => this.handleCardClick(this.props.userId)}>
          <CardThumb>
            <img src={this.props.image} alt="" />
          </CardThumb>
          <CardContent>
            <h2>{this.props.title}</h2>
            <p>{this.props.text}</p>
          </CardContent>
        </Card>
      </Fragment>
    )
  }
}

export default withRouter(RepoCard)
