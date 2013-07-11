/*
    GYRE! Word Reflector Reproduction
    Coded by Iori Mizutani (iomz@sfc.wide.ad.jp)
    Last modified: 2013/07/12
*/

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas, ctx, outerRad, span, interval, fondSize, fontReduc, limit;
var radius, start, offset, round, allign;
var audio, ogg, mp3;
var list = ['regeneration','meme','nuclear','brain','technology','universe'];
var genre = list[Math.floor(Math.random()*list.length)];
var str = new String();
var colors = new Array();

init();
canvasInit();
audioInit();
animate();

function init() {
    canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    ctx = canvas.getContext('2d');
    ctx.translate(canvas.width/2*Math.random()+canvas.width/4, canvas.height/3*Math.random()+canvas.height/3);
    document.body.appendChild(canvas);

    // Black and white gradation array
    for(var i=7; 0<=i; i--){
        var color_str = '#';
        for(var j=0; j<6; j++){
            color_str += (2*i).toString(16);
        }
        colors.push(color_str);
    }

    // Load string
    str = getString('data/'+genre);

    // Limit for respawn
    limit = 5;

    // Text printing speed
    span = 50;

    // Initial radius
    outerRad = 400;

    // Font reduction
    fontReduc = 0.7;
 }

function canvasInit() {
    // Canvas setup
    ctx.rotate(2*Math.PI*Math.random());
    offset = 0;
    round = 0;

    // Initialize the white color
    ctx.fillStyle = '#FFFFFF';

    // Font initialization
    fontSize = Math.floor(8*Math.random() + 8);
    ctx.font = fontSize.toString() + 'pt serif';

    // Interval initialization
    interval = 0.6*Math.random() + 0.2;
 
    // Outmost radian for the spiral
    //outerRad -= 10*Math.random() + fontSize;
    //radius = outerRad;
    radius = outerRad*Math.random() + 200;

    // Number of characters on one round
    allign = calcAllign(radius);

    limit = calcLimit();

    ctx.save();

    start = new Date().getTime();
}

function calcAllign(r) {
    return Math.floor(2 * Math.PI * r / fontSize);
}

function calcLimit() {
    var r = radius;
    var rc = 1;
    do {
        for(var i=0; i<calcAllign(r); i++){
            r -= (rc+1)*interval;
            if (r<100) return rc;
        }
        rc++;
    } while (100<calcAllign(r));
    return rc;
}

function audioInit(){
    // Audio setup
    audio = document.createElement('audio');
    ogg = document.createElement('source');
    ogg.setAttribute('src',"audio/"+genre+".ogg");
    ogg.setAttribute('type',"audio/ogg");
    audio.appendChild(ogg);
    mp3 = document.createElement('source');
    mp3.setAttribute('src',"audio/"+genre+".mp3");
    mp3.setAttribute('type',"audio/mp3");
    audio.play();
}

function animate() {
    var time = new Date().getTime();
    // Display animation info 
    document.getElementById('info').innerHTML=
    "Genre: " + genre + 
    ", Round: " + round.toString() + 
    ", Limit: " + limit.toString() + 
    ", Allign: " + allign.toString() + 
    ", Offset: " + offset.toString() + 
    ", Characters left: " + str.length.toString() + 
    ", Radius: " + radius.toFixed(1).toString() +
    ", Interval: " + ((round+1)*interval).toFixed(2).toString();


     if (Math.floor((time-start)/span) - offset == 1){
   
        if (allign <= offset-roundOffset(round)){
            allign = calcAllign(radius);
            round++;
            ctx.font = (fontSize-round*fontReduc).toString() + 'pt serif';
            ctx.fillStyle = colors[round%8];
        }
        if (limit < round+1 || radius < 77){
            str = str.substring(offset, str.length);
            canvasInit();
        }
            
        ctx.rotate(2 * Math.PI / allign);
        ctx.save();
        ctx.translate(0, -1 * radius);
        ctx.fillText(str[offset], 0, 0);
        ctx.restore();
        radius -= (round+1)*interval;
        offset++;
    }

    if (offset+1 < str.length) {
        requestAnimFrame(animate);
    }
}

function roundOffset(n) {
    if (n==0)
        return 0;
    else
        return roundOffset(n-1) + 200 - 10*(n-1);
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
