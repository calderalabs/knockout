import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ko-following'],
  onShow: null,
  model: null,
  tournaments: computed.mapBy('model', 'tournament')
});
