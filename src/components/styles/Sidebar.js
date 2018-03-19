import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Sidebar = styled.div`
  grid-area: sidebar;
  background: ${props => props.theme.primary};
  box-shadow: 0 6px 10px 6px rgba(0, 0, 0, 0.2);
  @media all and (max-width: 570px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    bottom: 0;
    height: 70px;
    z-index: 60;
    width: 100%;
  }
`
export default Sidebar

export const NavIcon = styled(NavLink)`
  display: flex;
  padding: 20% 0 20% 0;
  justify-content: center;
  transition: all 0.2s ease;
  & > svg {
    transition: all 0.2s ease;
  }
  &.active {
    background: #f1f1f1;
  }
  &:hover {
    background: #ffffff;
  }
  &.active > svg,
  &:hover > svg {
    fill: ${props => props.theme.primaryDark};
  }
  &:hover > svg {
    width: 50px;
    height: 50px;
  }
  @media all and (max-width: 570px) {
    padding: 0;
    flex: 1;
    align-items: center;
  }
`
