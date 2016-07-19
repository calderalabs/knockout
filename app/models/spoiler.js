import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo } = DS;
const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  matchGroup: belongsTo('match-group'),
  match: belongsTo('match'),

  spoilerable: computed('matchGroup', 'match', {
    get() {
      return this.get('matchGroup') || this.get('match');
    },

    set(_, value) {
      return this.set(value.constructor.modelName.camelize(), value);
    }
  })
});
