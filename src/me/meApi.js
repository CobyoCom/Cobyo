import fetchGraphQL from "../helpers/fetchGraphQL";
import { meQuery } from "../graphqlQueries";
import { editMeMutation } from "../graphqlMutations";
import logger from "../helpers/logger";

export async function fetchMeApi() {
  try {
    const { data } = await fetchGraphQL({ query: meQuery });
    return data;
  } catch (error) {
    logger(`fetchMeApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}

export async function editMeApi(name) {
  try {
    const { data } = await fetchGraphQL({
      query: editMeMutation,
      variables: {
        user: {
          name
        }
      }
    });
    return data;
  } catch (error) {
    logger(`fetchMeApi ${error.response.status}: ${error.message}`);
    throw new Error();
  }
}
