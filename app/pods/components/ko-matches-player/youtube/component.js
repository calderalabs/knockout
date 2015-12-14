import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  model: null,

  url: computed('model.url', function() {
    return this.get('model.url').replace('watch?v=', 'embed/');
  })
});
