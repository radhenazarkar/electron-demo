const electron = require('electron');
const { app, Menu } = electron;
const BUILD_VERSION = app.getVersion();

class ApplicationMenu {
  createMenu () {
    const template = [
      this.getAppMenu(),
      this.getEditMenu(),
      this.getViewMenu(),
      this.getWindowMenu()
    ]
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  getEditMenu () {
    return {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ]
    }
  }

  getViewMenu() {
    return {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ]
    }
  }

  getAppMenu () {
    return {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { label: `Version ${BUILD_VERSION}`, enabled: false },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }
  }

  getWindowMenu(){
    return {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    }
  }

}

module.exports = ApplicationMenu;
