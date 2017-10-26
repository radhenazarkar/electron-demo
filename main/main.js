const path = require('path');
const url = require('url');

const { app, BrowserWindow } = require('electron');

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/../index.html'),
      protocol: 'file:',
      slashes: true,
    })
  )
  // mainWindow.loadURL("http://www.google.com");

}

app.on('ready', () => {
  console.log('App ready event called');
  createWindow();
});


app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  console.log('App window closed event called');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  console.log('App activate event called');
  if (mainWindow === null) {
    createWindow();
  }
});
