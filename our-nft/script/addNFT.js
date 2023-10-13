const shell = require('shelljs');
const walletPath =
	'/Users/leonlin/Desktop/git/OurCoin/bin/bwallet-cli --network=regtest --api-key=test ';
const contractId =
	'f0558984debc2542b07430f4dca62b157d82ee7e9d7ba845e854b1b96c4b493d';
const params = {
	action: 'create',
	url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	title: '測試圖片2',
};
console.log(JSON.stringify(params));
if (
	shell.exec(
		`${walletPath}rpc callcontract ${contractId} '${JSON.stringify(params)}'`
	).code !== 0
) {
	shell.echo('Error: wallet commit failed');
	shell.exit(1);
}
