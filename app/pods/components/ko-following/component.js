import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-following ko-main-section'],
  followings: null,
  tournaments: computed.mapBy('followings', 'tournament')
});
