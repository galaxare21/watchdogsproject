// General's function

const { drawCircularAvatar } = require("../general/drawCircularAvatar.js")
const { drawCrown } = require("./general/drawCrown.js");
const { drawCubePattern } = require("./general/drawCubePattern.js");
const { drawGoldFrame } = require("./general/drawGoldFrame.js");
const { drawGoldPlate } = require("./general/drawGoldPlate.js");

// Money's function

const { drawCoin } = require("./money/drawCoin.js");

//  XP's function

const { drawSword } = require("./xp/drawSword.js");
const { swordProgress } = require("./xp/swordProgress.js");

module.exports = { 
    drawCircularAvatar,
    drawCrown,
    drawCubePattern,
    drawGoldFrame,
    drawGoldPlate,

    drawCoin,

    drawSword,
    swordProgress
}
