const { createCanvas, loadImage } = require("canvas");

function drawCrown(ctx, x, y, color1, color2) {
  ctx.save();
  ctx.translate(x, y);

  const goldGradient = ctx.createLinearGradient(-40, -20, 40, 20);
  goldGradient.addColorStop(0, color1);
  goldGradient.addColorStop(0.5, color2);
  goldGradient.addColorStop(1, color1);

  ctx.strokeStyle = goldGradient;
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(-35, 15);
  ctx.lineTo(-35, -5);
  ctx.lineTo(-20, 10);
  ctx.lineTo(0, -20);
  ctx.lineTo(20, 10);
  ctx.lineTo(35, -5);
  ctx.lineTo(35, 15);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = goldGradient;
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

module.exports = { drawCrown }