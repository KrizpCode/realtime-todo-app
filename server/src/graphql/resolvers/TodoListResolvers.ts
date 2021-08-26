import { IResolvers } from "@graphql-tools/utils";
import { v4 as uuidv4 } from 'uuid';
import { PubSub } from "graphql-subscriptions";

import { Todo, User, SubscriptionTodosByListIdArgs, MutationUpdateTodoArgs, MutationRemoveTodoArgs, MutationRemoveMemberArgs, MutationAddMemberArgs, MutationAddTodoArgs, TodoList, QueryTodoListsByEmailArgs, MutationAddTodoListArgs, MutationRemoveTodoListArgs, SubscriptionTodoListsArgs, SubscriptionTodoListByIdArgs, MutationFreezeListArgs } from "../generated";

const subscribers: { (): void }[] = [];
const onTodoListUpdates = (fn: () => void): void => {
    subscribers.push(fn)
    return
};
const onTodoUpdates = (fn: () => void): void => {
    subscribers.push(fn)
    return
};

const getTodoListsByEmail = (email: string, todoLists: TodoList[]): TodoList[] => {
    return todoLists.filter(todoList => todoList.members.find(member => member.email === email))
}

const getIndexedTodoListFromArray = (id: string, todoLists: TodoList[]): TodoList => {
    const index = todoLists.findIndex(todoList => todoList.id === id);
    return todoLists[index]
}

export const TodoListResolvers: IResolvers = {
    Query: {
        todoListsByEmail: (_: void, { email }: QueryTodoListsByEmailArgs, { todoLists }: { todoLists: TodoList[]}): TodoList[] => {
            const todoListByEmail = getTodoListsByEmail(email, todoLists);
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
            if (indexOfTodoList === -1) {
                return false
            }

            todoLists[indexOfTodoList].frozen = !todoLists[indexOfTodoList].frozen;
            subscribers.forEach(fn => fn());
            return true;
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
        }
    },

    Subscription: {
        todoListById: {
            subscribe: (_: void, { id }: SubscriptionTodoListByIdArgs, {pubsub, todoLists}: { pubsub: PubSub, todoLists: TodoList[]}) => {
                const channel = uuidv4();
                onTodoListUpdates(() => pubsub.publish(channel, { todoListById: getIndexedTodoListFromArray(id, todoLists) }));
                setTimeout(() => pubsub.publish(channel, { todoListById: getIndexedTodoListFromArray(id, todoLists) }), 0);
                return pubsub.asyncIterator(channel);
            }
        },
        todoLists: {
            subscribe: (_: void, { email }: SubscriptionTodoListsArgs, {pubsub, todoLists}: { pubsub: PubSub, todoLists: TodoList[]}) => {
                const channel = uuidv4();
                onTodoListUpdates(() => pubsub.publish(channel, { todoLists: getTodoListsByEmail(email, todoLists) }));
                setTimeout(() => pubsub.publish(channel, { todoLists: getTodoListsByEmail(email, todoLists) }), 0);
                return pubsub.asyncIterator(channel);
            }
        },
        todosByListId: {
            subscribe: (_: void, { listId }: SubscriptionTodosByListIdArgs, {pubsub, todoLists}: { pubsub: PubSub, todoLists: TodoList[]}) => {
                const channel = uuidv4();
                onTodoUpdates(() => pubsub.publish(channel, { todosByListId: getIndexedTodoListFromArray(listId, todoLists) }));
                setTimeout(() => pubsub.publish(channel, { todosByListId: getIndexedTodoListFromArray(listId, todoLists) }), 0);
                return pubsub.asyncIterator(channel);
            }
        }
    }
}