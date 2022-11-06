
const fs = require('fs-extra');
const { sortBy } = require('lodash');
const x = require('x-ray-scraper');

fs.ensureDirSync('./cache');

const getSets = async () => {
  const sets = await x(`https://en.ws-tcg.com/cardlist/list/`, '#expansionList li', [{
    set: '@class'
  }]);

  const setNumbers = sortBy(sets.map((data: any) => +data.set.replace('expansion_item_', '')));

  fs.writeJsonSync('./cache/sets.json', setNumbers);
};

getSets();