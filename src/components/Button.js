import styled from 'styled-components'

const Button = styled.div`
  outline: none;
  background-color: ${props => props.theme.primaryDark};
  color: #fff;
  font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 0.8rem;
  border-radius: 50px;
  cursor: pointer;
`
export default Button
