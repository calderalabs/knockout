import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  matchGroup: belongsTo(),
  winner: belongsTo('team')
});
