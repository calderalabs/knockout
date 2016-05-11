import Mirage, { faker } from 'ember-cli-mirage';

const { Factory } = Mirage;
const { random, list } = faker;

export default Factory.extend({
  'number': list.cycle(1, 2, 3, 4, 5),
  'likes': () => random.number(1000)
});
