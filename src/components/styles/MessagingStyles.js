import styled, { css } from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: minmax(180px, 250px) 4fr;
  grid-template-rows: 1fr 65px;
  grid-gap: 0.5px;
  @media all and (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`

export const Chats = styled.div`
  display: grid;
  overflow: -moz-scrollbars-none;
  grid-gap: 16px;
  grid-template-rows: 24px 1fr 1fr;
  background: #182e40;
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  color: #fff;
  @media all and (max-width: 550px) {
    ${props =>
    props.chatOpen
      ? css`
            display: none;
          `
      : css`
            display: grid;
          `};
  }
  & h2,
  h4 {
    margin: 5px 0 5px 10px;
  }
  & h2 {
    grid-row: 1 / 2;
  }
`

export const RoomStyle = styled.div`
  margin: auto 0;
  cursor: pointer;
  padding: 8px;
  display: flex;
  &:hover {
    background: #fff;
  }
  & img {
    height: 24px;
  }
  & .img {
    flex: 1;
    display: flex;
  }
  & .text {
    flex: 5;
    font-family: 'Quicksand', sans-serif;
    font-size: 1rem;
    display: flex;
    align-items: center;
    font-weight: 500;
    padding-left: 5px;
  }
  &:hover .text {
    color: #000000;
  }
`

export const ChatsSection = styled.div`
  overflow: auto;
  & h4 {
    margin-top: 1rem;
    opacity: 0.87;
  }
  & .clipper {
    overflow: auto;
    width: 100%;
    height: 100%;
    position: relative;
  }

  & .scroller {
    overflow-y: auto;
    max-height: 100%;
  }

  & .track {
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${props => props.theme.primaryDark};
    width: 4px;
  }
  & ._scrollbar .track {
    opacity: 1 !important;
  }

  & .bar {
    position: absolute;
    width: 100%;
    border-radius: 10px;
    background: #f5f5f5;
  }
  /* hide default chrome scrollbar */
  & .scroller::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

export const Global = ChatsSection.extend`
  grid-row: 2 / 3;
`

export const Dms = ChatsSection.extend`
  grid-row: 3 / 4;
`

export const MessageBar = styled.div`
  display: flex;
  padding: 0.8rem 1.5rem;
  flex-direction: row;
  background: #182e40;
  grid-row: 2 / -1;
  grid-column: 2 / -1;
  @media all and (max-width: 550px) {
    ${props =>
    !props.chatOpen
      ? css`
            display: none;
          `
      : css`
            display: flex;
            grid-column: 1 / -1;
          `};
  }
  & input {
    border: none;
    flex: 1;
    border-radius: 3px;
    padding-left: 8px;
  }
  & form {
    flex: 1;
    display: flex;
  }
`
