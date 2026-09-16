
const { createCanvas, loadImage  } = require("canvas");

const { drawCrown, drawCubePattern, drawGoldFrame, drawGoldPlate, drawCoin, drawSword, swordProgress, drawCircularAvatar } = require("./royal.js"); 
const { getxp, truncateText } = require("../../utils.js");

async function draw_money_card (user, coin, rank){
    const avatar = await loadImage(
    user.displayAvatarURL({ dynamic: true, size: 128, extension: "png" })
    );
    const username = user.displayName


    const width = 1024;
    const height = 410;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#3d0f1a");
    bgGradient.addColorStop(1, "#1a0810");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    const textgradiant = ctx.createLinearGradient(750, 150, width, 300);
    textgradiant.addColorStop(0, "#6f6f6f");
    textgradiant.addColorStop(1, "#a2a2a2");

    // --- Motif de cubes en filigrane ---
    drawCubePattern(ctx, width, height);

    // --- Cadre doré ornemental ---
    drawGoldFrame(ctx, width, height, "#b8860b", "#f4d160");

    drawCrown(ctx, width / 2, 45, "#b8860b", "#f4d160");

    drawCircularAvatar(ctx, avatar, 150, 225, 90);

    drawGoldPlate(ctx, 20 ,20 , 400, 70, 0);

    drawCoin(ctx, 800, 150, 100);

    drawGoldPlate(ctx, 650, 300, 300, 70, 10 );

        // --- affichage des bloodcoin ---
    ctx.font = "bold 42px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.strokeStyle = "#303030";
    ctx.lineWidth = 7;
    ctx.lineJoin = "round"; // évite les angles pointus disgracieux sur les contours épais

    // Ligne 1
    ctx.strokeText(`${coin}`, 800, 335);
    ctx.fillStyle = textgradiant;
    ctx.fillText(`${coin}`, 800, 335);

    // --- affichage du pseudo ---

    ctx.font = "bold 45px Arial";
    ctx.fillStyle = textgradiant;
    ctx.strokeStyle = "#303030";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.strokeText(truncateText(username, 10), 30, 50);
    ctx.fillText(truncateText(username, 10), 30, 50);

        // --- affichage du rang ---
    if( rank < 10000){ // n'afficher de rang que si il est entre 1 et 9999 car au dela ca risque de poser des problème graphique
      ctx.font = "bold 50px Arial";
      let rankcolor;
      switch(rank){
        case 1:
        rankcolor = ctx.createLinearGradient(487, 0, 537, 100);
          rankcolor.addColorStop(0, '#f4d160');
          rankcolor.addColorStop(0.5, '#b8860b');
          rankcolor.addColorStop(1, '#f4d160');
        break;
        case 2:
        rankcolor = ctx.createLinearGradient(487, 0, 537, 100);
          rankcolor.addColorStop(0, '#808080');
          rankcolor.addColorStop(0.5, '#9e9999');
          rankcolor.addColorStop(1, '#808080');
        break;
        case 3:
        rankcolor = ctx.createLinearGradient(487, 0, 537, 100);
          rankcolor.addColorStop(0, '#9f4e0c');
          rankcolor.addColorStop(0.5, '#cf7c38');
          rankcolor.addColorStop(1, '#9f4e0c');
        break;
        default:
        rankcolor = ctx.createLinearGradient(487, 0, 537, 100);
          rankcolor.addColorStop(0, '#ffffff');
          rankcolor.addColorStop(0.5, '#ffffff');
          rankcolor.addColorStop(1, '#ffffff');
        break;


      }
      ctx.strokeStyle = rankcolor;
      ctx.fillStyle = rankcolor;
      ctx.textAlign = "center";
      ctx.fillText(truncateText(`#${rank}`, 10), 512, 100);
    }

    const img = canvas.toBuffer();
    return img;

}

module.exports = { draw_money_card }