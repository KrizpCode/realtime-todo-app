import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { GRAPHQL_WS } from 'subscriptions-transport-ws';
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws';
import ws from 'ws';
import { PubSub } from 'graphql-subscriptions';

import schema from "./graphql/schemasMap";
import { todoLists } from './database/mockdb';

const PORT = 4000;

// create express
const app = express();
app.use(cors());
const pubsub = new PubSub();

// create apollo server
const apolloServer = new ApolloServer({
	schema,
	context: {
		todoLists,
		pubsub
	}
});

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
server.on('upgrade', (req, _, head) => {
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
		: graphqlWs;
		// graphql-ws will welcome its own subprotocol and
		// gracefully reject invalid ones. if the client supports
		// both transports, graphql-ws will prevail
	wss.handleUpgrade(req, req.socket, head, (ws: any) => {
	wss.emit('connection', ws, req);
	});
});

server.listen(PORT, () => {
	console.log(`\n🚀 GraphQL is now running on http://localhost:${PORT}/graphql`)
});
