
const fs = require('fs-extra');

const { getAllCardIdsBySet } = require('./helpers/get-all-card-ids');
const { getCardImage } = require('./helpers/get-card-image');

fs.ensureDirSync('./cache/cardimages');

const allIds = getAllCardIdsBySet();

(async () => {
  for await (const setData of allIds) {
    const allImages = {};

    const { set, cards } = setData;

    if(fs.existsSync(`./cache/cardimages/${set}.json`)) {
      console.log(`Skipping set ${set}...`);
      continue;
    }

    console.log(`Starting set ${set}...`);
  
    for await (const id of cards) {
  
      const image = await getCardImage(id);
      allImages[id] = image;
  
      console.log(`Card ${id} image: ${image}`);
    }
  
    fs.writeJsonSync(`./cache/cardimages/${set}.json`, allImages);

    console.log(`Finished set ${set}!`);
  }
})();