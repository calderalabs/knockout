import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'button',
  classNameBindings: [':ko-button', 'isActive:ko-button--active'],
  attributeBindings: ['isDisabled:disabled'],
  iconType: null,
  isDisabled: false,
  isActive: false
});
