
const x = require('x-ray-scraper');

/*
For some reason, this skips over a few steps and misses some fields. I'm not sure why.
*/
export async function getCard(cardId: string) {

  const cardData = await x(`https://en.ws-tcg.com/cardlist/list/?cardno=${cardId}`, '#cardDetail table', {
    name: '.kana@text',
    rarity: '.cell_4@text',
    expansion: 'tr:nth-child(3) td:nth-child(1)@text',
    side: 'tr:nth-child(3) img@src',
    type: 'tr:nth-child(4) td:nth-child(1)@text',
    color: 'tr:nth-child(4) img@src',
    level: 'tr:nth-child(5) td:nth-child(1)@text',
    cost: 'tr:nth-child(5) td:nth-child(2)@text',
    power: 'tr:nth-child(6) td:nth-child(1)@text',
    soul: 'tr:nth-child(6) td:nth-child(2)@text',
    trigger: 'tr:nth-child(7) td:nth-child(1)@text',
    attribute: 'tr:nth-child(7) td:nth-child(2)@text',
    ability: 'tr:nth-child(8) td:nth-child(1)@text',
    flavorText: 'tr:nth-child(9) td:nth-child(1)@text',
    image: 'img@src'
  });

  cardData.code = cardId;
  cardData.set = cardId.split('/')[0];
  cardData.release = cardId.split('/')[1].split('-')[0];
  cardData.sid = cardId.split('/')[1].split('-')[1];

  if(cardData.side.includes('/w.gif')) cardData.side = 'w';
  if(cardData.side.includes('/s.gif')) cardData.side = 's';

  if(cardData.color.includes('/red.gif')) cardData.color = 'red';
  if(cardData.color.includes('/blue.gif')) cardData.color = 'blue';
  if(cardData.color.includes('/green.gif')) cardData.color = 'green';
  if(cardData.color.includes('/yellow.gif')) cardData.color = 'yellow';

  // cardData.cost = +cardData.cost;
  // cardData.power = +cardData.power;

  return cardData;

};