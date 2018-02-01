import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

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

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
