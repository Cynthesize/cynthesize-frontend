module.exports = {
  client: {
    service: {
      name: 'cynthesize-back',
      url: 'https://cynthesize-back.herokuapp.com/v1alpha1/graphql',
      headers: {
        'x-hasura-admin-secret': 'secret'
      }
    }
  }
};
