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

export const updateEventUserMutation = gql`
  mutation updateEventUserMutation(
    $code: String!
    $eventUser: EventUserInput!
  ) {
    updateEventUser(eventCode: $code, eventUser: $eventUser) {
      ...eventUser
    }
  }
  ${eventUserFragment}
`;

export const createEventMutation = gql`
  mutation createEventMutation($event: EventInput!) {
    createEvent(event: $event) {
      code
    }
  }
`;

export const editEventMutation = gql`
  mutation editEventMutation($code: String!, $event: EventInput!) {
    editEvent(code: $code, event: $event) {
      code
    }
  }
`;
