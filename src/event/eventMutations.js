/**
 * GraphQL Mutations on the Event Page
 *
 * @module eventMutations.js
 */
import gql from "graphql-tag";
import {eventFragment, eventUserFragment, reactionFragment} from './eventQueryFragments';

export const createEventMutation = gql`
  mutation createEvent(
    $placeId: String!,
    $eventName: String!
  ) {
    createEvent(
      placeId: $placeId,
      eventName: $eventName
    ) {
      ...event
    }
  }
${eventFragment}`;

export const updateEventUserMutation = gql`
  mutation updateEventUser(
    $eventId: String!,
    $userName: String!,
    $duration: Int,
    $updatedAt: Int,
    $travelMode: String,
    $hasLeft: Boolean
  ) {
    updateEventUser(
      eventId: $eventId,
      userName: $userName,
      duration: $duration,
      updatedAt: $updatedAt,
      travelMode: $travelMode,
      hasLeft: $hasLeft
    ) {
      ...eventUser
    }
  }
${eventUserFragment}`;

export const createReactionMutation = gql`
  mutation createReaction(
    $notificationId: Int!, 
    $userName: String!, 
    $emoji: String!
  ) {
    createReaction(
      notificationId: $notificationId, 
      userName: $userName, 
      emoji: $emoji
    ) {
      ...reaction
    }
  }
${reactionFragment}`;

export const deleteReactionMutation = gql`
  mutation deleteReaction(
    $notificationId: Int!,
    $userName: String!,
    $emoji: String!
  ) {
    deleteReaction(
      notificationId: $notificationId,
      userName: $userName,
      emoji: $emoji
    )
  }
`;