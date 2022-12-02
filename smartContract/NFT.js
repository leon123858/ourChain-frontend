var state = JSON.parse(ORIGIN_STATE);
if (action == 'create') {
	if (typeof state['NFT'] == 'undefined') state['NFT'] = [];
	state['NFT'].push({ url: url, title: title });
}
//print(state)
saveState(JSON.stringify(state));
