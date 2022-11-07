
const fs = require('fs-extra');
const { sortBy } = require('lodash');

export function getAllCardIds() {
  const cardJsons = sortBy(
    fs.readdirSync('./cache/setcards'),
    cardJson => +cardJson.replace('.json', '')
  );
  
  return cardJsons.map(cardJson => {
    return fs.readJsonSync(`./cache/setcards/${cardJson}`);
  }).flat();
}

export function getAllCardIdsBySet() {
  const cardJsons = sortBy(
    fs.readdirSync('./cache/setcards'),
    cardJson => +cardJson.replace('.json', '')
  );
  
  return cardJsons.map(cardJson => {
    return { 
      set: cardJson.replace('.json', ''),
      cards: fs.readJsonSync(`./cache/setcards/${cardJson}`) 
    };
  });
}