import styled from 'styled-components'

const Sidebar = styled.div`
  background: #2a2d34;
  height: 100%;
  width: auto;
  padding: 0 0 10px;
  text-align: center;
  overflow: auto;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  & a {
    display: block;
    color: #fff;
    margin: 5px;
    padding: 15px 10px;
    font-size: 35px;
    text-decoration: none;
  }
  & a:hover {
    color: #fd267d;
    transition: 0.2s;
  }
  & a.active {
    color: #fd267d;
  }
  @media (max-width: 768px) {
    & {
      background: #2a2d34;
      height: 40px;
      width: auto;
      padding: 10px;
      text-align: center;
      z-index: 2;
      position: fixed;
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
    }
    & a {
      display: inline-block;
      color: #fff;
      margin: 0 3.4vw auto;
      padding: 0;
      font-size: 35px;
      text-decoration: none;
    }
  }
`

export default Sidebar
