import ensureEnvironment from './ensureEnvironment'

// WARNING: These environment variables are exposed to the client.
export default ensureEnvironment(['API_URL'])
