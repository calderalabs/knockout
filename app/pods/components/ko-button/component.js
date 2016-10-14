import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'button',
  classNames: ['ko-button'],
  attributeBindings: ['isDisabled:disabled'],
  iconType: null,
  isDisabled: false
});
