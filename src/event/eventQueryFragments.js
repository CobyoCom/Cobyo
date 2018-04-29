/**
 * GraphQL fragments for the Event Page
 *
 * @module eventQueryFragments.js
 */
import gql from 'graphql-tag'

export const eventFragment = gql`
  fragment event on Event {
    eventId
    location {
      name
      placeId
    }
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
    updatedAt
    duration
    user {
      ...user
    }
  }
${userFragment}`;

export const reactionFragment = gql`
  fragment reaction on Reaction {
    emoji
    user {
      ...user
    }
  }
${userFragment}`;

export const notificationFragment = gql`
  fragment notification on Notification {
    notificationId
    message
    createdAt
    reactions {
      ...reaction
    }
  }
${reactionFragment}`;