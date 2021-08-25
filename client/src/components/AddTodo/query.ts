import { gql } from '@apollo/client';

export const ADD_TODO_MUTATION = gql`
    mutation AddTodo($listId: ID!, $title: String!) {
        addTodo(listId: $listId, title: $title) {
            id
            title
            completed
        }
    }
`
