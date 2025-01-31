import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers } from './resolvers';

import type { IResolvers } from '@graphql-tools/utils';

const typeDefs = `
  type Answer {
    id: String!
    text: String!
    isCorrect: Boolean!
  }

  type Question {
    id: ID!
    question: String!
    money: Int!
    answers: [Answer!]!
  }

  type Query {
    getQuestions: [Question!]!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as IResolvers,
});
