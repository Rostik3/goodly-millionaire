import { graphql } from 'graphql';
import { NextResponse } from 'next/server';

import { schema } from './schema';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function POST(request: Request) {
  try {
    const { query, variables } = (await request.json()) as GraphQLRequest;

    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({
      errors: [{ message: (err as Error).message }],
    });
  }
}
