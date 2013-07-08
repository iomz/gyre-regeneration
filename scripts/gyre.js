// requestAnimationFrame Shim
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = 300;
var endPercent = 1000;
var curPerc = 0;
var counterClockwise = false;
var circ = Math.PI * 2;
var quart = Math.PI / 2;

ctx.lineWidth = 2;
ctx.strokeStyle = '#FFF';

function animate(cur) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius*cur, -(quart), ((circ) * cur) - quart, false);
    ctx.stroke();

    curPerc++;
    if (curPerc < endPercent) {
        requestAnimationFrame(function () {
            animate(curPerc / endPercent);
        });
    }
}

animate();
