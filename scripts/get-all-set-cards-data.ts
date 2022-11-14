
const fs = require('fs-extra');

const { getCard } = require('./helpers/get-card');

fs.ensureDirSync('./cache/carddata');

const allSets = fs.readJsonSync('./cache/sets.json');

(async () => {
  // trigger, soul, two attributes
  // const cardData = await getCard('MM/W17-E001');

  const cardData = await getCard('LSS/W45-E030');
  console.log(cardData);
})();