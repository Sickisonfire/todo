import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.js'
import reportWebVitals from './reportWebVitals'
import 'tailwindcss/dist/base.min.css'
import { GlobalStyles } from 'twin.macro'

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root')
)

reportWebVitals()
