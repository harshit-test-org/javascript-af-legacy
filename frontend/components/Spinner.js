import React from 'react'
import styled from 'styled-components'

const Arc = styled.div`
  /*!
 * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
 * Copyright 2015 Daniel Cardoso <@DanielCardoso>
 * Licensed under MIT
 */
  &,
  & > div {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  & {
    display: block;
    font-size: 0;
    color: ${props => props.theme.primary};
    display: ${props => (props.hidden ? 'none' : 'block')};
  }

  & > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }
  & {
    width: 32px;
    height: 32px;
  }
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
  }
  & > div:first-child {
    position: absolute;
    width: 32px;
    height: 32px;
    background: transparent;
    border-style: solid;
    border-width: 2px;
    border-right-color: transparent;
    border-left-color: transparent;
    -webkit-animation: ball-clip-rotate-pulse-rotate 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    -moz-animation: ball-clip-rotate-pulse-rotate 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    -o-animation: ball-clip-rotate-pulse-rotate 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    animation: ball-clip-rotate-pulse-rotate 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
  }
  & > div:last-child {
    width: 16px;
    height: 16px;
    -webkit-animation: ball-clip-rotate-pulse-scale 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    -moz-animation: ball-clip-rotate-pulse-scale 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    -o-animation: ball-clip-rotate-pulse-scale 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    animation: ball-clip-rotate-pulse-scale 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
  }
  &.la-sm {
    width: 16px;
    height: 16px;
  }
  &.la-sm > div:first-child {
    width: 16px;
    height: 16px;
    border-width: 1px;
  }
  &.la-sm > div:last-child {
    width: 8px;
    height: 8px;
  }
  &.la-2x {
    width: 64px;
    height: 64px;
  }
  &.la-2x > div:first-child {
    width: 64px;
    height: 64px;
    border-width: 4px;
  }
  &.la-2x > div:last-child {
    width: 32px;
    height: 32px;
  }
  &.la-3x {
    width: 96px;
    height: 96px;
  }
  &.la-3x > div:first-child {
    width: 96px;
    height: 96px;
    border-width: 6px;
  }
  &.la-3x > div:last-child {
    width: 48px;
    height: 48px;
  }
  /*
 * Animations
 */
  @-webkit-keyframes ball-clip-rotate-pulse-rotate {
    0% {
      -webkit-transform: translate(-50%, -50%) rotate(0deg);
      transform: translate(-50%, -50%) rotate(0deg);
    }
    50% {
      -webkit-transform: translate(-50%, -50%) rotate(180deg);
      transform: translate(-50%, -50%) rotate(180deg);
    }
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(360deg);
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @-moz-keyframes ball-clip-rotate-pulse-rotate {
    0% {
      -moz-transform: translate(-50%, -50%) rotate(0deg);
      transform: translate(-50%, -50%) rotate(0deg);
    }
    50% {
      -moz-transform: translate(-50%, -50%) rotate(180deg);
      transform: translate(-50%, -50%) rotate(180deg);
    }
    100% {
      -moz-transform: translate(-50%, -50%) rotate(360deg);
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @-o-keyframes ball-clip-rotate-pulse-rotate {
    0% {
      -o-transform: translate(-50%, -50%) rotate(0deg);
      transform: translate(-50%, -50%) rotate(0deg);
    }
    50% {
      -o-transform: translate(-50%, -50%) rotate(180deg);
      transform: translate(-50%, -50%) rotate(180deg);
    }
    100% {
      -o-transform: translate(-50%, -50%) rotate(360deg);
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes ball-clip-rotate-pulse-rotate {
    0% {
      -webkit-transform: translate(-50%, -50%) rotate(0deg);
      -moz-transform: translate(-50%, -50%) rotate(0deg);
      -o-transform: translate(-50%, -50%) rotate(0deg);
      transform: translate(-50%, -50%) rotate(0deg);
    }
    50% {
      -webkit-transform: translate(-50%, -50%) rotate(180deg);
      -moz-transform: translate(-50%, -50%) rotate(180deg);
      -o-transform: translate(-50%, -50%) rotate(180deg);
      transform: translate(-50%, -50%) rotate(180deg);
    }
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(360deg);
      -moz-transform: translate(-50%, -50%) rotate(360deg);
      -o-transform: translate(-50%, -50%) rotate(360deg);
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @-webkit-keyframes ball-clip-rotate-pulse-scale {
    0%,
    100% {
      opacity: 1;
      -webkit-transform: translate(-50%, -50%) scale(1);
      transform: translate(-50%, -50%) scale(1);
    }
    30% {
      opacity: 0.3;
      -webkit-transform: translate(-50%, -50%) scale(0.15);
      transform: translate(-50%, -50%) scale(0.15);
    }
  }
  @-moz-keyframes ball-clip-rotate-pulse-scale {
    0%,
    100% {
      opacity: 1;
      -moz-transform: translate(-50%, -50%) scale(1);
      transform: translate(-50%, -50%) scale(1);
    }
    30% {
      opacity: 0.3;
      -moz-transform: translate(-50%, -50%) scale(0.15);
      transform: translate(-50%, -50%) scale(0.15);
    }
  }
  @-o-keyframes ball-clip-rotate-pulse-scale {
    0%,
    100% {
      opacity: 1;
      -o-transform: translate(-50%, -50%) scale(1);
      transform: translate(-50%, -50%) scale(1);
    }
    30% {
      opacity: 0.3;
      -o-transform: translate(-50%, -50%) scale(0.15);
      transform: translate(-50%, -50%) scale(0.15);
    }
  }
  @keyframes ball-clip-rotate-pulse-scale {
    0%,
    100% {
      opacity: 1;
      -webkit-transform: translate(-50%, -50%) scale(1);
      -moz-transform: translate(-50%, -50%) scale(1);
      -o-transform: translate(-50%, -50%) scale(1);
      transform: translate(-50%, -50%) scale(1);
    }
    30% {
      opacity: 0.3;
      -webkit-transform: translate(-50%, -50%) scale(0.15);
      -moz-transform: translate(-50%, -50%) scale(0.15);
      -o-transform: translate(-50%, -50%) scale(0.15);
      transform: translate(-50%, -50%) scale(0.15);
    }
  }
`

const Spinner = props => {
  return (
    <Arc hidden={props.hidden} {...props}>
      <div /> <div />
    </Arc>
  )
}

export default Spinner
