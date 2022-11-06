
const x = require('x-ray-scraper');

export async function getSetCards(setCode: string) {

  const getPage = async (page: number) => {
    const firstPage = await fetch('https://en.ws-tcg.com/cardlist/list/detail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(`id=${setCode}&page=${page}`).toString()
    });
  
    const html = await firstPage.text();
  
    return html;
  };

  const getMaxPages = async () => {
    const html = await getPage(1);
    const maxPages = await x(html, 'p a:nth-last-child(2)');
    return Math.max(1, +maxPages);
  };

  const getCardsFromPage = async (page: number) => {
    const html = await getPage(page);

    const cards = await x(html, 'table tr', [{
      name: 'td:nth-child(1)',
    }]);

    return cards.map(x => x.name);
  }

  const maxPages = await getMaxPages();
  const pagesByNumber = Array(maxPages).fill(0).map((x, i) => i + 1);

  console.log(maxPages, pagesByNumber);

  const unflatCards = await Promise.all(pagesByNumber.map(pageNumber => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const cardsInPage = await getCardsFromPage(pageNumber);
        resolve(cardsInPage);
      }, pageNumber * 250);
    })
  }));

  const allCards = unflatCards
                    .flat()
                    .map((x: string) => x.trim())
                    .filter(Boolean);

  return allCards;
};