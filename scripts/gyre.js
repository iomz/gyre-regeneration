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
var radius = 100;
var endPercent = 1000;
var curPerc = 0;
var counterClockwise = false;
var circ = Math.PI * 2;
var quart = Math.PI / 2;

ctx.lineWidth = 2;
ctx.strokeStyle = '#FFF';
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 10;

/*
function refresh(ctx, width, height, frame_number){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle='#FFF';
    var nbr_circles = 100;
  
    var angle_incr = (2 + (frame_number)/12.0) * Math.PI/180;
  
    var cx = width/2;
    var cy = height/2;
    var outer_rad = width*.45;
  
    var sm_rad = 2;
  
    for (var i = 1; i <= nbr_circles; ++i) {
	var ratio = i/nbr_circles;
	var angle = i*angle_incr;
	var spiral_rad = ratio * outer_rad;
	var x = cx + Math.cos(angle) * spiral_rad;
	var y = cy + Math.sin(angle) * spiral_rad;
  
    // draw tiny circle at x,y
	ctx.beginPath();
	//ctx.arc(x, y, sm_rad, 0, 2*Math.PI, false);
    ctx.fillText('a', 
	ctx.fill();
    }
  
}
*/

function animate(current) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius*current, -(quart), ((circ) * current) - quart, false);
    ctx.stroke();
    curPerc++;
    if (curPerc < endPercent) {
        requestAnimationFrame(function () {
            animate(curPerc / endPercent);
        });
    }
}

animate();
