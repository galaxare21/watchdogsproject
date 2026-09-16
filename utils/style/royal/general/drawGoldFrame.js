const { createCanvas, loadImage } = require("canvas");

function drawGoldFrame(ctx, width, height, color1, color2) {
  const goldGradient = ctx.createLinearGradient(0, 0, width, 0);
  goldGradient.addColorStop(0, color1);
  goldGradient.addColorStop(0.5, color2);
  goldGradient.addColorStop(1, color1);

  const margin = 8;
  const thickness = 6;

  ctx.strokeStyle = goldGradient;
  ctx.lineWidth = thickness;
  ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

  const corners = [
    [margin, margin], [width - margin, margin],
    [margin, height - margin], [width - margin, height - margin]
  ];

}

module.exports = { drawGoldFrame }