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
  addTodo: Todo;
  removeTodo: Scalars['Boolean'];
};


export type MutationAddTodoArgs = {
  title: Scalars['String'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  title: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type TodosListQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosListQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, title: string, completed: boolean }> };


export const TodosListDocument = gql`
    query TodosList {
  todos {
    id
    title
    completed
  }
}
    `;

/**
 * __useTodosListQuery__
 *
 * To run a query within a React component, call `useTodosListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosListQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosListQuery(baseOptions?: Apollo.QueryHookOptions<TodosListQuery, TodosListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodosListQuery, TodosListQueryVariables>(TodosListDocument, options);
      }
export function useTodosListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosListQuery, TodosListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodosListQuery, TodosListQueryVariables>(TodosListDocument, options);
        }
export type TodosListQueryHookResult = ReturnType<typeof useTodosListQuery>;
export type TodosListLazyQueryHookResult = ReturnType<typeof useTodosListLazyQuery>;
export type TodosListQueryResult = Apollo.QueryResult<TodosListQuery, TodosListQueryVariables>;