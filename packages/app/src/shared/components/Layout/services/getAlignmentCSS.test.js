import getAlignmentCSS from './getAlignmentCSS'

describe('getAlignmentCSS', () => {
  describe('for rows', () => {
    const flexDirection = 'row'

    describe('in the horizontal direction', () => {
      const alignmentDirection = 'horizontal'

      test('it returns the correct CSS object', () => {
        const callFn = alignment =>
          getAlignmentCSS({ flexDirection, alignmentDirection, alignment })

        const leftResult = callFn('left')
        const rightResult = callFn('right')
        const centerResult = callFn('center')

        expect(leftResult).toEqual({ 'justify-content': 'flex-start' })
        expect(rightResult).toEqual({ 'justify-content': 'flex-end' })
        expect(centerResult).toEqual({ 'justify-content': 'center' })
      })
    })

    describe('in the vertical direction', () => {
      const alignmentDirection = 'vertical'

      test('it returns the correct CSS object', () => {
        const callFn = alignment =>
          getAlignmentCSS({ flexDirection, alignmentDirection, alignment })

        const topResult = callFn('top')
        const bottomResult = callFn('bottom')
        const centerResult = callFn('center')

        expect(topResult).toEqual({ 'align-items': 'flex-start' })
        expect(bottomResult).toEqual({ 'align-items': 'flex-end' })
        expect(centerResult).toEqual({ 'align-items': 'center' })
      })
    })
  })

  describe('for columns', () => {
    const flexDirection = 'column'

    describe('in the horizontal direction', () => {
      const alignmentDirection = 'horizontal'

      test('it returns the correct CSS object', () => {
        const callFn = alignment =>
          getAlignmentCSS({ flexDirection, alignmentDirection, alignment })

        const leftResult = callFn('left')
        const rightResult = callFn('right')
        const centerResult = callFn('center')

        expect(leftResult).toEqual({ 'align-items': 'flex-start' })
        expect(rightResult).toEqual({ 'align-items': 'flex-end' })
        expect(centerResult).toEqual({ 'align-items': 'center' })
      })
    })

    describe('in the vertical direction', () => {
      const alignmentDirection = 'vertical'

      test('it returns the correct CSS object', () => {
        const callFn = alignment =>
          getAlignmentCSS({ flexDirection, alignmentDirection, alignment })

        const topResult = callFn('top')
        const bottomResult = callFn('bottom')
        const centerResult = callFn('center')

        expect(topResult).toEqual({ 'justify-content': 'flex-start' })
        expect(bottomResult).toEqual({ 'justify-content': 'flex-end' })
        expect(centerResult).toEqual({ 'justify-content': 'center' })
      })
    })
  })
})
