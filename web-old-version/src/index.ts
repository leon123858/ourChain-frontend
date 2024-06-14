/**
 * Import Core Object
 */
import express from 'express';
import { apiRoute, privateRoute } from './routers';
import { init as initDb, closeDb } from './libs/initDb';
import bodyParser from 'body-parser';

const bcoin = require('bcoin');
const network = bcoin.Network.get('regtest');

/**
 * Init Core Object
 */

const walletClient = new bcoin.WalletClient({
	port: network.walletPort,
	apiKey: 'test',
});

const app: express.Application = express();

/**
 * Set global variable
 */

const port: number = 3000;

/**
 * use middleware in first
 */

app.use(bodyParser.json());
app.use(function (req, _res, next) {
	if (!req.body) {
		req.body = {};
	}
	req.body.walletClient = walletClient;
	next();
});

/**
 * Basic router
 */

app.get('/', (_req, res) => {
	res.send('This is AID server');
});

/**
 * Main API
 */

app.use('/private', privateRoute);
app.use('/api', apiRoute);

/**
 * error handle
 */

app.get('*', function (_req, res) {
	res.status(404).send('route not found');
});

/**
 * Server Setup
 */
app.listen(port, async () => {
	await initDb();
	try {
		await walletClient.open();
		// subscribe to events from all wallets
		walletClient.all();
	} catch (err) {
		console.log(err);
	}
	console.log(`listening on => http://localhost:${port}/`);
});

// release resource
async function killResource() {
	try {
		await walletClient.close();
		await closeDb();
	} catch (err) {
		console.log(err);
	}
}
