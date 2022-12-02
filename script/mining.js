const shell = require('shelljs');
const walletPath =
	'/Users/leonlin/Desktop/git/OurCoin/bin/bwallet-cli --network=regtest --api-key=test ';
const nodePath = `/Users/leonlin/Desktop/git/OurCoin/bin/bcoin-cli --network=regtest --api-key=test `;
const address = shell.exec(`${walletPath}rpc getnewaddress`).stdout;

console.log('address:', address);

if (shell.exec(`${nodePath}rpc generatetoaddress 1 ${address}`).code !== 0) {
	shell.echo('Error: wallet commit failed');
	shell.exit(1);
}
