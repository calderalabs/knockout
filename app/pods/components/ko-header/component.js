import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'header',
  classNames: ['ko-header'],
  title: null,
  titleComponent: 'ko-header/title'
});
