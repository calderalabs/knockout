import { Factory, faker } from 'ember-cli-mirage';

const { random, list } = faker;

export default Factory.extend({
  likesCount: () => random.number(1000),

  vod: list.cycle({
    url: 'https://www.youtube.com/embed/Tu6gSIbzu6I',
    type: 'youtube'
  }, {
    url: 'https://player.twitch.tv/?video=v52238360&t=8m55s',
    type: 'twitch'
  })
});
