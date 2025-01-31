import questionsData from '@/data/questions.json';

export const resolvers = {
  Query: {
    getQuestions: () => {
      return questionsData;
    },
  },
};
