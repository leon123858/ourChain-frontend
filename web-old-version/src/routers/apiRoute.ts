import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// bind human on AID contract
router.post('/register/:contractId', async (req, res) => {
	const contractId = req.params.contractId;
	const { name, publicKey, walletClient } = req.body;
	if (!contractId || !name || !publicKey) {
		res.status(400).send('should set parameters');
		return;
	}
	try {
		const args = {
			uid: uuidv4(),
			name: name,
			publicKey: publicKey,
		};
		const transactionId = await walletClient.execute('callcontract', [
			contractId,
			JSON.stringify(args),
		]);
		res.status(200).json({ transactionId, state: 'OK' });
	} catch (err) {
		res.status(500).json({ error: err });
	}
});
// 3rd party request to get user login message
router.get('/request/:userName', async (req, res) => {
	const userName = req.params.userName;
	try {
		const data = (await DBO.chainDb
			.collection('state')
			.findOne({ 'state.name': userName })) as any;
		res
			.status(200)
			.json({ state: 'OK', contractId: data.txid, payload: { ...data.state } });
	} catch (err) {
		console.log(err);
		res.status(500).send('something wrong');
	}
});
// 3rd party fetch block message about AID for user (3rd party should do this action in their computer)
router.get('/fetch/:contractId', async (req, res) => {
	const contractId = req.params.contractId;
	try {
		const data = (await DBO.chainDb
			.collection('state')
			.findOne({ txid: contractId })) as any;
		res
			.status(200)
			.json({ state: 'OK', contractId: data.txid, payload: { ...data.state } });
	} catch (err) {
		console.log(err);
		res.status(500).send('something wrong');
	}
});

export default router;
