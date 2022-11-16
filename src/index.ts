import { ApolloServer, gql } from 'apollo-server';

import { typeDefs } from './schema';
import { Query } from './resolvers/index';
const resolvers = {
  Query: {
    hello: () => 'World',
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
});

server.listen().then(({ url }) => {
  console.log(`server ready on ${url}`);
});
