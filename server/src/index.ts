import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import ws, { CONNECTING } from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import { execute, subscribe } from 'graphql';
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws';
import schema from "./graphql/schemasMap";
import { todos } from './database/mockdb';
import { PubSub } from 'graphql-subscriptions';

import { buildSchema } from 'graphql';
import { SubscriptionServer, GRAPHQL_WS } from 'subscriptions-transport-ws';

const PORT = 4000;

// create express
const app = express();
app.use(cors());
const pubsub = new PubSub();

// create apollo server
const apolloServer = new ApolloServer({ schema, context: {
  todos,
  pubsub
} });

apolloServer.applyMiddleware({ app });

// graphql-ws
const graphqlWs = new ws.Server({ noServer: true });
useServer({ schema }, graphqlWs);

// subscriptions-transport-ws
const subTransWs = new ws.Server({ noServer: true });

// create http server
const server = http.createServer(app);
apolloServer.installSubscriptionHandlers(subTransWs);

// listen for upgrades and delegate requests according to the WS subprotocol
server.on('upgrade', (req, socket, head) => {
  // extract websocket subprotocol from header
    const protocol = req.headers['sec-websocket-protocol'];
    const protocols = Array.isArray(protocol)
        ? protocol
        : protocol?.split(',').map((p) => p.trim());

  // decide which websocket server to use
    const wss =
        protocols?.includes(GRAPHQL_WS) && // subscriptions-transport-ws subprotocol
        !protocols.includes(GRAPHQL_TRANSPORT_WS_PROTOCOL) // graphql-ws subprotocol
            ? subTransWs
            : // graphql-ws will welcome its own subprotocol and
            // gracefully reject invalid ones. if the client supports
            // both transports, graphql-ws will prevail
            graphqlWs;
      wss.handleUpgrade(req, req.socket, head, (ws: any) => {
      wss.emit('connection', ws, req);
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 GraphQL is now running on http://localhost:${PORT}/graphql`)
});
