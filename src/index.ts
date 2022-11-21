import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient, Prisma } from '@prisma/client';
import { typeDefs } from './schema';
import { Query } from './resolvers/index';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`server ready on ${url}`);
});
