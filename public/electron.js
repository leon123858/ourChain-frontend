const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
// get component
const { app, BrowserWindow, shell } = electron;

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
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
