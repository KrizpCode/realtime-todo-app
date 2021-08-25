import { gql } from "@apollo/client";

export const ADD_MEMBER_MUTATION = gql`
    mutation AddMember($id: ID!, $email: String!) {
        addMember(id: $id, email: $email) {
            email
        }
    }
`