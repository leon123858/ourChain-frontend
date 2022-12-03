const { MongoClient } = require('mongodb');
const { exec } = require('child_process');
const url = 'mongodb://localhost:27017';
const dbName = 'ourCoin';
const walletPath =
	'/Users/leonlin/Desktop/git/OurCoin/bin/bwallet-cli --network=regtest --api-key=test ';

class ApiClient {
	constructor() {
		this.client = new MongoClient(url);
	}
	async init() {
		await this.client.connect();
		this.db = this.client.db(dbName);
	}

	async fetchNFTs(txid) {
		const result = await this.db.collection('state').findOne({ txid });
		if (!result) {
			throw new Error('not exist');
		}
		return result?.state?.NFT || [];
	}

	async addNFT(txid, { title, url }) {
		return new Promise((resolve, reject) => {
			exec(
				`${walletPath}rpc callcontract ${txid} '${JSON.stringify({
					action: 'create',
					title,
					url,
				})}'`,
				(error, stdout, stderr) => {
					if (error) {
						reject({ error: error.message });
						return;
					}
					if (stderr) {
						reject({ error: stderr });
						return;
					}
					resolve(stdout);
				}
			);
		});
	}

	async disconnect() {
		await this.client.close();
	}
}

exports.ApiClient = ApiClient;
