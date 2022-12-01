class requester {
	constructor() {
		const { REACT_APP_BASE_URL: baseURL, REACT_APP_SPECIAL_KEY: key } =
			process.env;
		this.data = window.ipcRenderer.sendSync('getBundle', {
			baseURL,
			key,
		});
	}
	get introductions() {
		return this.data.introduction;
	}
	get news() {
		return this.data.news;
	}
}

const req = new requester();
export default req;
