const { createCanvas, loadImage  } = require("canvas");

const { drawCrown, drawCubePattern, drawGoldFrame, drawGoldPlate, drawCoin, drawSword, swordProgress, drawCircularAvatar } = require("./royal.js"); 
const { getxp, truncateText } = require("../../utils.js");


async function draw_xp_card(user, xp, lvl, rank, progress){

    const avatar = await loadImage(
      user.displayAvatarURL({ dynamic: true, size: 128, extension: "png" })
    );

    const username = user.displayName
   
    
    const width = 1024;
    const height = 410;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // --- Fond dégradé bordeaux ---
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#3d0f1a");
    bgGradient.addColorStop(1, "#1a0810");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // --- Motif de cubes en filigrane ---
    drawCubePattern(ctx, width, height);

    // --- Cadre doré ornemental ---
    drawGoldFrame(ctx, width, height, "#b8860b", "#f4d160");

    // --- Couronne en haut au centre ---
    drawCrown(ctx, width / 2, 45, "#b8860b", "#f4d160");

    // --- Avatar circulaire ---
    drawCircularAvatar(ctx, avatar, 150, 225, 90);

    // --- trace l'épé --- 


    
    drawSword(ctx, 315, 225); // les coordonné sont celle de la gemme sur le manche

    drawGoldPlate(ctx, 665, 35, 300, 125, 15); // coordonné taille et distance des gem

    drawGoldPlate(ctx, 20 ,20 , 400, 70, 0);

    drawGoldPlate(ctx, 520, 280, 350, 100, 15);

    swordProgress(ctx, 315, 225, progress);

    




    const textgradiant = ctx.createLinearGradient(750, 150, width, 300);
    textgradiant.addColorStop(0, "#6f6f6f");
    textgradiant.addColorStop(1, "#a2a2a2");

    // --- affichage du niveau ---
    ctx.font = "bold 42px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ctx.strokeStyle = "#303030";
    ctx.lineWidth = 7;
    ctx.lineJoin = "round"; // évite les angles pointus disgracieux sur les contours épais

    // Ligne 1
    ctx.strokeText(`Niveau : ${lvl}`, 690, 70);
    ctx.fillStyle = textgradiant;
    ctx.fillText(`Niveau : ${lvl}`, 690, 70);

    // Ligne 2
    ctx.strokeText(`${xp} XP`, 690, 120);
    ctx.fillStyle = textgradiant;
    ctx.fillText(`${xp} XP`, 690, 120);

    // --- affichage du pseudo ---

    ctx.font = "bold 45px Arial";
    ctx.fillStyle = textgradiant;
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



    // ---  ---
    ctx.font = "bold 45px Arial";
    const lvlcolor = ctx.createLinearGradient(450, 290, 400, 340);
      lvlcolor.addColorStop(0, '#f4d160');
      lvlcolor.addColorStop(0.5, '#b8860b');
      lvlcolor.addColorStop(1, '#f4d160');
    ctx.fillStyle = lvlcolor;
    ctx.strokeStyle = lvlcolor;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 5;
    ctx.strokeText(`${lvl}`, 450, 290);
    ctx.strokeText(`${lvl + 1}`, 900, 290);
    ctx.fillText(`${lvl}`, 450, 290);
    ctx.fillText(`${lvl + 1}`, 900, 290);


    ctx.font = "bold 45px Arial";
    ctx.strokeStyle = "#303030";
    ctx.fillStyle = textgradiant;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(`${xp - getxp(lvl)} / ${getxp(lvl + 1) - getxp(lvl)}`, 695, 330);
    ctx.fillText(`${xp - getxp(lvl)} / ${getxp(lvl + 1) - getxp(lvl)}`, 695, 330);


    const img = canvas.toBuffer();

    return img;
}

module.exports = { draw_xp_card }