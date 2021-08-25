import { gql } from "@apollo/client";

export const REMOVE_MEMBER_MUTATION = gql`
    mutation RemoveMember($id: ID!, $email: String!) {
        removeMember(id: $id, email: $email)
    }
`