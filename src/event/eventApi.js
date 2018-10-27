import fetchGraphQL from "../helpers/fetchGraphQL";
import { baseEventQuery, eventUsersQuery } from "../graphqlQueries";
import { joinEventMutation } from "../graphqlMutations";
import logger from "../helpers/logger";

export async function fetchEventApi(code) {
  try {
    const { data } = await fetchGraphQL({
      query: baseEventQuery,
      variables: { code }
    });
    return data;
  } catch (error) {
    logger(`fetchEventApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function joinEventApi(code) {
  try {
    const { data } = await fetchGraphQL({
      query: joinEventMutation,
      variables: { code }
    });
    return data;
  } catch (error) {
    logger(`joinEventApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function fetchEventUsersApi(code) {
  try {
    const { data } = await fetchGraphQL({
      query: eventUsersQuery,
      variables: { code }
    });
    return data;
  } catch (error) {
    logger(`fetchEventUsersApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}
