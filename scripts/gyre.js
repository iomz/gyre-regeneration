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

var canvas1, canvas2, canvas3, ctx1, ctx2, ctx3, outerRad, span, fontSize1, fontSize2, fontReduc, centerX, centerY;
var radius1, radius2, outerRad1, outerRad2, start, offset, round1, round2, allign1, interval1, interval2, limit1, limit2;
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
    var width = 1280;
    var height = 1024;
    centerX = 800/2*Math.random()+800/4;
    centerY = 600/3*Math.random()+600/3;

    canvas1 = document.createElement('canvas');
    canvas1.width = width;
    canvas1.height = height;
    canvas1.style="position: absolute; z-index: 0";
    ctx1 = canvas1.getContext('2d');
    ctx1.translate(centerX, centerY);
    document.body.appendChild(canvas1);

    canvas2 = document.createElement('canvas');
    canvas2.width = width;
    canvas2.height = height;
    canvas2.style="position: absolute; z-index: 1";
    ctx2 = canvas2.getContext('2d');
    ctx2.translate(centerX, centerY);
    document.body.appendChild(canvas2);
    
    canvas3 = document.createElement('canvas');
    canvas3.width = width;
    canvas3.height = height;
    canvas3.style="position: absolute; z-index: 2";
    ctx3 = canvas3.getContext('2d');
    ctx3.translate(centerX-26, centerY);
    document.body.appendChild(canvas3);

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

    // Text printing speed
    span = 50;

    // Initial radius
    outerRad = 400;

    // Font reduction
    fontReduc = 0.7;
 }

function canvasInit() {
    // Canvas setup
    ctx1.rotate(2*Math.PI*Math.random());
    ctx2.rotate(2*Math.PI*Math.random());
    offset = 0;
    round1 = 0;
    round2 = 0;

    // Initialize the white color
    ctx1.fillStyle = '#FFFFFF';
    ctx2.fillStyle = '#FFFFFF';
    ctx3.fillStyle = '#FFFFFF';

    // Font initialization
    fontSize1 = Math.floor(10*Math.random() + 3);
    ctx1.font = fontSize1.toString() + 'pt serif';
    fontSize2 = Math.floor(10*Math.random() + 3);
    ctx2.font = fontSize2.toString() + 'pt serif';
    ctx3.font = "20pt serif";

    // Interval initialization
    interval1 = Math.random() + 0.2;
    interval2 = Math.random() + 0.2;
 
    // Outmost radian for the spiral
    //outerRad -= 10*Math.random() + fontSize;
    //radius = outerRad;
    radius1 = outerRad*3/4*Math.random() + outerRad/2;
    outerRad1 = radius1;
    radius2 = outerRad*3/4*Math.random() + outerRad/2;
    outerRad2 = radius2;

    // Number of characters on one round
    allign1 = calcAllign(radius1, fontSize1);
    allign2 = calcAllign(radius2, fontSize2);

    limit1 = calcLimit(radius1, interval1, fontSize1);
    limit2 = calcLimit(radius2, interval2, fontSize2);

    ctx1.save();
    ctx2.save();

    start = window.performance.now ? window.performance.now() : new Date().getTime();
}

function calcAllign(r, fs) {
    return Math.floor(2 * Math.PI * r / fs);
}

function calcLimit(radius, interval, fs) {
    var r = radius;
    var rc = 1;
    do {
        for(var i=0; i<calcAllign(r, fs); i++){
            r -= (rc+1)*interval;
            if (r<100) return rc;
        }
        rc++;
    } while (100<calcAllign(r, fs));
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
    //var time = new Date().getTime();
    var time = window.performance.now ? window.performance.now() : new Date().getTime();

    // Display animation info 
    document.getElementById('info').innerHTML=
    "Genre: " + genre + 
    //", Characters left: " + (str.length - offset).toString() + 
    //", Radius: " + radius1.toFixed(1).toString() + " " + radius2.toFixed(1).toString() +
    ", Intervals: " + ((round1+1)*interval1).toFixed(2).toString() + " " + ((round2+1)*interval2).toFixed(2).toString();

    if (Math.ceil((time-start)/span) - offset == 1){
        ctx3.clearRect(-50,-50,150,100);
        ctx3.fillText((str.length - offset - 1).toString(),0,0);
 
        if (allign1 <= offset-roundOffset(round1)){
            allign1 = calcAllign(radius1, fontSize1);
            round1++;
            ctx1.font = (fontSize1-round1*fontReduc).toString() + 'pt serif';
        }
        if (allign2 <= offset-roundOffset(round2)){
            allign2 = calcAllign(radius2, fontSize2);
            round2++;
            ctx2.font = (fontSize2-round2*fontReduc).toString() + 'pt serif';
        }
        if (limit1 < round1+1 || limit2 < round2+1 || radius1 < 77 || radius2 < 77){
            str = str.substring(offset, str.length);
            canvasInit();
        }
            
        ctx1.fillStyle = getColor(radius1);
        ctx1.rotate(2 * Math.PI / allign1);
        ctx1.save();
        ctx1.translate(0, -1 * radius1);
        ctx1.fillText(str[offset], 0, 0);
        ctx1.restore();
        radius1 -= (round1+1)*interval1;

        ctx2.fillStyle = getColor(radius2);
        ctx2.rotate(2 * Math.PI / allign2);
        ctx2.save();
        ctx2.translate(0, -1 * radius2);
        ctx2.fillText(str[offset], 0, 0);
        ctx2.restore();
        radius2 -= (round2+1)*interval2;
        
        offset++;
    }

    if (offset < str.length) {
        requestAnimFrame(animate);
    }
}

function getColor(r) {
    if(outerRad*10/16 < r) return colors[0];
    else if(outerRad*8/16 < r) return colors[1];
    else if(outerRad*7/16 < r) return colors[2];
    else if(outerRad*6/16 < r) return colors[3];
    else if(outerRad*5/16 < r) return colors[4];
    else if(outerRad*4/16 < r) return colors[5];
    else if(outerRad*3/16 < r) return colors[6];
    else return colors[7];
}

// Need to fix the algorithm based on calc allign
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
