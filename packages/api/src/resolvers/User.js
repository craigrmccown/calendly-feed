const Query = {
  me: (rootValue, args, { dataSources: { calendly } }) =>
    calendly.getUser().then(({ data: { id, attributes: { name, email, avatar: { url } } } }) => ({
      id,
      name,
      email,
      avatarUrl: url,
    })),
}

export default { Query }
