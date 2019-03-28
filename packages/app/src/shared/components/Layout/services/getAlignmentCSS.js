const alignmentMap = {
  top: 'flex-start',
  right: 'flex-end',
  bottom: 'flex-end',
  left: 'flex-start',
  center: 'center',
}

const propertyMap = {
  horizontal: {
    row: 'justify-content',
    column: 'align-items',
  },
  vertical: {
    row: 'align-items',
    column: 'justify-content',
  },
}

const getAlignmentCSS = ({
  flexDirection = 'row',
  alignmentDirection = 'horizontal',
  alignment,
}) => {
  const property = propertyMap[alignmentDirection][flexDirection]

  return { [property]: alignmentMap[alignment] }
}

export default getAlignmentCSS
