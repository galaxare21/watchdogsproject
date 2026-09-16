const { createCanvas, loadImage } = require("canvas");
const { map } = require("../../../utils.js")

function swordProgress(ctx, x, y, pregressInPercent){
    const progress = map(pregressInPercent, 0, 100, 0, 525)
    ctx.beginPath();
    ctx.moveTo(x + 100, y - 25);
    ctx.lineTo(x + 100 + progress  , y - 25);
    ctx.lineTo(x + 100 + progress + 25, y);
    ctx.lineTo(x + 100 + progress , y + 25);
    ctx.lineTo(x + 100, y + 25);
    ctx.closePath();
    ctx.lineWidth = 3;
    const silverGradient = ctx.createLinearGradient(x + 100, y - 75, x + 100, y + 75);
    silverGradient.addColorStop(0, '#808080');
    silverGradient.addColorStop(0.5, '#545454');
    silverGradient.addColorStop(1, '#808080');
    ctx.strokeStyle = silverGradient;
    ctx.fillStyle = silverGradient;
    ctx.fill();
    ctx.stroke();

}



module.exports = { swordProgress }