import { Factory, faker } from 'ember-cli-mirage';

const { image, commerce } = faker;

export default Factory.extend({
  shortName: commerce.productName,
  fullName: commerce.productName,
  logoUrl: image.avatar
});
