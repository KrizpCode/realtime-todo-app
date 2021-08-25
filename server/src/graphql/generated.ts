import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Todo: ResolverTypeWrapper<Todo>;
  TodoList: ResolverTypeWrapper<TodoList>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Mutation: {};
  ID: Scalars['ID'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Query: {};
  Subscription: {};
  Todo: Todo;
  TodoList: TodoList;
  User: User;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationAddTodoArgs, 'listId' | 'title'>>;
  removeTodo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTodoArgs, 'id' | 'listId'>>;
  updateTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, 'id' | 'listId'>>;
  addTodoList?: Resolver<Maybe<ResolversTypes['TodoList']>, ParentType, ContextType, RequireFields<MutationAddTodoListArgs, 'title' | 'email'>>;
  removeTodoList?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTodoListArgs, 'id'>>;
  addMember?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddMemberArgs, 'id' | 'email'>>;
  removeMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveMemberArgs, 'id' | 'email'>>;
  freezeList?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationFreezeListArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  todoListsByEmail?: Resolver<Maybe<Array<Maybe<ResolversTypes['TodoList']>>>, ParentType, ContextType, RequireFields<QueryTodoListsByEmailArgs, 'email'>>;
  userByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByEmailArgs, 'email'>>;
  todos?: Resolver<Maybe<Array<ResolversTypes['Todo']>>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  todoListById?: SubscriptionResolver<Maybe<ResolversTypes['TodoList']>, "todoListById", ParentType, ContextType, RequireFields<SubscriptionTodoListByIdArgs, 'id'>>;
  todoLists?: SubscriptionResolver<Maybe<Array<ResolversTypes['TodoList']>>, "todoLists", ParentType, ContextType, RequireFields<SubscriptionTodoListsArgs, 'email'>>;
  todosByListId?: SubscriptionResolver<ResolversTypes['TodoList'], "todosByListId", ParentType, ContextType, RequireFields<SubscriptionTodosByListIdArgs, 'listId'>>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  listId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoListResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoList'] = ResolversParentTypes['TodoList']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  frozen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  todos?: Resolver<Maybe<Array<ResolversTypes['Todo']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  TodoList?: TodoListResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

