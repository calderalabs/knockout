import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNameBindings: [':ko-badge', 'isPrimary:ko-badge--primary'],
  isPrimary: false
});
