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

export const eventUserEdgeFragment = gql`
  fragment eventUserEdge on EventUserEdge {
    lastUpdatedTime
    estimatedTimeArrival
    users {
      ...user
    }
  }
${userFragment}`;

export const eventNotificationFragment = gql`
  fragment eventNotification on EventNotification {
    message
    dateCreated
  }
`;