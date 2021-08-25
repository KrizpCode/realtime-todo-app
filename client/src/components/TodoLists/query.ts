import { gql } from '@apollo/client';

const TODOLISTS_QUERY = gql`
    query TodoListByEmail($email: String!) {
        todoListsByEmail(email: $email) {
            id
            title
            admin {
                email
            }
            members {
                email
            }
        }
    }
`

const TODOLISTS_SUBSCRIPTION = gql`
    subscription newTodoLists($email: String!) {
        todoLists(email: $email) {
            id
            title
            admin {
                email
            }
            members {
                email
            }
        }
    }
`

const REMOVE_TODOLIST_MUTATION = gql`
    mutation RemoveTodoList($id: ID!) {
        removeTodoList(id: $id)
    }
`