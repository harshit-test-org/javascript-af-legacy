import React from 'react'
import styled, { css } from 'styled-components'

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
  width: ${props => (props.full ? '90%' : 'auto')};
  ${props =>
    props.disabled
      ? css`
          cursor: not-allowed;
        `
      : ''} text-align: left;
  &:focus {
    border-color: ${props => props.theme.primary};
  }
`

const InputElement = props => {
  return <Input {...props} />
}

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 20px;
    margin-bottom: 0.4rem;
    font-family: 'Quicksand', sans-serif;
  }
`

export default InputElement
