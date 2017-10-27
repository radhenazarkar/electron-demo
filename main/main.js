const path = require('path');
const url = require('url');

const { app, BrowserWindow, dialog } = require('electron');

const ApplicationMenu = require('./menu');

require('electron-debug')({ enabled: true });
const {
  default:devtoolsInstaller, ANGULARJS_BATARANG,
  REACT_DEVELOPER_TOOLS, EMBER_INSPECTOR,
  BACKBONE_DEBUGGER, VUEJS_DEVTOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');


let mainWindow = null;
let isQuitting;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/../index.html'),
      protocol: 'file:',
      slashes: true,
    })
  )
  // mainWindow.loadURL("http://www.google.com");


  mainWindow.on('focus', (e) => {
    console.log('mainwindow focus event called');
  });

  mainWindow.on('blur', (e) => {
    console.log('mainwindow blur event called');
  });

  mainWindow.on('move', (e) => {
    console.log('mainwindow move event called');
  });

  mainWindow.on('minimize', (e) => {
    console.log('mainwindow minimize event called');
  });


  // mainWindow.on('maximize', (e) => {
  //   console.log('mainwindow maximize event called');
  // });

  mainWindow.on('resize', (e) => {
    console.log('mainwindow resize event called');
  });

  mainWindow.on('show', e => {
    console.log('mainwindow show event called');
  });

  mainWindow.on('hide', e => {
    console.log('mainwindow hide event called');
  });

  mainWindow.on('close', e => {
    console.log('mainwindow close event called');
    if (!isQuitting) {
      e.preventDefault();
      if (process.platform === 'darwin') {
        app.hide();
      } else {
        mainWindow.hide();
      }
    } else {
      var choice = dialog.showMessageBox({
        type: 'question',
        buttons: ['Yes', 'No'],
        message: 'Are you sure you want to quit?',
        detail: `Your custom detail message`,
      });
      if (choice == 1) {
        isQuitting = false;
        e.preventDefault();
      }
    }
  });

  mainWindow.on('closed', (e) => {
    console.log('mainwindow closed event called');
    mainWindow = null;
  });

  devtoolsInstaller(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));


  const menu = new ApplicationMenu();
  menu.createMenu();

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

app.on('before-quit', () => {
  isQuitting = true;
});
