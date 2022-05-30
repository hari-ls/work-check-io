import { gql } from "@apollo/client";

// LOGIN
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        firstName
        lastName
      }
    }
  }
`;

// REGISTER
export const REGISTER = gql`
  mutation Register(
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String
  ) {
    register(
      lastName: $lastName
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
      firstName: $firstName
    ) {
      token
      user {
        _id
        email
        firstName
        lastName
        username
      }
    }
  }
`;

// CHECKIN
export const CHECKIN = gql`
  mutation Checkin($start: String!) {
    entry: checkIn(start: $start) {
      _id
      checkIn
      plan
      summary
    }
  }
`;

// UPDATE_ENTRY
export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($id: ID!, $plan: String, $summary: String) {
    entry: updateEntry(_id: $id, plan: $plan, summary: $summary) {
      _id
      checkIn
      plan
      summary
    }
  }
`;

// CHECKOUT
export const CHECKOUT = gql`
  mutation Checkout(
    $id: ID!
    $productivity: Float!
    $mood: Moods!
    $end: String!
    $plan: String
    $summary: String
  ) {
    entry: checkOut(
      _id: $id
      productivity: $productivity
      mood: $mood
      end: $end
      plan: $plan
      summary: $summary
    ) {
      _id
      checkIn
      checkOut
      duration
      productivity
      mood
    }
  }
`;

// REMOVE_ENTRY
export const REMOVE_ENTRY = gql`
  mutation RemoveEntry($id: ID!) {
    entry: removeEntry(_id: $id) {
      __typename
    }
  }
`;

// UPDATE_PROFILE
export const UPDATE_INFO = gql`
  mutation updateUserInfo(
    $firstName: String
    $lastName: String
    $email: String
    $username: String
  ) {
    updateUserInfo(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
    ) {
      _id
      firstName
      lastName
      email
      username
    }
  }
`;

// UPDATE_PASSWORD
export const CHANGE_PASSWORD = gql`
  mutation changePassword($newPassword: String!, $confirmNewPassword: String!) {
    changePassword(
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      _id
      firstName
      lastName
      email
      username
    }
  }
`;
