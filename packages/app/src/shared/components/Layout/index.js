import styled from 'styled-components'

import getAlignmentCSS from './services/getAlignmentCSS'

const Layout = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  ${props =>
    props.alignX &&
    getAlignmentCSS({
      flexDirection: props.direction,
      alignmentDirection: 'horizontal',
      alignment: props.alignX || 'left',
    })}
  ${props =>
    props.alignY &&
    getAlignmentCSS({
      flexDirection: props.direction,
      alignmentDirection: 'vertical',
      alignment: props.alignY || 'top',
    })}
`

export default Layout
