const { createCanvas, loadImage } = require("canvas");

function drawGoldPlate(ctx, x, y, sizeX, sizeY, gemdistance, color1, color2){

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + sizeX, y);
  ctx.lineTo(x + sizeX + gemdistance, y + (sizeY / 2));
  ctx.lineTo(x + sizeX, y + sizeY);
  ctx.lineTo(x, y + sizeY);
  ctx.lineTo(x - gemdistance, y + (sizeY / 2));
  ctx.closePath();
  const goldGradient2 = ctx.createLinearGradient(x, y, x + sizeX , y + sizeY);
    goldGradient2.addColorStop(0, "#b8860b");
    goldGradient2.addColorStop(0.5, "#f4d160");
    goldGradient2.addColorStop(1, "#b8860b");
  ctx.fillStyle = goldGradient2;
  ctx.fill();
  const goldGradient = ctx.createLinearGradient(x, y, x + sizeX , y + sizeY);
    goldGradient.addColorStop(0, "#644a08");
    goldGradient.addColorStop(0.5, "#f4d160");
    goldGradient.addColorStop(1, "#644a08");
  ctx.strokeStyle = goldGradient;
  ctx.lineWidth = 5;
  ctx.stroke();
}

module.exports = { drawGoldPlate }