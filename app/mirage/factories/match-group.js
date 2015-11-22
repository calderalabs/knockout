import Mirage/*, { faker }*/ from 'ember-cli-mirage';

const { random, round } = Math;

export default Mirage.Factory.extend({
  bestOf() {
    return [1, 3, 5][round(random() * 2)];
  }
});
