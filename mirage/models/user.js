import { Model, faker } from 'ember-cli-mirage';

const { name, random } = faker;
const { assign } = Object;

export default Model.extend({
  constructor(schema, modelName, attrs = {}, fks) {
    Model.call(this, schema, modelName, assign({
      name: name.findName(),
      newMatchesCount: random.number(20)
    }, _.omitBy(attrs, _.isNull)), fks);
  }
});;
