const Subscription = {
  inviteeEvents: {
    subscribe: (rootValue, args, { pubsub }) =>
      pubsub.asyncIterator(['INVITEE_CREATED', 'INVITEE_CANCELED']),
  },
}

export default { Subscription }
