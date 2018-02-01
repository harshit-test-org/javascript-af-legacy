import React, { Component } from 'react'
import Layout from '../components/DefaultLayout'
import styled from 'styled-components'
import logo from '../assets/loginimg.jpg'

const Welcome = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${logo});
  box-shadow: 0 5px 5px -5px #000;
  height: 100%;
  padding: 10px;
  & ul {
    background: rgba(255, 255, 255, 0.6);
    width: 60%;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 50px;
    position: relative;
    left: 16%;
  }
  & ul h1 {
    color: #000;
    margin-bottom: 10px;
    font-size: 60px;
  }
  & p {
    color: #000;
    font-size: 18px;
  }
  @media (max-width: 991px) {
    & ul {
      width: auto;
      position: relative;
      left: 0;
    }
    & ul h1 {
      font-size: 50px;
    }
  }
  @media (height: 1024px) {
    & ul h1 {
      font-size: 60px;
    }
  }
  @media (width: 1024px) {
    & ul {
      width: 80%;
      position: relative;
      left: 5%;
    }
  }
`

class Index extends Component {
  render () {
    return (
      <Layout>
        <Welcome>
          <ul>
            <h1>Javascript. Always Fun!</h1>
            <p>
              A social media were developers can view there github repos or
              other people{`'`}s repos and connect with other developers by
              shareing projects, messaging, even uploading post on stuff you are
              working on we also have a job board for thoes developers looking
              for development jobs and we dont have all the usual social media
              BS its all code all the time here so why not join in on the fun
              and best of all no ads
            </p>
          </ul>
        </Welcome>
      </Layout>
    )
  }
}

export default Index
