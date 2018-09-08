import { post } from './axios';

const GRAPHQL_ENDPOINT = '/graphql';

export default function({ query, variables }) {
  const path = query.path || query.loc.source.body;

  if (!path) {
    throw new Error('No path was found.');
  }

  return post(GRAPHQL_ENDPOINT, {
    query: path,
    variables
  });
}
