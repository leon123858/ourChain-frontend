const shell = require('shelljs');
const walletPath =
	'/Users/leonlin/Desktop/git/OurCoin/bin/bwallet-cli --network=regtest --api-key=test ';
const code = `var state = JSON.parse(ORIGIN_STATE);
if (action == 'create') {
  if (typeof state['NFT'] == 'undefined') state['NFT'] = [];
  state['NFT'].push({ url: url, title: title });
}
//print(state)
saveState(JSON.stringify(state))`;
console.log(code);
if (shell.exec(`${walletPath}rpc deploycontract "${code}"`).code !== 0) {
	shell.echo('Error: wallet commit failed');
	shell.exit(1);
}
