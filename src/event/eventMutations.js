/**
 * GraphQL Mutations on the Event Page
 *
 * @module eventMutations.js
 */
import gql from "graphql-tag";
import {eventFragment, reactionFragment} from './eventQueryFragments';

export const createEventMutation = gql`
  mutation createEventMutation($placeId: String!) {
    createEvent(placeId: $placeId) {
      ...event
    }
  }
${eventFragment}`;

export const updateEventUserMutation = gql`
  mutation updateEventUserMutation(
    $eventId: Int!,
    $userName: String!,
    $duration: Int,
    $lastUpdated: Int,
    $travelMode: String,
    $hasLeft: Boolean
  ) {
    updateEventUser(
      eventId: $eventId,
      userName: $userName,
      duration: $duration,
      lastUpdated: $lastUpdated,
      travelMode: $travelMode,
      hasLeft: $hasLeft
    ) {
      ...eventUser
    }
  }
`;

export const createReactionMutation = gql`
  mutation createReactionMutation(
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
  mutation deleteReactionMutation(
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