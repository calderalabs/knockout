import { Factory, faker } from 'ember-cli-mirage';

const { list, commerce } = faker;

export default Factory.extend({
  name: commerce.productName,
  gameId: list.cycle('dota2', 'csgo', 'overwatch')
});
