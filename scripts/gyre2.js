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
    var len = str.length, c;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-1 * angle / 2);
    ctx.rotate(-1 * (angle / len) / 2);
    for(var n = 0; n < len; n++) {
        c = str[n];
        //window.setTimeout(function(){drawOneChar(ctx, c, angle, len, radius)},1000);
        drawOneChar(ctx, c, angle, len, radius);
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

var genre = ['regeneration','meme'][Math.floor(Math.random()*2)];
var str = getString('data/'+genre);
var strlen = str.length;
var canvas = document.getElementById('canv');
var allign = 200;
ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
centerX = canvas.width / 2;
centerY = canvas.height / 2;
angle = Math.PI * (Math.random() + 1.5);

document.getElementById('pi').innerHTML="Genre: " + genre + ", &pi;: " + angle.toString();
var audio = document.getElementById('audio');
var ogg = document.createElement('source');
ogg.setAttribute('src',"audio/"+genre+".ogg");
ogg.setAttribute('type',"audio/ogg");
audio.appendChild(ogg);
var mp3 = document.createElement('source');
mp3.setAttribute('src',"audio/"+genre+".mp3");
mp3.setAttribute('type',"audio/mp3");
audio.appendChild(mp3);

for(var radius=500,i=0; 12<radius; radius-=4,i++) {
    ctx.font = (13-i*.1).toString() + 'pt Georgia';
    txt = str.substring((i%(strlen/allign))*allign, (i%(strlen/allign))*allign+allign); 
    drawTextAlongArc(ctx, txt, centerX, centerY, radius, angle);
}

