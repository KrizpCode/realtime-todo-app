import { gql } from '@apollo/client';

const ADD_TODO_MUTATION = gql`
    mutation AddTodo($title: String!) {
        addTodo(title: $title) {
            id
            title
            completed
        }
    }
`