
const x = require('x-ray-scraper');

x.concurrency(1);
x.throttle(1, 50);

export async function getCardImage(cardId: string) {

  const cardData = await x(`https://en.ws-tcg.com/cardlist/list/?cardno=${encodeURIComponent(cardId)}`, '#cardDetail table', {
    image: 'img@src'
  });

  return cardData.image;

};