import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from "./graphql/schemasMap";
import { todos } from './database/mockdb';

(async () => {
    const PORT = 4000;

    const app = express();
    const server = new ApolloServer({
        schema,
        context: {
            todos
        }
    });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql'});

    app.listen(PORT, () => {
        console.log(`\n🚀 GraphQL is now running on http://localhost:${PORT}/graphql`)
    });
})();
