import { Question } from '@/types/questions';

interface GraphQLResponse {
  data?: {
    getQuestions: Question[];
  };
}

const fetchQuestions = async (): Promise<Question[]> => {
  const query = `
    query {
      getQuestions {
        id
        question
        money
        answers {
          id
          text
          isCorrect
        }
      }
    }
  `;

  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = (await res.json()) as GraphQLResponse;
  return json.data?.getQuestions || [];
};

export { fetchQuestions };
