import fetchGraphQL from "../helpers/fetchGraphQL";
import { createEventMutation } from "../graphqlMutations";
import logger from "../helpers/logger";

export async function createEventApi(event) {
  console.log(event);
  try {
    const { data } = await fetchGraphQL({
      query: createEventMutation,
      variables: { event }
    });
    return data;
  } catch (error) {
    logger(`createEventApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}
