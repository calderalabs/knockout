import { Model, faker } from 'ember-cli-mirage';
import _ from 'npm:lodash';

const { random, date } = faker;
const { assign } = Object;

export default Model.extend({
  constructor(schema, modelName, attrs = {}, fks) {
    Model.call(this, schema, modelName, assign({
      newMatchesCount: random.number(20),
      seenAt: date.past(),
    }, _.omitBy(attrs, _.isNull)), fks);
  }
});
