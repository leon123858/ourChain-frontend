const { ipcRenderer } = require('electron');
/**
 * call api to electron backend
 * @param {string} method get or add
 * @param {object} params needed parameter for the method
 * @returns {Promise<object[] | object>}
 */
const apiRequest = (method, params = {}) => {
	return new Promise((resolve, reject) => {
		ipcRenderer.send('api', {
			method,
			params,
		});
		ipcRenderer.once(`api:${method}`, (event, result) => {
			if (result.hasOwnProperty('error')) {
				reject(result);
			} else {
				resolve(result);
			}
		});
	});
};

window.electronRequest = apiRequest;
