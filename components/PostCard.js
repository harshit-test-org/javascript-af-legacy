import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import GitHubIcon from '../assets/icons/github'

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
const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const Author = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    border-radius: 50%;
    height: 32px;
    filter: grayscale(60%);
  }
  p {
    margin-left: 8px;
    padding: 0;
    font-size: 14px;
  }
`

const Actions = styled.div`
  height: 24px;
  width: 24px;
`

class RepoCard extends Component {
  handleCardClick = id => {
    Router.push(`/repo/${id}`)
  }
  handleAuthorClick = (e, id) => {
    e.stopPropagation()
    Router.push(`/user/${id}`)
  }
  handleIconClick = (e, url) => {
    e.stopPropagation()
    Router.push(url)
  }
  render () {
    const { repoId, userId, title, text, author, image, url } = this.props
    return (
      <Fragment>
        <Card onClick={() => this.handleCardClick(repoId)}>
          <CardContent>
            <h2>{title}</h2>
            <p>{text}</p>
            <CardBottom>
              <Actions>
                <GitHubIcon onClick={() => this.handleIconClick(url)} />
              </Actions>
              <Author onClick={e => this.handleAuthorClick(e, userId)}>
                <img src={image} />
                <p>{author}</p>
              </Author>
            </CardBottom>
          </CardContent>
        </Card>
      </Fragment>
    )
  }
}

export default withRouter(RepoCard)
