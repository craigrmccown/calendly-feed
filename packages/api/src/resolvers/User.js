const Query = {
  me: (rootValue, args, { dataSources: { calendly } }) =>
    calendly.getUser().then(({ data: { attributes: { name, email, avatar: { url } } } }) => ({
      name,
      email,
      avatarUrl: url,
    })),
}

export default { Query }
