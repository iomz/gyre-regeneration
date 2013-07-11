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

var canvas, ctx, radius, angle, interval, offset, span, round, audio, ogg, mp3, fondSize;
var list = ['regeneration','meme','nuclear','brain','technology','universe'];
var genre = list[Math.floor(Math.random()*list.length)];
var str = new String();
var start = new Date().getTime();
var colors = new Array();

init();
animate();

function init(){
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

    canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    // Canvas setup
    ctx.translate(canvas.width / 2 - 20, canvas.height / 2 - 20);
    ctx.rotate(2*Math.PI*Math.random());
    offset = 0;
    round = 0;

    // Initialize the white color
    ctx.fillStyle = '#FFFFFF';

    // Font initialization
    fontSize = 13;
    ctx.font = fontSize.toString() + 'pt serif';

    // Angle of one round
    angle = Math.PI * 2;
 
    // Number of characters on one round
    allign = 200;
 
    // Interval between the rounds
    interval = 20;

    // Text printing speed
    span = 50;

    // Outmost radian for the spiral
    radius = 400;

    // Load string
    str = getString('data/'+genre);

    // Black and white gradation array
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
    ctx.save();
}

function animate() {
    var time = new Date().getTime();
    if(Math.floor((time-start)/span) - offset == 1){
        // Display animation info 
        document.getElementById('info').innerHTML="Round: " + round.toString() + " time: " + offset.toString() + " perimeter: " + str.length.toString();
    
        if(allign <= offset-roundOffset(round)){
            allign -= 2;
            round++;
            ctx.font = (fontSize-round*.4).toString() + 'pt serif';
            ctx.fillStyle = colors[round%32];
        }
        ctx.rotate(angle / allign);
        ctx.save();
        ctx.translate(0, -1 * radius);
        ctx.fillText(str[offset], 0, 0);
        ctx.restore();
        radius -= 0.1 + 0.001*round;
        offset++;
    }

    if (offset+1 < str.length) {
        requestAnimFrame(animate);
    }
}

function roundOffset(n){
    if(n==0)
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
