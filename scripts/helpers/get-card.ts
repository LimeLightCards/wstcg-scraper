

export async function getCard(cardId: string) {

  const res = await fetch(`https://www.encoredecks.com/api/card?cardcode=${cardId}`);
  const resJson = await res.json();

  // missing expansion, image needs correction, no flavor text

  console.log(resJson, resJson.locale);

  const cardData: any = {
    name: resJson.locale.EN.name,
    code: cardId,
    rarity: resJson.rarity,
    expansion: '',
    side: resJson.side,
    type: resJson.cardtype,
    color: resJson.colour.substring(0, 1),
    level: resJson.level || 0,
    cost: resJson.cost || 0,
    power: resJson.power || 0,
    soul: resJson.soul || 0,
    trigger: resJson.trigger,
    attributes: resJson.locale.EN.attributes.filter(Boolean),
    ability: resJson.locale.EN.ability.filter(Boolean),
    flavorText: '',
    set: resJson.set,
    release: resJson.release,
    sid: resJson.sid,
    image: '',
  };

  /*
  const cardDataHtml = await x(`https://en.ws-tcg.com/cardlist/list/?cardno=${cardId}`, '#cardDetail@html');
  const $ = cheerio.load(cardDataHtml, null, false);

  console.log($.html())

  const cardData: any = {
    name: $('.kana').text(),
    rarity: $('.cell_4').text(),
    expansion: $($('tr:nth-child(3)').children()[1]).text().trim(),
    side: $('tr:nth-child(3) img').attr('src'),
    type: $($('tr:nth-child(4)').children()[1]).text().trim(),
    color: $('tr:nth-child(4) img').attr('src'),
    level: $($('tr:nth-child(5)').children()[1]).text().trim(),
    cost: $($('tr:nth-child(5)').children()[3]).text().trim(),
    power: $($('tr:nth-child(6)').children()[1]).text().trim(),
    soul: $('tr:nth-child(6) img').attr('src'),
    trigger: $($('tr:nth-child(7)').children()[1]).contents().get().map(x => $(x).attr('src')),
    attribute: $($('tr:nth-child(7)').children()[3]).text().trim(),
    ability: $($('tr:nth-child(8)').children()[1]).text().trim(),
    flavorText: $($('tr:nth-child(9)').children()[1]).text().trim(),
    image: $('img').attr('src')
  };

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
  */

  return cardData;

};