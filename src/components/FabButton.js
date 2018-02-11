// TODO: Add tooltip
import React from 'react'
import FontAwesome from '@fortawesome/react-fontawesome'
import Pencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import styled from 'styled-components'

const FabButton = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  background: #fd267d;
  color: #fff;
  height: 75px;
  width: 75px;
  padding: 10px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
  @media all and (max-width: 768px) {
    position: fixed;
    bottom: 65px;
    right: 20px;
  }
`

const Fab = props => {
  return (
    <FabButton className="uploadbtn" {...props}>
      <FontAwesome size="2x" icon={Pencil} />
    </FabButton>
  )
}

export default Fab
