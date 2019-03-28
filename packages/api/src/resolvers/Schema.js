const Query = {
  hello: () => 'Hello, world!',
}

const Subscription = {
  hello: (rootValue, args, { pubsub }) => pubsub.asyncIterator('HELLO'),
}

export default { Query, Subscription }
