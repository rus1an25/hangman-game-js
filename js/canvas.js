const canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
ctx.lineWidth = 3;
ctx.strokeStyle = 'gray';

function paintingGallows() {
    ctx.beginPath();
    ctx.moveTo(150, 280);
    ctx.lineTo(10, 280);
    ctx.moveTo(50, 280);
    ctx.lineTo(50, 10);
    ctx.moveTo(10, 10);
    ctx.lineTo(210, 10);
    ctx.moveTo(170, 10);
    ctx.lineTo(170, 70);
    ctx.moveTo(80, 280);
    ctx.lineTo(50, 250);
    ctx.moveTo(50, 40);
    ctx.lineTo(80, 10);
    ctx.stroke();
}

function paintingMan(count) {
    ctx.beginPath();
    if (count == 1) {
        ctx.moveTo(185, 85);
        ctx.arc(170, 85, 15, 0, 2 * Math.PI, false); //Голова
    } else if (count == 2) {
        ctx.moveTo(185, 150);
        ctx.lineTo(170, 100); //Правая рука
    } else if (count == 3) {
        ctx.moveTo(170, 100);
        ctx.lineTo(155, 150); //Левая рука
    } else if (count == 4) {
        ctx.moveTo(170, 100);
        ctx.lineTo(170, 150); //Торс
    } else if (count == 5) {
        ctx.moveTo(170, 150);
        ctx.lineTo(150, 200);
        ctx.lineTo(140, 197); //Лева нога
    } else if (count == 6) {
        ctx.moveTo(170, 150);
        ctx.lineTo(190, 200);
        ctx.lineTo(200, 197); //Правая нога
    }
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, 240, 280);
}

function clearMan() {
    ctx.clearRect(85, 68.5, 240, 200);
}