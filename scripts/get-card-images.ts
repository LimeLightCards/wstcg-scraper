
const fs = require('fs-extra');

const { getAllCardIds } = require('./helpers/get-all-card-ids');
const { getCardImage } = require('./helpers/get-card-image');

const allIds = getAllCardIds();

(async () => {
  const allImages = {};

  for await (const id of allIds) {

    const image = await getCardImage(id);
    allImages[id] = image;

    console.log(`Card ${id} image: ${image}`);
  }

  fs.writeJsonSync('./cache/card-images.json', allImages);
})();