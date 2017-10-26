const { remote } = require('electron');
const { dialog } = remote;

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
