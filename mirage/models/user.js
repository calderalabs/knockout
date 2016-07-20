import { Model, faker } from 'ember-cli-mirage';

const { name, random } = faker;
const { assign } = Object;

export default Model.extend({
  constructor(schema, modelName, attrs = {}, fks) {
    Model.call(this, schema, modelName, assign({
      name: name.findName()
    }, _.omitBy(attrs, _.isNull)), fks);
  }
});;
