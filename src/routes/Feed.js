import React, { Component } from 'react'
import Layout from '../components/UserLayout'
import styled from 'styled-components'

const FeedContainer = styled.div`
  padding: 0 23%;
  @media all and (max-width: 570px) {
    padding: 0 0.3rem;
  }
`
const FeedCard = styled.div`
  width: 100%;
  background: #ffffff;
  margin-bottom: 40px;
`
const FeedAuthorInfo = styled.div`
  padding: 0.5rem;
  display: flex;
  & .time {
    flex: 1;
    display: flex;
    align-items: center;
    font-style: italic;
  }
`

const FeedAuthor = styled.div`
  flex: 7;
  display: flex;
  margin-bottom: 8px;
  & img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  & .name {
    display: flex;
    align-items: center;
    font-size: 24px;
    padding-left: 16px;
    font-weight: bold;
    font-family: 'Quicksand', sans-serif;
  }
`

const FeedImage = styled.img`
  width: 100%;
  height: auto;
`

const FeedText = FeedAuthorInfo.extend`
  padding: 1rem;
`

const Like = styled.div`
  background: #eee;
  padding: 1rem;
  border-radius: 50%;
  margin-left: 3%;
`
const CommentBar = styled.div`
  flex: 1;
  margin-left: 5%;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  border: 0;
  width: 100%;
  height: 20px;
  outline: none;
`
const RoundInput = styled.div`
  border: 1px solid grey;
  width: 100%;
  border-radius: 50px;
  padding: 8px 15px;
`

export default class Feed extends Component {
  render () {
    return (
      <Layout title="Feed">
        <FeedContainer>
          <FeedCard>
            <FeedAuthorInfo>
              <FeedAuthor>
                <img
                  src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?w=950&h=650&auto=compress&cs=tinysrgb"
                  alt=""
                />
                <span className="name"> Harshit Pant</span>
              </FeedAuthor>
              <div className="time">1h ago</div>
            </FeedAuthorInfo>
            <FeedText>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              ea fugiat et molestiae ratione vitae hic dicta eligendi soluta
              incidunt rerum dolorem libero provident suscipit obcaecati
              aspernatur numquam quidem exercitationem maxime quae illum
              reiciendis aliquid, iure molestias? Aperiam quibusdam aliquam
              numquam est molestiae adipisci illo.
            </FeedText>
            <FeedImage src="https://images.pexels.com/photos/285284/pexels-photo-285284.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
            <FeedAuthorInfo>
              <Like>+1</Like>
              <CommentBar>
                <RoundInput>
                  <Input type="text" placeholder="Write a response" />
                </RoundInput>
              </CommentBar>
            </FeedAuthorInfo>
          </FeedCard>
          <FeedCard>
            <FeedAuthorInfo>
              <FeedAuthor>
                <img
                  src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?w=950&h=650&auto=compress&cs=tinysrgb"
                  alt=""
                />
                <span className="name"> Harshit Pant</span>
              </FeedAuthor>
              <div className="time">1h ago</div>
            </FeedAuthorInfo>
            <FeedText>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              ea fugiat et molestiae ratione vitae hic dicta eligendi soluta
              incidunt rerum dolorem libero provident suscipit obcaecati
              aspernatur numquam quidem exercitationem maxime quae illum
              reiciendis aliquid, iure molestias? Aperiam quibusdam aliquam
              numquam est molestiae adipisci illo.
            </FeedText>
            {/* <FeedImage src="https://images.pexels.com/photos/285284/pexels-photo-285284.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" /> */}
            <FeedAuthorInfo>
              <Like>+1</Like>
              <CommentBar>
                <RoundInput>
                  <Input type="text" placeholder="Write a response" />
                </RoundInput>
              </CommentBar>
            </FeedAuthorInfo>
          </FeedCard>
        </FeedContainer>
      </Layout>
    )
  }
}
