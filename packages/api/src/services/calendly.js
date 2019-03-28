import { RESTDataSource } from 'apollo-datasource-rest'

export default class Calendly extends RESTDataSource {
  constructor(token) {
    super()
    this.baseURL = 'https://calendly.com/api/v1/'
    this.token = token
  }

  willSendRequest(request) {
    request.headers.set('X-TOKEN', this.token)
  }

  async getUser() {
    return this.get('users/me')
  }
}
