// requestAnimationFrame Shim
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

function drawTextAlongArc(ctx, str, centerX, centerY, radius, angle) {
    var len = str.length;
    ctx.translate(centerX, centerY);
    ctx.rotate(-1 * angle / 2);
    for(var n = 0; n < len; n++) {
        ctx.rotate(angle / len);
        ctx.save();
        ctx.translate(0, -1 * radius);
        radius -= 0.1;
        ctx.fillText(str[n], 0, 0);
        ctx.restore();
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
centerX = canvas.width / 2;
centerY = canvas.height / 2;

// Initialize the white color and set
ctx.fillStyle = '#FFFFFF';
var colors = []
for(var i=31; 0<=i; i--){
    var color_str = '#';
    for(var j=0; j<6; j++){
        if(i%2==0 && j%2==1)
            color_str += parseInt('7').toString(16);
        else
            color_str += (i/2).toString(16);
    }
    colors.push(color_str);
}

// Angle of the arc
var angle = Math.PI * 2;

// Number of characters on one arc
var allign = 200;

// Interval between the arcs
var interval = 20;

var outerRad = 350;

// Display animation info 
document.getElementById('info').innerHTML="Genre: " + genre + ", Interval: " + interval.toString() + ", Outer radius: " + outerRad.toString() + ", &pi;: " + angle.toString();

for(var radius=outerRad,i=0; 13<radius; radius-=interval,i++) {
    ctx.font = (13-i*.1).toString() + 'pt Georgia';
    ctx.fillStyle = colors[i%32];
    ctx.save();
    txt = str.substring((i%(strlen/allign))*allign, (i%(strlen/allign))*allign+allign); 
    allign -= 10 +i;
    drawTextAlongArc(ctx, txt, centerX, centerY, radius, angle);
    ctx.restore();
}
