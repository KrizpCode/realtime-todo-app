import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  removeTodo?: Maybe<Scalars['Boolean']>;
  updateTodo?: Maybe<Todo>;
  addTodoList?: Maybe<TodoList>;
  removeTodoList?: Maybe<Scalars['Boolean']>;
  addMember?: Maybe<User>;
  removeMember?: Maybe<Scalars['Boolean']>;
  freezeList?: Maybe<Scalars['Boolean']>;
};


export type MutationAddTodoArgs = {
  listId: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['ID'];
  listId: Scalars['ID'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  listId: Scalars['ID'];
};


export type MutationAddTodoListArgs = {
  title: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRemoveTodoListArgs = {
  id: Scalars['ID'];
};


export type MutationAddMemberArgs = {
  id: Scalars['ID'];
  email: Scalars['String'];
};


export type MutationRemoveMemberArgs = {
  id: Scalars['ID'];
  email: Scalars['String'];
};


export type MutationFreezeListArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  todoListsByEmail?: Maybe<Array<Maybe<TodoList>>>;
  userByEmail?: Maybe<User>;
  todos?: Maybe<Array<Todo>>;
};


export type QueryTodoListsByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  todoListById?: Maybe<TodoList>;
  todoLists?: Maybe<Array<TodoList>>;
  todosByListId: TodoList;
};


export type SubscriptionTodoListByIdArgs = {
  id: Scalars['ID'];
};


export type SubscriptionTodoListsArgs = {
  email: Scalars['String'];
};


