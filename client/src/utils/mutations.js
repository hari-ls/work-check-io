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
        email
      }
    }
  }
`;

// REGISTER
export const REGISTER = gql`
    mutation Register($firstName: String!, $lastName: String!, username: String!, email: String!, password: String!) {
        register(firstName: $firstName, lastName: $lastName, username: $username, password: $password) {
            token
            user {
                _id
                username
                firstName
                lastName
                email
            }
        }
    }
`;

// CREATE_WORKSPACE
export const CREATE_WORKSPACE = gql``;

// UPDATE_WORKSPACE
export const UPDATE_WORKSPACE = gql``;

// DELETE_WORKSPACE
export const DELETE_WORKSPACE = gql``;

// CREATE_SCHEDULE
export const CREATE_SCHEDULE = gql``;

// UPDATE_SCHEDULE
export const UPDATE_SCHEDULE = gql``;

// DELTE_SCHEDULE
export const DELTE_SCHEDULE = gql``;

// CHECKIN
export const CHECKIN = gql``;

// UPDATE_ENTRY
export const UPDATE_ENTRY = gql``;

// DELETE_ENTRY
export const DELETE_ENTRY = gql``;

// CHECKOUT
export const CHECKOUT = gql``;

// CREATE_JOURNAL
export const CREATE_JOURNAL = gql``;

// DELETE_JOURNAL
export const DELETE_JOURNAL = gql``;

// UPDATE_PROFILE
export const UPDATE_PROFILE = gql``;
