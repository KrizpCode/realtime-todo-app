import { gql } from '@apollo/client';

export const TODOS_QUERY = gql`
    query TodosList {
        todos {
            id
            title
            completed
        }
    }
`