/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import { MockedProvider } from 'react-apollo/test-utils'

import App from './App'

test('it renders successfully', () => {
  const rootNode = document.createElement('div')

  ReactDOM.render(
    <MockedProvider>
      <App />
    </MockedProvider>,
    rootNode,
  )
  ReactDOM.unmountComponentAtNode(rootNode)
})
