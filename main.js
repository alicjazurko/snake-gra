// ----------- ZMIENNE ---------------------------
const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');
canv.width = 600;
canv.height = 600;

const cw = canv.width;
const ch = canv.height;

const playerSize = 20;
const rows = ch/playerSize;
const columns = cw/playerSize;

let xv = 0;
let yv = 0;

let playerX = cw/2;
let playerY = ch/2;

let gs = 20;
let tc = 30;

let appleX = 15;
let appleY = 15;

let scores = document.querySelector('div');

window.addEventListener('keydown', function keyPush(e) {
    switch(e.keyCode) {
        case 37: 
        xv = -1;
        yv = 0;
        break;
        case 38: 
        xv = 0;
        yv = -1;
        break;
        case 39: 
        xv = 1;
        yv = 0;
        break;
        case 40: 
        xv = 0;
        yv = 1;
        break;
    }
});


let trail = [];
let tail = 5;

function game() {
    playerX += xv;
    playerY += yv;
//warunki zeby przechodzil z konca planszy na początek
    if (playerX < 0) {
        playerX = tc - 1;
    }

    if (playerX > tc - 1) {
        playerX = 0;
    }

    if (playerY < 0) {
        playerY = tc - 1;
    }

    if (playerY > tc - 1) {
        playerY= 0;
    }

    ctx.fillStyle = 'lightslategray';
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = 'orangered';
    ctx.fillRect(gs*appleX, gs*appleY, gs - 1, gs - 1);

    ctx.fillStyle = 'lightsalmon';

    for(var i = 0; i < trail.length; i++) {

        ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs - 2, gs - 2);
        if(trail[i].x == playerX && trail[i].y == playerY) {
            tail = 5;
            scores.textContent = 0;
        }
    }

    trail.push({x:playerX, y:playerY});
    while (trail.length > tail) {
        trail.shift();
    }
    

    if(appleX == playerX && appleY == playerY) {
        tail++;
        appleX = Math.floor(Math.random()*tc);
        appleY = Math.floor(Math.random()*tc);
    
        scores.textContent = tail - 5; 
    }

}

    setInterval(game, 1000/10);
