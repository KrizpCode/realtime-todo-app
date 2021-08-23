import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

import * as todosTypeDefs from './schemas/todos.graphql';
import resolvers from './resolversMap';

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [todosTypeDefs],
    resolvers,
});
export default schema;