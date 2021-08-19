import { gql } from '@apollo/client';

const TODOS_QUERY = gql`
    query TodoList {
        todos {
            id
            title
            completed
        }
    }
`

const REMOVE_TODO_MUTATION = gql`
    mutation RemoveTodo($id: ID!) {
        removeTodo(id: $id)
    }
`

const UPDATE_TODO_MUTATION = gql`
    mutation UpdateTodo($id: ID!) {
        updateTodo(id: $id) {
            id
            title
            completed
        }
    }
`