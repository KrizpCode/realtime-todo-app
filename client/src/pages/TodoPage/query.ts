import { gql } from '@apollo/client';

const TODOLIST_ID_SUBSCRIPTION = gql`
    subscription todosByListId ($listId: ID!) {
        todosByListId(listId: $listId) {
            id
            title
            members {
                email
            }
            todos {
                id
                listId
                title
                completed
            }
            admin {
                email
            }
            frozen
        }
    }
`