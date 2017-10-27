const { remote } = require('electron');
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
        console.log('Context Item 3 clicked')
     }
  }))

  window.addEventListener('contextmenu', (e) => {
     e.preventDefault();
     menu.popup(remote.getCurrentWindow())
  }, false)
}


initContextMenu();
