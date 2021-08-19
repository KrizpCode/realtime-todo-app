import { IResolvers } from "@graphql-tools/utils";
import { v4 as uuidv4 } from 'uuid';

import { Todo, MutationAddTodoArgs, MutationRemoveTodoArgs, MutationUpdateTodoArgs } from "../generated";

export const TodoResolvers: IResolvers = {
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
        },

        async updateTodo (_: void, { id }: MutationUpdateTodoArgs, { todos }: { todos: Todo[]}): Promise<Todo> {
            const index = todos.findIndex((todo: Todo) => todo.id === id);
            todos[index].completed = !todos[index].completed;

            return todos[index];
        }
    }
}