export type SubscriptionTodosByListIdArgs = {
  listId: Scalars['ID'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  listId: Scalars['ID'];
  title: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type TodoList = {
  __typename?: 'TodoList';
  id: Scalars['ID'];
  title: Scalars['String'];
  admin: User;
  members: Array<User>;
  frozen: Scalars['Boolean'];
  todos?: Maybe<Array<Todo>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
};

export type AddMemberMutationVariables = Exact<{
  id: Scalars['ID'];
  email: Scalars['String'];
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember?: Maybe<{ __typename?: 'User', email: string }> };

export type AddTodoMutationVariables = Exact<{
  listId: Scalars['ID'];
  title: Scalars['String'];
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo?: Maybe<{ __typename?: 'Todo', id: string, title: string, completed: boolean }> };

export type AddTodoListMutationVariables = Exact<{
  title: Scalars['String'];
  email: Scalars['String'];
}>;


export type AddTodoListMutation = { __typename?: 'Mutation', addTodoList?: Maybe<{ __typename?: 'TodoList', title: string }> };

export type RemoveMemberMutationVariables = Exact<{
  id: Scalars['ID'];
  email: Scalars['String'];
}>;


export type RemoveMemberMutation = { __typename?: 'Mutation', removeMember?: Maybe<boolean> };

export type TodoListByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type TodoListByEmailQuery = { __typename?: 'Query', todoListsByEmail?: Maybe<Array<Maybe<{ __typename?: 'TodoList', id: string, title: string, admin: { __typename?: 'User', email: string }, members: Array<{ __typename?: 'User', email: string }> }>>> };

export type NewTodoListsSubscriptionVariables = Exact<{
  email: Scalars['String'];
}>;


export type NewTodoListsSubscription = { __typename?: 'Subscription', todoLists?: Maybe<Array<{ __typename?: 'TodoList', id: string, title: string, admin: { __typename?: 'User', email: string }, members: Array<{ __typename?: 'User', email: string }> }>> };

export type RemoveTodoListMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveTodoListMutation = { __typename?: 'Mutation', removeTodoList?: Maybe<boolean> };

export type RemoveTodoMutationVariables = Exact<{
  id: Scalars['ID'];
  listId: Scalars['ID'];
}>;


export type RemoveTodoMutation = { __typename?: 'Mutation', removeTodo?: Maybe<boolean> };

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['ID'];
  listId: Scalars['ID'];
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo?: Maybe<{ __typename?: 'Todo', id: string, title: string, completed: boolean }> };

export type TodosByListIdSubscriptionVariables = Exact<{
  listId: Scalars['ID'];
}>;


export type TodosByListIdSubscription = { __typename?: 'Subscription', todosByListId: { __typename?: 'TodoList', id: string, title: string, frozen: boolean, members: Array<{ __typename?: 'User', email: string }>, todos?: Maybe<Array<{ __typename?: 'Todo', id: string, listId: string, title: string, completed: boolean }>>, admin: { __typename?: 'User', email: string } } };


export const AddMemberDocument = gql`
    mutation AddMember($id: ID!, $email: String!) {
  addMember(id: $id, email: $email) {
    email
  }
}
    `;
export type AddMemberMutationFn = Apollo.MutationFunction<AddMemberMutation, AddMemberMutationVariables>;

/**
 * __useAddMemberMutation__
 *
 * To run a mutation, you first call `useAddMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberMutation, { data, loading, error }] = useAddMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddMemberMutation, AddMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMemberMutation, AddMemberMutationVariables>(AddMemberDocument, options);
      }
export type AddMemberMutationHookResult = ReturnType<typeof useAddMemberMutation>;
export type AddMemberMutationResult = Apollo.MutationResult<AddMemberMutation>;
export type AddMemberMutationOptions = Apollo.BaseMutationOptions<AddMemberMutation, AddMemberMutationVariables>;
export const AddTodoDocument = gql`
    mutation AddTodo($listId: ID!, $title: String!) {
  addTodo(listId: $listId, title: $title) {
    id
    title
    completed
  }
}
    `;
export type AddTodoMutationFn = Apollo.MutationFunction<AddTodoMutation, AddTodoMutationVariables>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddTodoMutation(baseOptions?: Apollo.MutationHookOptions<AddTodoMutation, AddTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, options);
      }
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = Apollo.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = Apollo.BaseMutationOptions<AddTodoMutation, AddTodoMutationVariables>;
export const AddTodoListDocument = gql`
    mutation AddTodoList($title: String!, $email: String!) {
  addTodoList(title: $title, email: $email) {
    title
  }
}
    `;
export type AddTodoListMutationFn = Apollo.MutationFunction<AddTodoListMutation, AddTodoListMutationVariables>;

/**
 * __useAddTodoListMutation__
 *
 * To run a mutation, you first call `useAddTodoListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoListMutation, { data, loading, error }] = useAddTodoListMutation({
 *   variables: {
 *      title: // value for 'title'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddTodoListMutation(baseOptions?: Apollo.MutationHookOptions<AddTodoListMutation, AddTodoListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTodoListMutation, AddTodoListMutationVariables>(AddTodoListDocument, options);
      }
export type AddTodoListMutationHookResult = ReturnType<typeof useAddTodoListMutation>;
export type AddTodoListMutationResult = Apollo.MutationResult<AddTodoListMutation>;
export type AddTodoListMutationOptions = Apollo.BaseMutationOptions<AddTodoListMutation, AddTodoListMutationVariables>;
export const RemoveMemberDocument = gql`
    mutation RemoveMember($id: ID!, $email: String!) {
  removeMember(id: $id, email: $email)
}
    `;
export type RemoveMemberMutationFn = Apollo.MutationFunction<RemoveMemberMutation, RemoveMemberMutationVariables>;

/**
 * __useRemoveMemberMutation__
 *
 * To run a mutation, you first call `useRemoveMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberMutation, { data, loading, error }] = useRemoveMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRemoveMemberMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMemberMutation, RemoveMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMemberMutation, RemoveMemberMutationVariables>(RemoveMemberDocument, options);
      }
export type RemoveMemberMutationHookResult = ReturnType<typeof useRemoveMemberMutation>;
export type RemoveMemberMutationResult = Apollo.MutationResult<RemoveMemberMutation>;
export type RemoveMemberMutationOptions = Apollo.BaseMutationOptions<RemoveMemberMutation, RemoveMemberMutationVariables>;
export const TodoListByEmailDocument = gql`
    query TodoListByEmail($email: String!) {
  todoListsByEmail(email: $email) {
    id
    title
    admin {
      email
    }
    members {
      email
    }
  }
}
    `;

/**
 * __useTodoListByEmailQuery__
 *
 * To run a query within a React component, call `useTodoListByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoListByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoListByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useTodoListByEmailQuery(baseOptions: Apollo.QueryHookOptions<TodoListByEmailQuery, TodoListByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodoListByEmailQuery, TodoListByEmailQueryVariables>(TodoListByEmailDocument, options);
      }
export function useTodoListByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodoListByEmailQuery, TodoListByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodoListByEmailQuery, TodoListByEmailQueryVariables>(TodoListByEmailDocument, options);
        }
export type TodoListByEmailQueryHookResult = ReturnType<typeof useTodoListByEmailQuery>;
export type TodoListByEmailLazyQueryHookResult = ReturnType<typeof useTodoListByEmailLazyQuery>;
export type TodoListByEmailQueryResult = Apollo.QueryResult<TodoListByEmailQuery, TodoListByEmailQueryVariables>;
export const NewTodoListsDocument = gql`
    subscription newTodoLists($email: String!) {
  todoLists(email: $email) {
    id
    title
    admin {
      email
    }
    members {
      email
    }
  }
}
    `;

/**
 * __useNewTodoListsSubscription__
 *
 * To run a query within a React component, call `useNewTodoListsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewTodoListsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewTodoListsSubscription({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useNewTodoListsSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewTodoListsSubscription, NewTodoListsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewTodoListsSubscription, NewTodoListsSubscriptionVariables>(NewTodoListsDocument, options);
      }
export type NewTodoListsSubscriptionHookResult = ReturnType<typeof useNewTodoListsSubscription>;
export type NewTodoListsSubscriptionResult = Apollo.SubscriptionResult<NewTodoListsSubscription>;
export const RemoveTodoListDocument = gql`
    mutation RemoveTodoList($id: ID!) {
  removeTodoList(id: $id)
}
    `;
export type RemoveTodoListMutationFn = Apollo.MutationFunction<RemoveTodoListMutation, RemoveTodoListMutationVariables>;

/**
 * __useRemoveTodoListMutation__
 *
 * To run a mutation, you first call `useRemoveTodoListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTodoListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTodoListMutation, { data, loading, error }] = useRemoveTodoListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTodoListMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTodoListMutation, RemoveTodoListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTodoListMutation, RemoveTodoListMutationVariables>(RemoveTodoListDocument, options);
      }
export type RemoveTodoListMutationHookResult = ReturnType<typeof useRemoveTodoListMutation>;
export type RemoveTodoListMutationResult = Apollo.MutationResult<RemoveTodoListMutation>;
export type RemoveTodoListMutationOptions = Apollo.BaseMutationOptions<RemoveTodoListMutation, RemoveTodoListMutationVariables>;
export const RemoveTodoDocument = gql`
    mutation RemoveTodo($id: ID!, $listId: ID!) {
  removeTodo(listId: $listId, id: $id)
}
    `;
export type RemoveTodoMutationFn = Apollo.MutationFunction<RemoveTodoMutation, RemoveTodoMutationVariables>;

/**
 * __useRemoveTodoMutation__
 *
 * To run a mutation, you first call `useRemoveTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTodoMutation, { data, loading, error }] = useRemoveTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useRemoveTodoMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTodoMutation, RemoveTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTodoMutation, RemoveTodoMutationVariables>(RemoveTodoDocument, options);
      }
export type RemoveTodoMutationHookResult = ReturnType<typeof useRemoveTodoMutation>;
export type RemoveTodoMutationResult = Apollo.MutationResult<RemoveTodoMutation>;
export type RemoveTodoMutationOptions = Apollo.BaseMutationOptions<RemoveTodoMutation, RemoveTodoMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: ID!, $listId: ID!) {
  updateTodo(listId: $listId, id: $id) {
    id
    title
    completed
  }
}
    `;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const TodosByListIdDocument = gql`
    subscription todosByListId($listId: ID!) {
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
    `;

/**
 * __useTodosByListIdSubscription__
 *
 * To run a query within a React component, call `useTodosByListIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTodosByListIdSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosByListIdSubscription({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useTodosByListIdSubscription(baseOptions: Apollo.SubscriptionHookOptions<TodosByListIdSubscription, TodosByListIdSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TodosByListIdSubscription, TodosByListIdSubscriptionVariables>(TodosByListIdDocument, options);
      }
export type TodosByListIdSubscriptionHookResult = ReturnType<typeof useTodosByListIdSubscription>;
export type TodosByListIdSubscriptionResult = Apollo.SubscriptionResult<TodosByListIdSubscription>;