import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Component, computed, on } = Ember;

export default Component.extend({
  classNames: ['ko-toggle'],
  isActive: false,
  onToggle: null,
  type: null,
  iconType: null,
  isButton: computed.equal('type', 'button'),
  isRunning: computed.readOnly('_toggleTask.isRunning'),

  runningClass: computed('_toggleTask.isRunning', function() {
    if (this.get('_toggleTask.isRunning')) {
      return 'running';
    }
  }),

  activeClass: computed('isActive', function() {
    if (this.get('isActive')) {
      return 'active';
    }
  }),

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
