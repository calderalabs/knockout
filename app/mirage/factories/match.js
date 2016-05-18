import Mirage, { faker } from 'ember-cli-mirage';

const { Factory } = Mirage;
const { random, list } = faker;

export default Factory.extend({
  number: list.cycle(1, 2, 3, 4, 5),
  'like-count': () => random.number(1000),

  vod: list.cycle({
    url: 'https://www.youtube.com/watch?v=Tu6gSIbzu6I',
    type: 'youtube'
  }, {
    url: 'https://www.twitch.tv/epicenter_en1/v/65974973?t=04h28m55s',
    type: 'twitch'
  })
});
