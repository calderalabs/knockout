import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Component, computed, on } = Ember;

export default Component.extend({
  tagName: 'button',
  classNameBindings: ['ko-toggle', '_isRunning:ko-toggle--running', 'isActive:ko-toggle--active'],
  isActive: false,
  onToggle: null,
  _isRunning: computed.readOnly('_toggleTask.isRunning'),

  _toggleTask: task(function *(event) {
    if (this.get('isActive')) {
      yield this.onToggle(false, event);
    } else {
      yield this.onToggle(true, event);
    }
  }).drop(),

  _toggle: on('click', function(event) {
    this.get('_toggleTask').perform(event);
  })
});
