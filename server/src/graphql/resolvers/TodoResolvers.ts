import { IResolvers } from "@graphql-tools/utils";
import { v4 as uuidv4 } from 'uuid';
import { PubSub } from "graphql-subscriptions";

import { Todo, User, MutationAddTodoArgs, MutationRemoveMemberArgs, MutationRemoveTodoArgs, MutationUpdateTodoArgs, TodoList, SubscriptionTodosByListIdArgs, MutationAddMemberArgs } from "../generated";

const subscribers: { (): void }[] = [];
const onTodoUpdates = (fn: () => void): void => {
    subscribers.push(fn)
    return
};

const filterTodosByListId = (id: string, todoLists: TodoList[]) => {
    const index = todoLists.findIndex(todoList => todoList.id === id);
    return todoLists[index]
}

export const TodosResolvers: IResolvers = {
    Mutation: {
        addTodo: (_: void, { listId, title }: MutationAddTodoArgs, { todoLists }: { todoLists: TodoList[]}): Todo => {
            const index = todoLists.findIndex(todoList => todoList.id === listId)
            const newTodo: Todo = {
                id: uuidv4(),
                listId,
                title,
                completed: false,
            };
            
            todoLists[index].todos?.push(newTodo);

            subscribers.forEach(fn => fn());
            return newTodo;
        },

        removeTodo: (_: void, { listId, id }: MutationRemoveTodoArgs, { todoLists }: { todoLists: TodoList[]}): Boolean => {
            const indexOfTodoList = todoLists.findIndex((todoList) => todoList.id === listId);

            if (indexOfTodoList === -1) {
                return false
            }

            const indexOfTodo = todoLists[indexOfTodoList].todos!.findIndex((todoList) => todoList.id === id)

            if (indexOfTodo === -1) {
                return false
            }

            todoLists[indexOfTodoList].todos?.splice(indexOfTodo, 1);

            subscribers.forEach(fn => fn());
            return true;
        },

        updateTodo: (_: void, { listId, id }: MutationUpdateTodoArgs, { todoLists }: { todoLists: TodoList[]}): (Todo | undefined) => {
            const indexOfTodoList = todoLists.findIndex((todoList) => todoList.id === listId);

            if (indexOfTodoList === -1) {
                return
            }

            let updatedTodo: (Todo | undefined);

            todoLists[indexOfTodoList].todos!.forEach(todo => {
                if(todo.id === id) {
                    todo.completed = !todo.completed
                    updatedTodo = todo;
                    return
                }
                return
            })

            subscribers.forEach(fn => fn());

            return updatedTodo;
        },

        addMember: (_: void, { id, email }: MutationAddMemberArgs, { todoLists }: { todoLists: TodoList[]}): (User | undefined) => {
            const indexOfTodoList = todoLists.findIndex((todoList: TodoList) => todoList.id === id);
            if (indexOfTodoList === -1) {
                return
            }

            if(todoLists[indexOfTodoList].members.find(member => member.email === email)) {
                return
            }

            const newMember: User = {
                email
            }

            todoLists[indexOfTodoList].members.push(newMember)

            subscribers.forEach(fn => fn());
            return newMember;
        },

        

        removeMember: (_: void, { id, email }: MutationRemoveMemberArgs, { todoLists }: { todoLists: TodoList[]}): Boolean => {
            const indexOfTodoList = todoLists.findIndex((todoList) => todoList.id === id);

            if (indexOfTodoList === -1) {
                return false
            }

            const indexOfTodo = todoLists[indexOfTodoList].members?.findIndex((member) => member.email === email)

            if (indexOfTodo === -1) {
                return false
            }

            todoLists[indexOfTodoList].members!.splice(indexOfTodo, 1);

            subscribers.forEach(fn => fn());
            return true;
        },

        
    },

    Subscription: {
        todosByListId: {
            subscribe: (_: void, { listId }: SubscriptionTodosByListIdArgs, {pubsub, todoLists}: { pubsub: PubSub, todoLists: TodoList[]}) => {
                const channel = uuidv4();
                onTodoUpdates(() => pubsub.publish(channel, { todosByListId: filterTodosByListId(listId, todoLists) }));
                setTimeout(() => pubsub.publish(channel, { todosByListId: filterTodosByListId(listId, todoLists) }), 0);
                return pubsub.asyncIterator(channel);
            }
        }
    }
}