import { IResolvers } from "@graphql-tools/utils";
import { merge } from 'lodash';

import { TodosResolvers } from "./resolvers/TodoResolvers";
import { TodoListResolvers } from "./resolvers/TodoListResolvers"; 

const resolverMap: IResolvers = merge(TodosResolvers, TodoListResolvers);
export default resolverMap;