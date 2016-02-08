import Mirage, { faker } from 'ember-cli-mirage';

const { random } = faker;

export default Mirage.Factory.extend({
  name: faker.commerce.productName,

  game() {
    return random.arrayElement(['dota-2', 'league-of-legends']);
  }
});
