import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/router'

import 'typeface-josefin-sans'

injectGlobal`
* {
    margin: 0;
}
html, body {
    background: #e6ecf0;
    font-family: 'Josefin Sans';
}
::-webkit-scrollbar {
    height: 0;
    width: 6px;
}
::-webkit-scrollbar-track {
    background: #222;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #fd267d;   
}
::selection {
    background: #fd267d;
}
`

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
