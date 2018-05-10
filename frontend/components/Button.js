import styled from 'styled-components'

const styles = `
  outline: none;
  color: #fff;
  font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 0.8rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  
`

const Button = styled.button`
  ${styles};
  background-color: ${props => props.theme.primary};
  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.secondary};
  }
`
export default Button

export const LinkBtn = styled.a`
  ${styles};
  background-color: ${props => props.theme.primary};
  text-decoration: none;
`
export const InvertedButton = styled.a`
  outline: none;
  color: ${props => props.theme.primaryDark};
  font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
  font-weight: 600;
  font-size: 18px;
  transition: 0.25s ease all;
  padding: 0.8rem;
  border-radius: 50px;
  cursor: pointer;
  background-color: white;
  border: 2px solid ${props => props.theme.primaryDark};
  text-decoration: none;
  &:hover {
    color: white;
    background-color: ${props => props.theme.primary};
  }
`
