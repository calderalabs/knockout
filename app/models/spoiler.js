import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo } = DS;
const { computed, ObjectProxy } = Ember;

export default Model.extend({
  name: attr('string'),
  matchGroup: belongsTo('match-group'),
  match: belongsTo('match'),

  spoilerable: computed('matchGroup', 'match', {
    get() {
      return this.get('matchGroup') || this.get('match');
    },

    set(_, value) {
      if (value == null) {
        this.set('matchGroup', null);
        this.set('match', null);
      } else {
        let constructor = value.constructor;

        if (value instanceof ObjectProxy) {
          constructor = value.get('content').constructor;
        }

        this.set(constructor.modelName.camelize(), value);
      }

      return value;
    }
  })
});
