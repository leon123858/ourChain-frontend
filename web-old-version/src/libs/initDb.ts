import { Db, MongoClient } from 'mongodb';
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

declare global {
	var DBO: {
		chainDb: Db;
		aidDb: Db;
	};
}

export async function init() {
	await client.connect();
	console.log('connect mongoDB success');
	global.DBO = {
		chainDb: client.db('ourCoin'),
		aidDb: client.db('AID'),
	};
}

export async function closeDb() {
	await client.close();
}
