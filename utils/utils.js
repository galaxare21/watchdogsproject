const { xp : { xp_base_cost, xp_growth_rate } } = require("../config.json")

function map(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function truncateText(texte, maxLength = 10) {
  if (texte.length <= maxLength) return texte;
  return texte.substring(0, maxLength) + "...";
}

function getlevel(xp){
    return Math.floor((-xp_base_cost + Math.sqrt(xp_base_cost ** 2 + 4 * xp_growth_rate * xp)) / (2 * xp_growth_rate)) // ici on a la fonction de la courbe de progression pour calculer le niveau a partire de l'xp
}

function getxp(lvl){
    return Math.floor(xp_growth_rate * (lvl ** 2) + xp_base_cost * lvl) // ici la fonction réciproque pour calculer l'xp a partir du niveau
}

module.exports = { map, truncateText, getlevel, getxp };