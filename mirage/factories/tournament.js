import { Factory, faker } from 'ember-cli-mirage';

const { list, commerce } = faker;

export default Factory.extend({
  name: commerce.productName,
  game: list.cycle('dota2', 'lol', 'hearthstone', 'csgo', 'sc2')
});
