const { remote, ipcRenderer } = require('electron');
const { dialog, Menu, MenuItem } = remote;

document.getElementById('open').addEventListener('click', () => {
  dialog.showOpenDialog(fileNames => {
    if(fileNames === undefined) {
       alert("No file selected");
    } else {
       alert(fileNames[0]);
    }
 });
});

document.getElementById('save').addEventListener('click', () => {
  dialog.showSaveDialog({
    buttonLabel: "Save Electron Demo",
    message: "Save dialog demo"
  }, filename => {
    filename && alert(`Save your file to path ${filename}`);
  });
});


document.getElementById('message').addEventListener('click', () => {
    dialog.showMessageBox({
      buttons: ["Button 1", "Button 2", "Button 2", "Cancel"],
      title: "Custom message box",
      message: "Custom message box",
      detail: "Extra details for custom message box"
    }, buttonIndex => {
      if(buttonIndex == 3){
        alert("Cancel clicked");
      }
      console.log(`${buttonIndex} clicked`);
    });
});

document.getElementById('error').addEventListener('click', () => {
    dialog.showErrorBox("Error", "This error box detail");
});



const initContextMenu = () => {
  const menu = new Menu();

  menu.append(new MenuItem ({
     label: 'Context Item 1',
     click() {
        console.log('Context Item 1 clicked')
     }
  }))
  menu.append(new MenuItem({label: 'Context Item 2', type: 'checkbox', checked: true}))
  menu.append(new MenuItem({type: 'separator'}))
  menu.append(new MenuItem ({
     label: 'Context Item 3',
     click() {
        ipcRenderer.send('called-from-context-menu');
        console.log('Context Item 3 clicked')
     }
  }))

  window.addEventListener('contextmenu', (e) => {
     e.preventDefault();
     menu.popup(remote.getCurrentWindow())
  }, false)
}


initContextMenu();

document.getElementById('callmainprocess').addEventListener('click', () => {
  ipcRenderer.send('call-main-process', 'this is first param', 2);
});


ipcRenderer.on('logout-user', (event) => {
  alert("logout called from tray menu");
});

let count = 0;
document.getElementById('notification1').addEventListener('click', () => {
  count++;
  const notification = new Notification(`File Downloaded ${count}`, {
    body: `Notification body`,
  });
  notification.onclick = () => {
    alert('Notification clicked');
  }
});
