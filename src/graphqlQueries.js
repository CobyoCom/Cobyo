/**
 * GraphQL fragments
 */
import gql from "graphql-tag";
import {
  baseEventFragment,
  eventUserFragment,
  eventNotificationFragment
} from "./graphqlQueryFragments";

/**
 * When a user hits the event page
 */
export const baseEventQuery = gql`
  query eventQuery($code: String!) {
    event(code: $code) {
      ...baseEvent
      me {
        ...eventUser
      }
    }
  }
  ${baseEventFragment}
  ${eventUserFragment}
`;

/**
 * See if the user is "logged in"
 */
export const meQuery = gql`
  query {
    me {
      name
    }
  }
`;

/**
 * When a user joins the event, get the event users
 */
export const eventUsersQuery = gql`
  query eventUsersQuery($code: String!) {
    event(code: $code) {
      code
      eventUsers {
        ...eventUser
      }
    }
  }
  ${eventUserFragment}
`;

export const eventNotificationsQuery = gql`
  query eventNotificationsQuery($code: String!) {
    event(code: $code) {
      code
      notifications {
        ...eventNotification
      }
    }
  }
  ${eventNotificationFragment}
`;
