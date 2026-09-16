const { createCanvas, loadImage } = require("canvas");

function drawCoin(ctx, x, y, size){
  ctx.save();
  ctx.translate(x, y);

  const goldGradient = ctx.createLinearGradient(-size, -size, size, size);
  goldGradient.addColorStop(0, '#8a6a1f');
  goldGradient.addColorStop(0.3, '#f5d576');
  goldGradient.addColorStop(0.5, '#fff3c4');
  goldGradient.addColorStop(0.7, '#f5d576');
  goldGradient.addColorStop(1, '#8a6a1f');

  const edgeGradient = ctx.createLinearGradient(-size, -size, size, size);
  edgeGradient.addColorStop(0, '#6b4e14');
  edgeGradient.addColorStop(0.5, '#c9a02f');
  edgeGradient.addColorStop(1, '#6b4e14');

  // corps de la pièce
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, Math.PI * 2);
  ctx.fillStyle = goldGradient;
  ctx.fill();
  ctx.lineWidth = size * 0.08;
  ctx.strokeStyle = edgeGradient;
  ctx.stroke();

  // anneau intérieur (cadre du motif)
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.78, 0, Math.PI * 2);
  ctx.lineWidth = size * 0.05;
  ctx.strokeStyle = edgeGradient;
  ctx.stroke();

  // ===== MOTIF (remplaçable) =====
  // ici : une étoile à 5 branches, centrée en (0,0), dimensionnée via 'size'
  // ctx.beginPath();
  // const spikes = 5;
  // const outerR = size * 0.5;
  // const innerR = size * 0.22;
  // for (let i = 0; i < spikes * 2; i++) {
  //   const r = i % 2 === 0 ? outerR : innerR;
  //   const angle = (Math.PI / spikes) * i - Math.PI / 2;
  //   const px = Math.cos(angle) * r;
  //   const py = Math.sin(angle) * r;
  //   if (i === 0) ctx.moveTo(px, py);
  //   else ctx.lineTo(px, py);
  // }
  // ctx.closePath();
  // ctx.fillStyle = edgeGradient;
  // ctx.fill();
  // ===== FIN MOTIF =====

// ===== MOTIF (remplaçable) =====
  ctx.strokeStyle = edgeGradient;
  ctx.lineWidth = size * 0.05;
  ctx.beginPath();

  const points = [];
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 / 5) * i + Math.PI / 2;
    points.push([Math.cos(angle) * size * 0.45, -Math.sin(angle) * size * 0.45]);
  }

  const order = [0, 2, 4, 1, 3, 0];
  order.forEach((idx, i) => {
    const [px, py] = points[idx];
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });

  ctx.stroke();
// ===== FIN MOTIF =====

  ctx.restore();
}

module.exports = { drawCoin }