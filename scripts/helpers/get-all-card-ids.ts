
const fs = require('fs-extra');

export function getAllCardIds() {
  const cardJsons = fs.readdirSync('./cache/setcards');
  
  return cardJsons.map(cardJson => {
    return fs.readJsonSync(`./cache/setcards/${cardJson}`);
  }).flat();
}