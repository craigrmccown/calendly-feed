import Calendly from './calendly'

describe('Calendly', () => {
  const token = 'abcd1234'
  const calendly = new Calendly(token)
  const getResult = Promise.resolve({})
  const postResult = Promise.resolve({})
  const deleteResult = Promise.resolve({})

  beforeEach(() => {
    calendly.get = jest.fn().mockReturnValue(getResult)
    calendly.post = jest.fn().mockReturnValue(postResult)
    calendly.delete = jest.fn().mockReturnValue(deleteResult)
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
    test('it passes the correct arguments', () => {
      calendly.getUser()
      expect(calendly.get).toHaveBeenCalledWith('users/me')
    })

    test('it returns the results of the request', () => {
      const results = calendly.getUser()

      expect(results).toBe(getResult)
    })
  })

  describe('getWebhookSubscriptions', () => {
    test('it passes the correct arguments', () => {
      calendly.getWebhookSubscriptions()
      expect(calendly.get).toHaveBeenCalledWith('hooks')
    })

    test('it returns the results of the request', () => {
      const results = calendly.getWebhookSubscriptions()

      expect(results).toBe(getResult)
    })
  })

  describe('createWebhookSubscription', () => {
    test('it passes the correct arguments', () => {
      calendly.createWebhookSubscription('http://foo.bar')

      const [[path, body]] = calendly.post.mock.calls

      expect(path).toBe('hooks')
      expect(body.getAll('url')).toEqual(['http://foo.bar'])
      expect(body.getAll('events[]').sort()).toEqual(['invitee.created', 'invitee.canceled'].sort())
    })

    test('it returns the results of the request', () => {
      const results = calendly.createWebhookSubscription('http://foo.bar')

      expect(results).toBe(postResult)
    })
  })

  describe('deleteWebhookSubscription', () => {
    test('it passes the correct arguments', () => {
      calendly.deleteWebhookSubscription('123')
      expect(calendly.delete).toHaveBeenCalledWith('hooks/123')
    })

    test('it returns the results of the request', () => {
      const results = calendly.deleteWebhookSubscription('123')

      expect(results).toBe(deleteResult)
    })
  })

  describe('deleteWebhookSubscriptions', () => {
    beforeEach(() => {
      calendly.get.mockReturnValue(Promise.resolve({ data: [{ id: '123' }, { id: '456' }] }))
    })

    test('it gets all webhook subscriptions and deletes each one', async () => {
      await calendly.deleteWebhookSubscriptions()

      expect(calendly.delete).toHaveBeenCalledWith('hooks/123')
      expect(calendly.delete).toHaveBeenCalledWith('hooks/456')
    })

    test('it returns a list of delete responses', async () => {
      const result = await calendly.deleteWebhookSubscriptions()
      const innerResult = await deleteResult

      expect(result).toEqual([innerResult, innerResult])
    })
  })
})
