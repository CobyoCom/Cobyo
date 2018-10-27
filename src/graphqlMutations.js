/**
 * GraphQL mutations
 */
import gql from "graphql-tag";
import {
  baseEventFragment,
  userFragment,
  eventUserFragment
} from "./graphqlQueryFragments";

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
      ...baseEvent
    }
  }
  ${baseEventFragment}
`;
