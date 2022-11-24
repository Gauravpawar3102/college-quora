import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreate(title: String!, content: String!): PostPayLoad!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    publishedAt: Boolean!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!

    posts: [Post!]!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type UserErrors {
    message: String!
  }

  type PostPayLoad {
    userErrors: [UserErrors!]!
    post: Post
  }
`;

export { typeDefs };
