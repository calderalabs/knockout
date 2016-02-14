import Mirage, { faker } from 'ember-cli-mirage';

const { random } = faker;

export default Mirage.Factory.extend({
  name: faker.commerce.productName,

  game() {
    return random.arrayElement(['dota2', 'lol', 'hearthstone', 'csgo', 'sc2']);
  }
});
