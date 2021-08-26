import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoList } from "../graphql/generated";

const listId = uuidv4();

export const todoLists: TodoList[] = [
    {
        id: listId,
        title: 'Shopping List',
        admin: {
            email: 'juhaniish@live.se'
        },
        members: [
            {
                email: 'juhaniish@live.se'
            }
        ],
        frozen: false,
        todos: [
            {
                id: uuidv4(),
                listId,
                title: 'Understand GraphQL',
                completed: true
            },
            {
                id: uuidv4(),
                listId,
                title: 'Buy energy drink',
                completed: false
            },
            {
                id: uuidv4(),
                listId,
                title: 'Flex my skills',
                completed: false
            },
            {
                id: uuidv4(),
                listId,
                title: 'Understand TypeScript',
                completed: true
            },
            {
                id: uuidv4(),
                listId,
                title: 'Celebrate getting codegen to work',
                completed: true
            }
        ]
    }
];