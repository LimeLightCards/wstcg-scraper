
const fs = require('fs-extra');

const { getCard } = require('./helpers/get-card');

fs.ensureDirSync('./cache/carddata');

const allSets = fs.readJsonSync('./cache/sets.json');

(async () => {
  const cardData = await getCard('MM/W17-E001');
  console.log(cardData);
})();