import { gql } from "@apollo/client";

// COMPLIE JOURNAL
export const COMPLIE_JOURNAL = gql`
  query Journal($start: String!, $end: String!) {
    journal(start: $start, end: $end) {
      from
      to
      entries {
        _id
        checkIn
        plan
        summary
        productivity
        mood
        checkOut
        duration
      }
    }
  }
`;

// OPEN ENTRY
export const OPEN_ENTRY = gql`
  query Existing {
    entry: existing {
      _id
      checkIn
      plan
      summary
    }
  }
`;

// ENTRY DETAILS
export const ENTRY_DETAILS = gql`
  query Entry($id: ID!) {
    entry(_id: $id) {
      checkIn
      plan
      summary
      productivity
      mood
      checkOut
      duration
    }
  }
`;

// USER INFO
export const USER_INFO = gql`
  query User {
    user {
      username
      firstName
      lastName
      email
    }
  }
`;
