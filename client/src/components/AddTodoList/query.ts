import { gql } from '@apollo/client';

export const ADD_TODOLIST_MUTATION = gql`
    mutation AddTodoList($title: String!, $email: String!) {
        addTodoList(title: $title, email: $email) {
            title
        }
    }
`
