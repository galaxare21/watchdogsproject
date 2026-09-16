const { createCanvas, loadImage } = require("canvas");

function drawCircularAvatar(ctx, image, centerX, centerY, radius) {
  const goldGradient = ctx.createLinearGradient(
    centerX - radius, centerY - radius,
    centerX + radius, centerY + radius
  );
  goldGradient.addColorStop(0, "#b8860b");
  goldGradient.addColorStop(0.5, "#f4d160");
  goldGradient.addColorStop(1, "#b8860b");

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
  ctx.fillStyle = goldGradient;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
  ctx.strokeStyle = "#1a0810";
  ctx.lineWidth = 2;
  ctx.stroke();

  // save() avant le clip pour dessiner l'anneau intérieur après sans être coupé
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.clip();
  drawImageCropped(ctx, image, centerX - radius, centerY - radius, radius * 2, radius * 2);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = goldGradient;
  ctx.lineWidth = 3;
  ctx.stroke();
}

module.exports = { drawCircularAvatar }

function drawImageCropped(ctx, image, x, y, width, height) {
  const imgRatio = image.width / image.height;
  const targetRatio = width / height;
  let sx, sy, sWidth, sHeight;

  if (imgRatio > targetRatio) {
    sHeight = image.height;
    sWidth = sHeight * targetRatio;
    sx = (image.width - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = image.width;
    sHeight = sWidth / targetRatio;
    sx = 0;
    sy = (image.height - sHeight) / 2;
  }

  ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
}