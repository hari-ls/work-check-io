import { gql } from "@apollo/client";

// LIST WORKSPACES
export const USER_WORKSPACES = gql`
    query Workspaces() {
        workspaces {
            name
            slug
            owner {
                _id
                username
            }
        }
    }
`;

// WORKSPACE DETAILS

// LIST SCHEDULES

// SCHEDULE INFO

// LIST ENTRIES

// ENTRY DETAILS

// LIST JOURNALS

// JOURNAL DETAILS

// READ PROFILE
