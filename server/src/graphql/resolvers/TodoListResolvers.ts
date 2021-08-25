import { IResolvers } from "@graphql-tools/utils";
import { v4 as uuidv4 } from 'uuid';
import { PubSub } from "graphql-subscriptions";

import { TodoList, QueryTodoListsByEmailArgs, MutationAddTodoListArgs, MutationRemoveTodoListArgs, SubscriptionTodoListsArgs, SubscriptionTodoListByIdArgs, MutationFreezeListArgs } from "../generated";

const subscribers: { (): void }[] = [];
const onTodoListUpdates = (fn: () => void): void => {
    subscribers.push(fn)
    return
};

const filterTodoListsByEmail = (email: string, todoLists: TodoList[]) => {
    return todoLists.filter(todoList => todoList.members.find(member => member.email === email))
}

const filterTodosByListId = (id: string, todoLists: TodoList[]) => {
    const index = todoLists.findIndex(todoList => todoList.id === id);
    return todoLists[index]
}

export const TodoListResolvers: IResolvers = {
    Query: {
        todoListsByEmail: (_: void, { email }: QueryTodoListsByEmailArgs, { todoLists }: { todoLists: TodoList[]}): TodoList[] => {
            const todoListByEmail = filterTodoListsByEmail(email, todoLists);
            return todoListByEmail;
        }
    },

    Mutation: {
        addTodoList: (_: void, { title, email }: MutationAddTodoListArgs, { todoLists }: { todoLists: TodoList[]}): TodoList => {

        const newTodoList: TodoList = {
            id: uuidv4(),
            title,
            admin: {email},
            members: [{email}],
            frozen: false,
            todos: []
        }
        todoLists.push(newTodoList);

        subscribers.forEach(fn => fn());
        return newTodoList;
        },

        removeTodoList: (_: void, { id }: MutationRemoveTodoListArgs, { todoLists }: { todoLists: TodoList[]}): Boolean => {
            const indexOfTodoList = todoLists.findIndex((todoList: TodoList) => todoList.id === id);
            if (indexOfTodoList === -1) {
                return false
            }

            todoLists.splice(indexOfTodoList, 1);
            subscribers.forEach(fn => fn());

            return true;
        },

        freezeList: (_: void, { id }: MutationFreezeListArgs, { todoLists }: { todoLists: TodoList[]}): Boolean => {
            const indexOfTodoList = todoLists.findIndex((todoList) => todoList.id === id);

            todoLists[indexOfTodoList].frozen = !todoLists[indexOfTodoList].frozen;
            subscribers.forEach(fn => fn());
            return true;
        }
    },

    Subscription: {
        todoListById: {
            subscribe: (_: void, { id }: SubscriptionTodoListByIdArgs, {pubsub, todoLists}: { pubsub: PubSub, todoLists: TodoList[]}) => {
                const channel = uuidv4();
                onTodoListUpdates(() => pubsub.publish(channel, { todoListById: filterTodosByListId(id, todoLists) }));
                setTimeout(() => pubsub.publish(channel, { todoListById: filterTodosByListId(id, todoLists) }), 0);
                return pubsub.asyncIterator(channel);
            }
        },
        todoLists: {
            subscribe: (_: void, { email }: SubscriptionTodoListsArgs, {pubsub, todoLists}: { pubsub: PubSub, todoLists: TodoList[]}) => {
                const channel = uuidv4();
                onTodoListUpdates(() => pubsub.publish(channel, { todoLists: filterTodoListsByEmail(email, todoLists) }));
                setTimeout(() => pubsub.publish(channel, { todoLists: filterTodoListsByEmail(email, todoLists) }), 0);
                return pubsub.asyncIterator(channel);
            }
        },
    }
}