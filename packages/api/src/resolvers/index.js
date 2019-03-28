import merge from 'lodash.merge'

import Schema from './Schema'
import User from './User'

const resolvers = merge([Schema, User])

export default resolvers
