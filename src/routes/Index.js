import React, { Component } from 'react'
import Layout from '../components/DefaultLayout'
import styled from 'styled-components'
import logo from '../assets/loginimg.jpg'

const Welcome = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${logo});
  box-shadow: 0 5px 5px -5px #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 90vh;
  padding: 10px;
  & ul {
    background: rgba(255, 255, 255, 0.6);
    width: 60%;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 50px;
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
            <h1>For Devs by Devs</h1>
            <p>
              A platform where developers can share their GitHub repos and
              connect with other developers through sharing projects, messaging,
              and posting. We will also have a job board for dev positions. All
              this with none of the usual social media drama or ads. It{`'`}s
              all code all the time here, so why not join in on the fun!
            </p>
          </ul>
        </Welcome>
      </Layout>
    )
  }
}

export default Index
