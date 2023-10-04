import React from 'react'
import ReactDOM from 'react-dom/client'
import 'core-js'
import 'react-app-polyfill/stable'
const root = ReactDOM.createRoot(document.getElementById("root"))
import App from './App'
import { Provider } from 'react-redux';
import Store from './Store/index.js'

root.render(
  <Provider store={Store}>
    <App />
  </Provider>,
)


