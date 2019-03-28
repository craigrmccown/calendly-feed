import { RESTDataSource } from 'apollo-datasource-rest'

const createFormData = pairs => {
  const fd = new URLSearchParams()

  pairs.forEach(([k, v]) => fd.append(k, v))

  return fd
}

export default class Calendly extends RESTDataSource {
  constructor(token) {
    super()
    this.baseURL = 'https://calendly.com/api/v1/'
    this.token = token
  }

  willSendRequest(request) {
    request.headers.set('X-TOKEN', this.token)
  }

  getUser() {
    return this.get('users/me')
  }

  getWebhookSubscriptions() {
    return this.get('hooks')
  }

  createWebhookSubscription(url) {
    return this.post(
      'hooks',
      createFormData([
        ['url', url],
        ['events[]', 'invitee.created'],
        ['events[]', 'invitee.canceled'],
      ]),
    )
  }

  deleteWebhookSubscription(id) {
    return this.delete(`hooks/${id}`)
  }

  async deleteWebhookSubscriptions() {
    const { data: subscriptions } = await this.getWebhookSubscriptions()

    return Promise.all(subscriptions.map(({ id }) => this.deleteWebhookSubscription(id)))
  }
}
