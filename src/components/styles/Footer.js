import styled from 'styled-components'

const FooterStyle = styled.div`
  background: #2a2d34;
  height: auto;
  padding: 10px;
  text-align: center;
  & p {
    color: #fff;
    margin-bottom: 10px;
    font-size: 25px;
  }
  & a {
    display: inline-block;
    color: #777;
    margin: 0 1vw;
    font-size: 18px;
    text-decoration: none;
  }
  & a:hover {
    color: #fd267d;
    transition: 0.2s;
  }
  & #name {
    color: #fff;
    margin: 0;
    font-size: 25px;
  }
  & #name:hover {
    color: #fd267d;
    transition: 0.2s;
  }
  & #heart {
    color: #fd267d;
  }
`
export default FooterStyle
