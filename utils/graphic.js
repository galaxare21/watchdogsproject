const { guild : { style } } = require("../config.json");

let draw_xp_card;
let draw_money_card;

try {
  ({ draw_xp_card } = require(`./style/${style}/xp_card.js`));
} catch (err) {
  console.error(`Style "${style}" introuvable, fallback sur "royal"`);
  ({ draw_xp_card } = require(`./style/royal/xp_card.js`));
}

try {
    ({ draw_money_card } = require(`./style/${style}/money_card.js`));
} catch (err) {
      console.error(`Style "${style}" introuvable, fallback sur "royal"`);
  ({ draw_money_card } = require(`./style/royal/money_card.js`));
}




module.exports = { draw_xp_card, draw_money_card };




