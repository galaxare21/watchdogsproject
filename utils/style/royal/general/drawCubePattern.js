const { createCanvas, loadImage } = require("canvas");

function drawCubePattern(ctx, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 2;

  const cubeSize = 90;
  const spacing = 130;

  for (let y = -cubeSize; y < height + cubeSize; y += spacing) {
    for (let x = -cubeSize; x < width + cubeSize; x += spacing) {
      const offsetY = (Math.floor(x / spacing) % 2 === 0) ? 0 : spacing / 2;
      drawIsoCube(ctx, x, y + offsetY, cubeSize);
    }
  }
  ctx.restore();
}

module.exports = { drawCubePattern }

function drawIsoCube(ctx, x, y, size) {
  const h = size * 0.5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size / 2, y - h / 2);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size / 2, y + h / 2);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + h);
  ctx.moveTo(x + size, y);
  ctx.lineTo(x + size, y + h);
  ctx.moveTo(x + size / 2, y + h / 2);
  ctx.lineTo(x + size / 2, y + h / 2 + h);
  ctx.stroke();
}