'use strict';


var file = require('file.js');
var gui = require('nw.gui');
var fs = require('fs');

var canvas;

function init() {
    canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    var canvasW = canvas.width;
    var canvasH = canvas.height;

    if( canvas.getContext )
    {
        setup(canvas);
    }
}

function setup (canvas) {
  var context = canvas.getContext("2d");
  context.strokeStyle = "#32CD32";
  context.fillStyle = "#32CD32";
  context.lineWidth = 2;
  canvas.points = [];

  window.draw = function(e) {
      var pos = getMousePos(canvas, e);
      var posx = pos.x;
      var posy = pos.y;
      canvas.points.push({
        x: posx,
        y: posy
      });

      context.fillRect(posx,posy, 10,10);
      
      if (canvas.points.length > 1) {
        context.lineTo(canvas.points[canvas.points.length-1].x, canvas.points[canvas.points.length-1].y);
        context.stroke();
      } else {
        context.beginPath();
        context.moveTo(posx, posy);
      }
  }

  function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
  }
}


// Runs when the browser has loaded the page
window.onload = function () {
  init();
};



function getImageFromCanvas(canvas, callback) {
  var context = canvas.getContext("2d");
  var imageData = context.getImageData(0,0, canvas.width, canvas.height);

  var data = imageData.data;

  for(var i=0;i<data.length;i+=4){
      if(data[i+3] == 0){
          data[i] = 255 - data[i];
          data[i+1] = 255 - data[i+1];
          data[i+2] = 255 - data[i+2];
          data[i+3] = 255 - data[i+3];
      }
  }

  //create a new canvas
  var newCanvas = document.createElement('canvas');
  var context2 = newCanvas.getContext('2d');

  //set dimensions
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;

  //apply the old canvas to the new one
  context2.putImageData(imageData, 0, 0);

  callback(newCanvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, ""))
}


function clearCanvas(canvas, document) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.points = [];
}

function drawPoints(points) {
  console.log(points);
  clearCanvas(canvas, document);

  var context = canvas.getContext("2d");

  points.forEach(function (point) {
    canvas.points.push({
      x: point.x,
      y: point.y
    });

    context.fillRect(point.x,point.y, 10,10);
    
    if (canvas.points.length > 1) {
      context.lineTo(canvas.points[canvas.points.length-1].x, canvas.points[canvas.points.length-1].y);
      context.stroke();
    } else {
      context.beginPath();
      context.moveTo(point.x, point.y);
    }
  })
}

function randomizeGraph() {
  var newPoints = shuffle(canvas.points);
  drawPoints(newPoints);
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}