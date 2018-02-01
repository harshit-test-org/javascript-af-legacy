import React from 'react'
import styled from 'styled-components'

const Bar = styled.div`
  background: #2a2d34;
  box-shadow: 0 5px 5px -5px #000;
  -webkit-box-shadow: 0 5px 5px -5px #000;
  -moz-box-shadow: 0 5px 5px -5px #000;
  -ms-box-shadow: 0 5px 5px -5px #000;
  -o-box-shadow: 0 5px 5px -5px #000;
  height: auto;
  padding: 10px;
  text-align: left;
  & a {
    color: #fff;
    font-size: 45px;
    text-decoration: none;
  }
  & a:hover {
    color: #fd267d;
    transition: 0.5s;
  }
  & .login-btn {
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 6px;
    background: #fd267d;
    -webkit-appearance: none;
    color: #fff;
    padding: 10px;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 5px;
  }
`

const HomeBar = () => (
  <Bar>
    <a href="/">
      {'{'}JS.af{'}'}
    </a>
    <button className="login-btn">Login with Github</button>
  </Bar>
)

export default HomeBar
