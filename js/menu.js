/**
 * menu stuff
 */

var file = require('file.js');

var menu = new gui.Menu({ type: 'menubar' });

menu.append(new gui.MenuItem({
  label: 'File',
  submenu: new gui.Menu()
}));

menu.items[0].submenu.append(new gui.MenuItem({
  label: 'New',
  click: function () {
    gui.Window.open('index.html', {
        "toolbar": false,
        "width": 1024,
        "height": 768 ,
        "focus": true
      });
  }
}));

menu.items[0].submenu.append(new gui.MenuItem({
  type: 'separator'
}));

menu.items[0].submenu.append(new gui.MenuItem({
  label: 'Load Image',
  click: function () {
    file.getImageFile(document, function (filePath) {

      document.querySelector('#canvas').style.backgroundImage = 
      'linear-gradient('
        + 'rgba(0, 0, 0, 0.1),'
        + 'rgba(0, 0, 0, 0.1)'
        + '),'
        + 'url("'+ filePath + '")';
      document.querySelector('#canvas').style.backgroundSize = 'cover';

    });
  }
}));

menu.items[0].submenu.append(new gui.MenuItem({
  label: 'Save Image',
  click: function () {
    getImageFromCanvas(canvas, function (image) {
      file.writeImageToFile(image, document, function (err, success) {
        if (err) console.log(err); else console.log(success);        
      });
    });
  }
}));

menu.items[0].submenu.append(new gui.MenuItem({
  type: 'separator'
}));


menu.items[0].submenu.append(new gui.MenuItem({
  label: 'Load Points',
  click: function () {
    file.getPointsFromFile(document, function (points) {
      drawPoints(points);
    });
  }
}));

menu.items[0].submenu.append(new gui.MenuItem({
  label: 'Save Points',
  click: function () {
    file.writePointsToFile(JSON.stringify(canvas.points), document, function (err, success) {
        console.log("Finished writing...");
        if (err) console.log(err); else console.log(success);        
    });
  }
}));

menu.items[0].submenu.append(new gui.MenuItem({
  type: 'separator'
}));

menu.items[0].submenu.append(new gui.MenuItem({
  label: 'Close',
  click: function () {
    gui.Window.get().close();
  }
}));




menu.append(new gui.MenuItem({
  label: 'Edit',
  submenu: new gui.Menu()
}));


menu.items[1].submenu.append(new gui.MenuItem({
  label: 'Randomise Graph',
  click: function () {
    randomizeGraph();
  }
}));


menu.items[1].submenu.append(new gui.MenuItem({
  label: 'Clear Canvas',
  click: function () {
    clearCanvas(canvas, document);
  }
}));

gui.Window.get().menu = menu;


