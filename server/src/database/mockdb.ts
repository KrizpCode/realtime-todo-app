import { v4 as uuidv4 } from 'uuid';
import { Todo } from "../graphql/generated";

export const todos: Todo[] = [
    {
        id: uuidv4(),
        title: 'Understand GraphQL',
        completed: true
    },
    {
        id: uuidv4(),
        title: 'Buy energy drink',
        completed: false
    },
    {
        id: uuidv4(),
        title: 'Flex my skills',
        completed: false
    },
    {
        id: uuidv4(),
        title: 'Understand TypeScript',
        completed: true
    },
    {
        id: uuidv4(),
        title: 'Celebrate getting codegen to work',
        completed: true
    }
];