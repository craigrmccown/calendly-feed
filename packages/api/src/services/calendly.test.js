import Calendly from './calendly'

describe('Calendly', () => {
  const token = 'abcd1234'
  const calendly = new Calendly(token)

  beforeEach(() => {
    calendly.get = jest.fn()
  })

  test('it sets the correct base url', () => {
    expect(calendly.baseURL).toBe('https://calendly.com/api/v1/')
  })

  test('it authenticates properly', () => {
    const request = { headers: { set: jest.fn() } }

    calendly.willSendRequest(request)
    expect(request.headers.set).toHaveBeenCalledWith('X-TOKEN', token)
  })

  describe('getUser', () => {
    test('it uses the correct path', () => {
      calendly.getUser()
      expect(calendly.get).toHaveBeenCalledWith('users/me')
    })
  })
})
