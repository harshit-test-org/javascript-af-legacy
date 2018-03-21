import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  border: 1px solid #dfdfdf;
  font-size: 1rem;
  padding: 0.8rem;
  color: #444;
  border-radius: 3px;
  font-family: Quicksand, Roboto, sans-serif;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  outline: 0;
  display: inline-block;
  margin-bottom: 1rem;
  text-align: left;
  &:focus {
    border-color: ${props => props.theme.primary};
  }
`

const InputElement = props => {
  return <Input {...props} />
}

export default InputElement
