const electron = require('electron');
const { app, Tray, Menu } = electron;
const path = require('path');

const APP_NAME = app.getName();
const TRAY_ICON = path.join(__dirname, '/../assets/trayIcon.png');

class ApplicationTray {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  createTray() {
    const contextMenu = Menu.buildFromTemplate(this.getTrayMenu());
    const mainTray = new Tray(TRAY_ICON);
    mainTray.setToolTip(APP_NAME);
    mainTray.setTitle(APP_NAME);
    mainTray.setContextMenu(contextMenu);
    return mainTray;
  }

  getTrayMenu() {
    const mainWindow = this.mainWindow;
    
    return [{
      label: 'Open Google.com',
      click() {},
    },
    { label: 'Item 1' },
    { label: 'Item 2' },
    { type: 'separator' },
    {
      label: 'radhe@bigbinary.com',
      submenu: [
        {
          label: 'Logout',
          click() {
            mainWindow.webContents.send('logout-user');
          },
        },
      ]
    },
    { type: 'separator' },
    { role: 'quit', accelerator: 'Command+Q' }]
  }

}


module.exports = ApplicationTray;
