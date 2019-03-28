import React from 'react'
import styledNormalize from 'styled-normalize'
import { createGlobalStyle } from 'styled-components'

import Header from './components/Header'
import Body from './components/Body'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  body {
    font-family: 'Proxima-Nova', 'Arial', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    font-weight: 400;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
    margin: 0.25em 0;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Body />
    </>
  )
}

export default App
