// TODO: Add tooltip
import React from 'react'
import styled from 'styled-components'
import PencilIcon from '../assets/icons/pencil'

const FabButton = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  background: #fd267d;
  color: #fff;
  padding: 10px;
  font-size: inhernt;
  position: fixed;
  bottom: 5px;
  right: 5px;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
  @media all and (max-width: 768px) {
    position: fixed;
    bottom: 65px;
  }
`
const Fab = props => {
  return (
    <FabButton className="uploadbtn" {...props}>
      <PencilIcon />
    </FabButton>
  )
}

export default Fab
