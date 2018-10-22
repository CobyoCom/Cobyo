/**
 * GraphQL fragments
 */
import gql from 'graphql-tag';

export const placeFragment = gql`
  fragment place on Place {
    address
    latitude
    longitude
    googlePlaceId
  }
`;

export const userFragment = gql`
  fragment user on User {
    name
  }
`;

export const eventUserFragment = gql`
  fragment eventUser on EventUser {
    updatedTime
    duration
    hasLeft
    travelMode
    user {
      ...user
    }
  }
  ${userFragment}
`;

export const reactionFragment = gql`
  fragment reaction on Reaction {
    emoji
    user {
      ...user
    }
  }
  ${userFragment}
`;

export const eventNotificationFragment = gql`
  fragment eventNotification on Notification {
    message
    createdTime
    reactions {
      ...reaction
    }
  }
  ${reactionFragment}
`;

/**
 * Scalar fields of event type
 */
export const baseEventFragment = gql`
  fragment baseEvent on Event {
    code
    name
    scheduledTime
    endedTime
    place {
      ...place
    }
  }
  ${placeFragment}
`;
