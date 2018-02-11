import React, { Component } from 'react'
import styled from 'styled-components'
import firebase from '../../lib/firebase'

const Setting = styled.div`
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  height: auto;
  width: 80%;
  padding: 10px;
  position: relative;
  top: 30px;
  left: 12%;
  margin-bottom: 1rem;
  & ul {
    border-bottom: 1px solid #eee;
    width: auto;
    margin-bottom: 15px;
    display: block;
    padding: 10px;
  }
  & p {
    color: #000;
    font-size: 24px;
    text-align: left;
  }
  & ul > select {
    cursor: pointer;
    outline: none;
    border: none;
    height: 40px;
    width: 15%;
    float: right;
    position: relative;
    top: -35px;
  }
  & button {
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 6px;
    background: #fd267d;
    -webkit-appearance: none;
    color: #fff;
    width: 20%;
    padding: 10px;
    font-size: 20px;
    position: relative;
    left: 38%;
  }
  & button:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    -o-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    -ms-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
  @media (max-width: 480px) {
    & p {
      font-size: 16px;
    }
  }
  @media (max-width: 768px) {
    border-radius: 0;
    width: auto;
    position: relative;
    top: 20px;
    left: 0;
    margin-bottom: 70px;
    & button {
      width: 50% !important;
      position: relative;
      left: 25% !important;
    }
    & ul > select {
      width: auto;
    }
    @media (max-width: 991px) {
      & button {
        width: 30% !important;
        position: relative;
        left: 33% !important;
      }
    }
    @media (max-width: 1366px) {
      & settings {
        position: relative;
        left: 11%;
      }
      & button {
        width: 80% !important;
        position: relative;
        left: 11% !important;
      }
    }
    @media (height: 1024px){
      width: 90% !important;
      position: relative;
      left: 4% !important;
      & button {
        width: 40% !important;
        position: relative;
        left: 30% !important;
      }
    }
`

export default class Settings extends Component {
  handleLogout () {
    firebase.auth().signOut()
  }
  render () {
    return (
      <Setting>
        <ul>
          <p>Who can add me as a friend?</p>
          <select>
            <option value="everyone">Everyone</option>
            <option value="friends">Friends</option>
            <option value="noone">No one</option>
          </select>
        </ul>
        <ul>
          <p>Who can view my post?</p>
          <select>
            <option value="everyone">Everyone</option>
            <option value="friends">Friends</option>
            <option value="noone">No one</option>
          </select>
        </ul>
        <ul>
          <p>Who can like my post?</p>
          <select>
            <option value="everyone">Everyone</option>
            <option value="friends">Friends</option>
            <option value="noone">No one</option>
          </select>
        </ul>
        <ul>
          <p>Who can comment on my post?</p>
          <select>
            <option value="everyone">Everyone</option>
            <option value="friends">Friends</option>
            <option value="noone">No one</option>
          </select>
        </ul>
        <ul>
          <p>Who can message me?</p>
          <select>
            <option value="everyone">Everyone</option>
            <option value="friends">Friends</option>
            <option value="noone">No one</option>
          </select>
        </ul>
        <button onClick={this.handleLogout} type="button">
          Logout
        </button>
      </Setting>
    )
  }
}
