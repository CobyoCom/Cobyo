/**
 * GraphQL fragments for the Event Page
 *
 * @module eventQueryFragments.js
 */
import gql from 'graphql-tag'

export const eventFragment = gql`
  fragment event on Event {
    eventId
    eventName
    placeId
  }
`;

export const userFragment = gql`
  fragment user on User {
    userId
    name
  }
`;

export const eventUserFragment = gql`
  fragment eventUser on EventUser {
    lastUpdated: updatedAt
    duration
    hasLeft
    userName
    travelMode
  }
`;

export const reactionFragment = gql`
  fragment reaction on Reaction {
    emoji
    userName
  }
`;

export const notificationFragment = gql`
  fragment notification on Notification {
    message
    createdAt
    reactions {
      ...reaction
    }
  }
${reactionFragment}`;