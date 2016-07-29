import { Factory, faker } from 'ember-cli-mirage';

const { image, commerce } = faker;

export default Factory.extend({
  fullName: commerce.productName,
  logoUrl: image.avatar
});
