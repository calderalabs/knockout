import Mirage, { faker } from 'ember-cli-mirage';

const { Factory } = Mirage;
const { list, commerce } = faker;

export default Factory.extend({
  name: commerce.productName,
  game: list.cycle('dota2', 'lol', 'hearthstone', 'csgo', 'sc2')
});
