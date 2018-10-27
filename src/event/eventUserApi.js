import fetchGraphQL from "../helpers/fetchGraphQL";
import { updateEventUserMutation } from "../graphqlMutations";
import logger from "../helpers/logger";

export async function updateEventUserApi({ code, eventUser }) {
  try {
    const { data } = await fetchGraphQL({
      query: updateEventUserMutation,
      variables: {
        code,
        eventUser
      }
    });
    return data;
  } catch (error) {
    logger(`updateEventUserApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}
