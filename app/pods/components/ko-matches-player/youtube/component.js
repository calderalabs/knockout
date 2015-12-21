import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  vod: null,

  url: computed('vod.url', function() {
    return this.get('vod.url').replace('watch?v=', 'embed/');
  })
});
