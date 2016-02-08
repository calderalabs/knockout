import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ko-matches-player-youtube'],
  vod: null,

  url: computed('vod.url', function() {
    return this.get('vod.url').replace('watch?v=', 'embed/');
  })
});
