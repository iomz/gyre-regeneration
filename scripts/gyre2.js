// requestAnimationFrame Shim
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

function drawOneChar(ctx, c, angle, len, radius) {
        ctx.rotate(angle / len);
        ctx.save();
        ctx.translate(0, -1 * radius);
        ctx.fillText(c, 0, 0);
        ctx.restore();
}

function drawTextAlongArc(ctx, str, centerX, centerY, radius, angle) {
    var len = str.length;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-1 * angle / 2);
    ctx.rotate(-1 * (angle / len) / 2);
    for(var n = 0; n < len; n++) {
        drawOneChar(ctx, str[n], angle, len, radius);
    }
}

function getString(file) {
    xmlhttp = new XMLHttpRequest();
    if (xmlhttp.overrideMimeType)
        xmlhttp.overrideMimeType('text/xml');
    xmlhttp.overrideMimeType("text/html; utf-8");
    xmlhttp.open("GET", file, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

var list = ['regeneration','meme','nuclear','brain','technology','universe'];
var genre = list[Math.floor(Math.random()*list.length)];
var str = getString('data/'+genre);
var strlen = str.length;
var canvas = document.getElementById('canv');
ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
centerX = canvas.width / 2;
centerY = canvas.height / 2;

// Angle of the arc
var angle = Math.PI * (Math.random() + 1);

// Number of characters on one arc
var allign = 200;

// Interval between the arcs
var interval = Math.floor(Math.random()*5)+1;

var outerRad = Math.floor(Math.random()*200)+400;

// Display animation info 
document.getElementById('info').innerHTML="Genre: " + genre + ", Interval: " + interval.toString() + ", Outer radius: " + outerRad.toString() + ", &pi;: " + angle.toString();

/*
// Audio setup
var audio = document.getElementById('audio');
var ogg = document.createElement('source');
ogg.setAttribute('src',"audio/"+genre+".ogg");
ogg.setAttribute('type',"audio/ogg");
audio.appendChild(ogg);
var mp3 = document.createElement('source');
mp3.setAttribute('src',"audio/"+genre+".mp3");
mp3.setAttribute('type',"audio/mp3");
audio.appendChild(mp3);
*/

for(var radius=outerRad,i=0; 13<radius; radius-=interval,i++) {
    ctx.font = (13-i*.1).toString() + 'pt Georgia';
    txt = str.substring((i%(strlen/allign))*allign, (i%(strlen/allign))*allign+allign); 
    drawTextAlongArc(ctx, txt, centerX, centerY, radius, angle);
}
