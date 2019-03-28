import merge from 'lodash.merge'

import Schema from './Schema'
import User from './User'
import Invitee from './Invitee'

const resolvers = merge([Schema, User, Invitee])

export default resolvers
