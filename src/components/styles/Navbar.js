import styled from 'styled-components';

const Navbar = styled.div`
  background: #fff;
  box-shadow: 0 5px 5px -5px #000;
  -webkit-box-shadow: 0 5px 5px -5px #000;
  -moz-box-shadow: 0 5px 5px -5px #000;
  -ms-box-shadow: 0 5px 5px -5px #000;
  -o-box-shadow: 0 5px 5px -5px #000;
  height: 100%;
  padding: 10px;
  text-align: center;
  overflow: auto;
  white-space: nowrap;
  & a {
    display: inline-block;
    color: #000;
    margin: 0 1vw;
    font-size: 25px;
    text-decoration: none;
    transition: 0.2s;
  }
  & a:after {
    display: block;
    content: '';
    border-bottom: 2px solid #fd267d;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  & a:hover:after {
    transform: scaleX(1);
  }

  @media (max-width: 768px) {
    .navbar a {
      margin: 0 5vw;
    }
  }
`;

export default Navbar;
