import fetchGraphQL from "../helpers/fetchGraphQL";
import { createEventMutation, editEventMutation } from "../graphqlMutations";
import logger from "../helpers/logger";

export async function createEventApi(event) {
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

export async function editEventApi({code, event}) {
  try {
    const { data } = await fetchGraphQL({
      query: editEventMutation,
      variables: { code, event }
    });
    return data;
  } catch (error) {
    logger(`editEventApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}
