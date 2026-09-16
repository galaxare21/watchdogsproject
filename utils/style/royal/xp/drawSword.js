const { createCanvas, loadImage } = require("canvas");

function drawSword(ctx, x, y){
    // --- blade ---
    ctx.beginPath();
    ctx.moveTo(x + 100, y - 25);
    ctx.lineTo(x + 625, y - 25);
    ctx.lineTo(x + 650, y);
    ctx.lineTo(x + 625, y + 25);
    ctx.lineTo(x + 100, y + 25);
    ctx.closePath();
    ctx.lineWidth = 3;
    const silverGradient = ctx.createLinearGradient(-40, -20, 40, 20);
    silverGradient.addColorStop(0, '#808080');
    silverGradient.addColorStop(0.5, '#9e9999');
    silverGradient.addColorStop(1, '#808080');
    ctx.strokeStyle = silverGradient;
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.stroke();

    // --- handle ---
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x + 80 , y - 15);
    ctx.lineTo(x + 87, y - 75);
    ctx.lineTo(x + 100, y - 75);
    ctx.lineTo(x + 100, y - 25);
    ctx.lineTo(x + 100, y + 25);
    ctx.lineTo(x + 100, y + 75);
    ctx.lineTo(x + 87, y + 75);
    ctx.lineTo(x + 80, y + 15);
    ctx.lineTo(x, y + 10);
    ctx.closePath();
    const handlegradiant = ctx.createLinearGradient(x + 100, y - 75, x + 100, y + 75);
    handlegradiant.addColorStop(0, '#f4d160');
    handlegradiant.addColorStop(0.5, '#b8860b');
    handlegradiant.addColorStop(1, '#f4d160');
    ctx.fillStyle = handlegradiant;
    ctx.fill();

    //
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2); // 400 275
    const goldGradient1 = ctx.createLinearGradient(x - 20, y - 20, x + 20, y + 20);
    goldGradient1.addColorStop(0, '#b8860b');
    goldGradient1.addColorStop(0.5, '#f4d160');
    goldGradient1.addColorStop(1, '#b8860b');
    ctx.strokeStyle = goldGradient1;
    ctx.lineWidth = 5;
    ctx.stroke();
    const goldGradient2 = ctx.createLinearGradient(x - 20, y - 20, x + 20, y + 20);
    goldGradient2.addColorStop(0, '#f4d160');
    goldGradient2.addColorStop(0.5, '#b8860b');
    goldGradient2.addColorStop(1, '#f4d160');
    ctx.fillStyle = goldGradient2;
    ctx.fill();

    //
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.strokeStyle = "#470011";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#980023";
    ctx.fill();
}


module.exports = { drawSword }