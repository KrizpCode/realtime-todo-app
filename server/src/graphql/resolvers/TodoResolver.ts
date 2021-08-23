import { IResolvers } from "@graphql-tools/utils";
import { v4 as uuidv4 } from 'uuid';

import { Todo, MutationAddTodoArgs, MutationRemoveTodoArgs, MutationUpdateTodoArgs } from "../generated";

const NEW_TODO = ('NEW_TODO');

export const TodoResolvers: IResolvers = {
    Query: {
        async todos (_: void, args: void, { todos }: { todos: Todo[]}): Promise<Todo[]> {
            return todos;
        }
    },

    Mutation: {
        async addTodo (_: void, { title }: MutationAddTodoArgs, { todos, pubsub }): Promise<Todo> {
            const newTodo: Todo = {
                id: uuidv4(),
                title: title,
                completed: false,
            };
            
            todos.push(newTodo);
            pubsub.publish(NEW_TODO, {
                todos: todos
            })
            return newTodo;
        },

        async removeTodo (_: void, { id }: MutationRemoveTodoArgs, { todos, pubsub }): Promise<Boolean> {
            const index = todos.findIndex((todo: Todo) => todo.id === id);
            todos.splice(index, 1);
            pubsub.publish(NEW_TODO, {
                todos: todos
            })
            return true;
        },

        async updateTodo (_: void, { id }: MutationUpdateTodoArgs, { todos, pubsub }): Promise<Todo> {
            const index = todos.findIndex((todo: Todo) => todo.id === id);
            todos[index].completed = !todos[index].completed;
            pubsub.publish(NEW_TODO, {
                todos: todos
            })
            return todos[index];
        }
    },
    Subscription: {
        todos: {
            subscribe: (_: void, __: void, {pubsub}) => pubsub.asyncIterator(NEW_TODO)
        }
    }
}