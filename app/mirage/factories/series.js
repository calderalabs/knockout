import Mirage, { faker } from 'ember-cli-mirage';

const { random, round } = Math;

export default Mirage.Factory.extend({
  bestOf: function() {
    return [1, 3, 5][round(random() * 2)];
  }
});
