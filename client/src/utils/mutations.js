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
        existing
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
// export const CHECKIN = gql``;

// UPDATE_ENTRY
// export const UPDATE_ENTRY = gql``;

// CHECKOUT
// export const CHECKOUT = gql``;

// DELETE_ENTRY
// export const DELETE_ENTRY = gql``;

// UPDATE_PROFILE
// export const UPDATE_PROFILE = gql``;

// UPDATE_PASSWORD
// export const UPDATE_PROFILE = gql``;
