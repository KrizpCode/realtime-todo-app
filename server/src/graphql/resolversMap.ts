import { IResolvers } from "@graphql-tools/utils";
import { merge } from 'lodash';

import { TodoResolvers } from "./resolvers/TodoResolver";

const resolverMap: IResolvers = merge(TodoResolvers);
export default resolverMap;