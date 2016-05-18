import Mirage, { faker } from 'ember-cli-mirage';

const { Factory } = Mirage;
const { image, commerce } = faker;

export default Factory.extend({
  'short-name': commerce.productName,
  'full-name': commerce.productName,
  'logo-url': image.avatar
});
