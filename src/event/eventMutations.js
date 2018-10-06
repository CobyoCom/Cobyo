/**
 * GraphQL Mutations on the Event Page
 *
 * @module eventMutations.js
 */
import gql from "graphql-tag";
import {
  eventFragment,
  eventUserFragment,
  reactionFragment
} from "./eventQueryFragments";

export const createEventMutation = gql`
  mutation createEvent($event: EventInput!) {
    createEvent(event: $event) {
      ...event
    }
  }
  ${eventFragment}
`;

export const editEventMutation = gql`
  mutation editEvent($code: String!, $event: EventInput!) {
    editEvent(code: $code, event: $event) {
      ...event
    }
  }
  ${eventFragment}
`;

export const endEventMutation = gql`
  mutation endEvent($eventId: String!) {
    endEvent(code: $eventId) {
      ...event
    }
  }
  ${eventFragment}
`;

export const updateEventUserMutation = gql`
  mutation updateEventUser($eventCode: String!, $eventUser: EventUserInput!) {
    updateEventUser(eventCode: $eventCode, eventUser: $eventUser) {
      ...eventUser
    }
  }
  ${eventUserFragment}
`;

export const createReactionMutation = gql`
  mutation createReaction(
    $eventCode: String!
    $notificationIndex: Int!
    $reaction: ReactionInput!
  ) {
    createReaction(
      eventCode: $eventCode
      notificationIndex: $notificationIndex
      reaction: $reaction
    ) {
      ...reaction
    }
  }
  ${reactionFragment}
`;

export const deleteReactionMutation = gql`
  mutation deleteReaction(
    $eventCode: String!
    $notificationIndex: Int!
    $reaction: ReactionInput!
  ) {
    deleteReaction(
      eventCode: $eventCode
      notificationIndex: $notificationIndex
      reaction: $reaction
    ) {
      ...reaction
    }
  }
  ${reactionFragment}
`;
