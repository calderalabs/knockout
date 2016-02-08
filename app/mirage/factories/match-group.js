import Mirage, { faker } from 'ember-cli-mirage';

const { random } = faker;

export default Mirage.Factory.extend({
  elimination: false,

  vods: [{
    label: 'Cerco Risorse di Rete',
    url: 'https://www.youtube.com/watch?v=Tu6gSIbzu6I',
    type: 'youtube'
  }],

  bestOf() {
    return random.arrayElement([1, 3, 5]);
  }
});
