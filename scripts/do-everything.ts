import cloneRepo from 'git-clone-repo';
import * as fs from 'fs-extra';
import * as md5File from 'md5-file';
import { sortBy } from 'lodash';
import * as x from 'x-ray-scraper';
import * as dotenv from 'dotenv';
import { simpleGit } from 'simple-git';

import { getSetCards } from './helpers/get-set-cards';
import { getAllCardIdsBySet } from './helpers/get-all-card-ids';
import { getCardImage }  from './helpers/get-card-image';

dotenv.config();

(async () => {

  // get cache
  cloneRepo('LimeLightCards/scraper-data', { destination: 'cache' });
  
  // get md5 of sets.json
  const md5Old = md5File.sync('cache/sets.json');
  
  // get sets
  const getSets = async () => {
    const sets = await x(`https://en.ws-tcg.com/cardlist/list/`, '#expansionList li', [{
      set: '@class'
    }]);
  
    const setNumbers = sortBy(sets.map((data: any) => +data.set.replace('expansion_item_', '')));
  
    fs.writeJsonSync('./cache/sets.json', setNumbers);
  };
  
  await getSets();
  
  // get md5 of sets.json
  const md5New = md5File.sync('cache/sets.json');
  
  // if new md5 matches old md5, exit
  if(md5Old === md5New) {
    console.log('No new sets found.');
    process.exit(0);
  }
  
  // get all set cards
  const getAllSetCards = async () => {
  
    const allSets = fs.readJsonSync('./cache/sets.json');

    for await (const set of allSets) {
      if(fs.existsSync(`./cache/setcards/${set}.json`)) {
        console.log(`Set ${set} exists. Skipping...`);
        continue;
      }

      console.log(`Starting cards for set ${set}.`);
      const cards = await getSetCards(set);
      fs.writeJsonSync(`./cache/setcards/${set}.json`, cards);
      console.log(`Finished cards for set ${set}!`);
    }
  };

  await getAllSetCards();
  
  // get all set card images
  const getAllSetCardImages = async () => {
    const allIds = getAllCardIdsBySet();

    for await (const setData of allIds) {
      const allImages = {};
  
      const { set, cards } = setData;
  
      if(fs.existsSync(`./cache/cardimages/${set}.json`)) {
        console.log(`Skipping images for set ${set}...`);
        continue;
      }
  
      console.log(`Starting images for set ${set}...`);
    
      for await (const id of cards) {
    
        const image = await getCardImage(id);
        allImages[id] = image;
    
        console.log(`Card ${id} image: ${image}`);
      }
    
      fs.writeJsonSync(`./cache/cardimages/${set}.json`, allImages);
  
      console.log(`Finished images for set ${set}!`);
    }
  };

  await getAllSetCardImages();
  
  // update repo
  const updateRepo = async () => {
    const url = `https://${process.env.SCRAPER_USERNAME}:${process.env.SCRAPER_PAT}@github.com/LimeLightCards/scraper-data.git`;

    const git = simpleGit({
      baseDir: 'cache'
    });

    try {
      await git.addConfig('user.name', process.env.SCRAPER_NAME);
      await git.addConfig('user.email', process.env.SCRAPER_EMAIL);
      
      await git.removeRemote('origin');
      await git.addRemote('origin', url);
  
      await git.add('.');
  
      await git.commit('[Automated] Add new sets');
  
      await git.push('origin', 'main');
    } catch(e) {
      console.error(e);
    }
  };

  await updateRepo();

})();
