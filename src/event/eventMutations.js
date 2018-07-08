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

export const endEventMutation = gql`
  mutation endEvent($eventId: String!) {
    endEvent(eventId: $eventId) {
      ...event
    }
  }
${eventFragment}`;

export const updateEventUserMutation = gql`
  mutation updateEventUser(
    $eventId: String!,
    $userName: String!,
    $duration: Int,
    $updatedAt: String,
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
    $eventId: String!, 
    $notificationCreatedAt: String!
    $userName: String!, 
    $emoji: String!
  ) {
    createReaction(
      eventId: $eventId, 
      notificationCreatedAt: $notificationCreatedAt,
      userName: $userName, 
      emoji: $emoji
    ) {
      ...reaction
    }
  }
${reactionFragment}`;

export const deleteReactionMutation = gql`
  mutation deleteReaction(
    $eventId: String!, 
    $notificationCreatedAt: String!
    $userName: String!, 
    $emoji: String!
  ) {
    deleteReaction(
      eventId: $eventId, 
      notificationCreatedAt: $notificationCreatedAt,
      userName: $userName, 
      emoji: $emoji
    ) {
      ...reaction
    }
  }
${reactionFragment}`;