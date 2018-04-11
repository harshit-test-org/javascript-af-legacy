import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import GitHubIcon from '../assets/icons/github'

const Card = styled.div`
  position: relative;
  z-index: 55;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  margin-bottom: 15px;
  padding: 16px;
`

const CardTop = styled.div`
  h2 {
    flex: 1;
    color: rgba(0, 0, 0, 0.84);
    cursor: pointer;
    margin: 0;
    padding: 0 0 10px;
    font-size: 26px;
    word-wrap: break-word;
    font-weight: 700;
  }
  p {
    flex: 2;
    margin: 0;
    color: ${props => props.theme.secondary};
    padding: 0 0 20px;
    font-size: 18px;
    font-weight: 400;
  }
`
const CardBottom = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
`
const Info = styled.div`
  display: flex;
  align-items: center;
  & .icon {
    height: 24px;
    width: 24px;
    margin-right: 8px;
  }
  p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.52);
  }
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
    color: ${props => props.theme.secondary};
  }
`

class RepoCard extends Component {
  handleCardClick = id => {
    Router.push(`/template?id=${id}`, `/repo/${id}`) // temp
  }
  handleAuthorClick = id => {
    Router.push(`/user/${id}`)
  }
  handleIconClick = url => {
    window.location.href = url
  }
  render () {
    const { repoId, userId, title, text, author, image, posted } = this.props
    const url = 'https://www.google.com'
    return (
      <Fragment>
        <Card>
          <CardTop>
            <h2 onClick={() => this.handleCardClick(repoId)}>{title}</h2>
            <p>{text}</p>
          </CardTop>
          <CardBottom>
            <Info>
              <GitHubIcon
                className={'icon'}
                style={{ cursor: 'pointer' }}
                onClick={() => this.handleIconClick(url)}
              />
              <p>{posted}</p>
            </Info>
            <Author onClick={() => this.handleAuthorClick(userId)}>
              <img src={image} />
              <p>{author}</p>
            </Author>
          </CardBottom>
        </Card>
      </Fragment>
    )
  }
}

export default withRouter(RepoCard)
