import Mirage, { faker } from 'ember-cli-mirage';

const { random } = faker;

export default Mirage.Factory.extend({
  elimination: false,

  bestOf() {
    return random.arrayElement([1, 3, 5]);
  }
});
