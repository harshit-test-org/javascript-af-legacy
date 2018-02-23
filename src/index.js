import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

import 'typeface-rubik'
import 'typeface-montserrat'

injectGlobal`
* {
    margin: 0;
}
html, body {
    background: #e6ecf0;
    font-family: 'Montserrat', sans-serif;
}
h1, h2, h3, h4, h5, h6{
  font-family: 'Rubik', sans-serif;
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

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
