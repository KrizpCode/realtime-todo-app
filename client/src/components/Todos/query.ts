import { gql } from '@apollo/client';

// const TODOS_SUBSCRIPTION = gql`
//     subscription newTodo($listId: ID!) {
//         todosByListId(listId: $listId) {
//             id
//             listId
//             title
//             todos {
//                 id
//                 listId
//                 completed
                
//             }
//         }
//     }
// `

const REMOVE_TODO_MUTATION = gql`
    mutation RemoveTodo($id: ID!, $listId: ID!) {
        removeTodo(listId: $listId, id: $id)
    }
`

const UPDATE_TODO_MUTATION = gql`
    mutation UpdateTodo($id: ID!, $listId: ID!) {
        updateTodo(listId: $listId, id: $id) {
            id
            title
            completed
        }
    }
`