const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { ApiClient } = require('./utils/apiClient');
// get component
const { app, BrowserWindow, shell, ipcMain } = electron;
const apiClient = new ApiClient();
// windows setting

let mainWindow;
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		frame: true,
		icon: '',
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			enableRemoteModule: true, // 允許在 Render Process 使用 Remote Module
			contextIsolation: false, // 讓在 preload.js 的定義可以傳遞到 Render Process (React)
		},
	});
	mainWindow.removeMenu();
	if (isDev) {
		mainWindow.webContents.openDevTools();
	}
	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);
	mainWindow.on('closed', () => (mainWindow = null));
	mainWindow.webContents.on('new-window', function (e, url) {
		e.preventDefault();
		shell.openExternal(url);
	});
}

app.on('ready', async function () {
	createWindow();
	await apiClient.init();
});

app.on('window-all-closed', async () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
	await apiClient.disconnect();
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

// Main Process
ipcMain.on('api', async (event, args) => {
	const { method, params } = args;
	try {
		switch (method) {
			case 'get':
				event.sender.send(
					`api:${method}`,
					await apiClient.fetchNFTs(params.txid)
				);
				break;
			case 'create':
				{
					const { txid, title, url } = params;
					event.sender.send(
						`api:${method}`,
						await apiClient.addNFT(txid, { title, url })
					);
				}
				break;
			default:
				event.sender.send(`api:${method}`, { error: 'not exist method' });
				break;
		}
	} catch (err) {
		event.sender.send(`api:${method}`, { error: err });
	}
});
