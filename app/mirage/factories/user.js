import Mirage, { faker } from 'ember-cli-mirage';

const { Factory } = Mirage;

export default Factory.extend({
  name: faker.name.findName
});
