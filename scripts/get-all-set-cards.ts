
const fs = require('fs-extra');

const { getSetCards } = require('./helpers/get-set-cards');

fs.ensureDirSync('./cache/setcards');

const allSets = fs.readJsonSync('./cache/sets.json');

/*
(async () => {
  const cards = await getSetCards(180);
  fs.writeJsonSync('./cache/setcards/180.json', cards);
})();
*/

(async () => {
  for await (const set of allSets) {
    if(fs.existsSync(`./cache/setcards/${set}.json`)) {
      console.log(`Set ${set} exists. Skipping...`);
      continue;
    }

    console.log(`Starting set ${set}.`);
    const cards = await getSetCards(set);
    fs.writeJsonSync(`./cache/setcards/${set}.json`, cards);
    console.log(`Finished set ${set}!`);
  }
})();