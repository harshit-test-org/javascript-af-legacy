import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

import 'typeface-quicksand'
import 'typeface-roboto'

injectGlobal`
* {
    margin: 0;
}
html, body {
    background: #e6ecf0;
    font-family: 'Roboto', sans-serif;
}
h1, h2, h3, h4, h5, h6{
  font-family: 'Quicksand', Segoe UI, Tahoma,Verdana, sans-serif;
}
.chat{
    overflow: auto;
    grid-row: 1 / 2;
    display: flex;
    grid-column: 2 / 3;
    flex-direction: column;
}
.chat--closed{
    overflow: auto;
    grid-row: 1 / 2;
    display: flex;
    grid-column: 2 / 3;
    flex-direction: column;
}
@media all and (max-width: 550px){
.chat{
grid-column: 1 / 3;
}
.chat--closed{
   display: none;
}
}
`

const theme = {
  primary: '#4243cc',
  primaryDark: '#3031b4',
  primaryLight: '#a28aff',
  secondary: '#e74c3c'
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
