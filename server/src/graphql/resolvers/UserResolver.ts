import { IResolvers } from "@graphql-tools/utils";
import { v4 as uuidv4 } from 'uuid';

import { Todo, MutationAddTodoArgs, MutationRemoveTodoArgs } from "../generated";

export const UserResolvers: IResolvers = {
    Query: {
        async todos (_: void, args: void, { todos }: { todos: Todo[]}): Promise<Todo[]> {
            return todos;
        }
    },

    Mutation: {
        async addTodo (_: void, { title }: MutationAddTodoArgs, { todos }: { todos: Todo[]}): Promise<Todo> {
            const newTodo: Todo = {
                id: uuidv4(),
                title: title,
                completed: false,
            };

            todos.push(newTodo);
            return newTodo;
        },

        async removeTodo (_: void, { id }: MutationRemoveTodoArgs, { todos }: { todos: Todo[]}): Promise<Boolean> {
            const index = todos.findIndex((todo: Todo) => todo.id === id);
            todos.splice(index, 1);

            return true;
        }
    }
}