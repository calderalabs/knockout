import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['ko-tournament-list'],
  tournaments: null,
  onShow: null
});
