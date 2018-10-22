/**
 * GraphQL mutations
 */
import gql from "graphql-tag";
import { userFragment, eventUserFragment } from "./graphqlQueryFragments";

export const editMeMutation = gql`
  mutation editMeMutation($user: UserInput!) {
    editMe(user: $user) {
      ...user
    }
  }
  ${userFragment}
`;

export const joinEventMutation = gql`
  mutation joinEventMutation($code: String!) {
    joinEvent(code: $code) {
      ...eventUser
    }
  }
  ${eventUserFragment}
`;
