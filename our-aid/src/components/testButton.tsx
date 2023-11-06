'use client';
import ECPairFactory from 'ecpair';
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import * as bitcoin from 'bitcoinjs-lib';

const HOST = 'http://localhost:8080';

const ECPair = ECPairFactory(ecc);
const REGTESTNET = bitcoin.networks.regtest;

export function TestButton() {
	return (
		<div>
			<button
				onClick={async () => {
					const keyPair = ECPair.fromWIF("cTifGWCZmCbLccMSbNLigzGM3mMQkcVVTGN4cdABeJbMpjo7jtZ2", REGTESTNET);
					const p2pkh = bitcoin.payments.p2pkh({
						pubkey: keyPair.publicKey,
						network: REGTESTNET,
					});
					console.log("public key", keyPair.publicKey.toString('hex'));
					// bitcoin P2PKH addresses start with a '1'
					console.log("address", p2pkh.address);
					console.assert(p2pkh.address!.startsWith('m'), true);
					// Print your private key (in WIF format)
					console.log(keyPair.toWIF());
					// get utxo
					const res = await fetch(`${HOST}/get/utxo`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});
					// const json = await res.json();
					// console.log(json);

					const randomKeyPair = ECPair.makeRandom({ network: REGTESTNET });
					const {address} = bitcoin.payments.p2pkh({
						pubkey: randomKeyPair.publicKey,
						network: REGTESTNET,
					});
					console.log("random address", address);

					//root@c8a863d82597:~/Desktop/ourchain# bitcoin-cli createrawtransaction '[{"txid":"50607d7d344c9d9ad4c4572f7066ff712c82280bae3e3e43d83cdd219c0dce00","vout":0}]' '{"mqGLjYBd2SxXsChFu1WrZaohmKJ2d9xAX8":49.99}'
					// 02000000000000000000000000000000000000000000000000000000000000000000000000000001fb694d8547a128a05bbca29e4408ed9a9358e03413847baad7f4ee5c57d8e45f0000000000ffffffff01c0aff629010000001976a9147fb94b889b267f9c4d4d783f9df69202bd1aa44f88ac00000000

					// root@c8a863d82597:~/Desktop/ourchain# bitcoin-cli signrawtransaction "02000000000000000000000000000000000000000000000000000000000000000000000000000001fb694d8547a128a05bbca29e4408ed9a9358e03413847baad7f4ee5c57d8e45f0000000000ffffffff01c0aff629010000001976a9147fb94b889b267f9c4d4d783f9df69202bd1aa44f88ac00000000" '[]' '["cTifGWCZmCbLccMSbNLigzGM3mMQkcVVTGN4cdABeJbMpjo7jtZ2"]'
					// {
					//   "hex": "02000000000000000000000000000000000000000000000000000000000000000000000000000001fb694d8547a128a05bbca29e4408ed9a9358e03413847baad7f4ee5c57d8e45f0000000049483045022100b413be87d212d259667aa8b98ca0b7e3d53b4e04e59e5e436dadaa04cdfcfcfd02202cc3579bd4138e588d8f243aeef288c36a5d699e7a48a56feb754c5e35c742da01ffffffff01c0aff629010000001976a9147fb94b889b267f9c4d4d783f9df69202bd1aa44f88ac00000000",
					//   "complete": true
					// }

					// root@c8a863d82597:~/Desktop/ourchain# bitcoin-cli sendrawtransaction "02000000000000000000000000000000000000000000000000000000000000000000000000000001fb694d8547a128a05bbca29e4408ed9a9358e03413847baad7f4ee5c57d8e45f0000000049483045022100b413be87d212d259667aa8b98ca0b7e3d53b4e04e59e5e436dadaa04cdfcfcfd02202cc3579bd4138e588d8f243aeef288c36a5d699e7a48a56feb754c5e35c742da01ffffffff01c0aff629010000001976a9147fb94b889b267f9c4d4d783f9df69202bd1aa44f88ac00000000"
					// 0c96666b431cb9df8f768849b43fd641b5aaeede1418ac2560c8b3d31a8a82c9
					// root@c8a863d82597:~/Desktop/ourchain# bitcoin-cli getrawtransaction 0c96666b431cb9df8f768849b43fd641b5aaeede1418ac2560c8b3d31a8a82c9
					// 02000000000000000000000000000000000000000000000000000000000000000000000000000001fb694d8547a128a05bbca29e4408ed9a9358e03413847baad7f4ee5c57d8e45f0000000049483045022100b413be87d212d259667aa8b98ca0b7e3d53b4e04e59e5e436dadaa04cdfcfcfd02202cc3579bd4138e588d8f243aeef288c36a5d699e7a48a56feb754c5e35c742da01ffffffff01c0aff629010000001976a9147fb94b889b267f9c4d4d783f9df69202bd1aa44f88ac00000000

					// use bitcoin-cli listunspent 1 9999999 "[]" > test.tx => can find sendrawtransaction txid
					// note: bitcoin-cli listunspent 1 9999999 "[]" => can't find different wallet utxo


					// // create transaction
					// const tx = new ourChain.Transaction();
					// console.log('contract address:', tx.contract.address);
					// tx.addInput(Buffer.from(json.data[0].txid, 'hex'), json.data[0].vout);
					// const defaultScript = ourChain.script.compile([
					// 	ourChain.opcodes.OP_RETURN,
					// 	Buffer.from('Hello, World!'),
					// ]);
					// tx.addOutput(
					// 	p2pkh.output || defaultScript,
					// 	json.data[0].amount * 100000000 - 1000
					// );
					//
					// console.log('tx:', tx.toHex());

					// sign transaction
					// const signatureHash = tx.hashForSignature(
					// 	0,
					// 	Buffer.from(json.data[0].scriptPubKey, 'hex'),
					// 	ourChain.Transaction.SIGHASH_ALL
					// );
					// const signature = keyPair.sign(signatureHash);
					// tx.setInputScript(
					// 	0,
					// 	ourChain.script.compile([signature, keyPair.publicKey])
					// );

					// // generate transaction hex
					// const txHex = tx.toHex();
					// console.log('txhex:', txHex);

					// send transaction
				}}
			>
				test
			</button>
		</div>
	);
}
