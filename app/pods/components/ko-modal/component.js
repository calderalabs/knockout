import Ember from 'ember';
import VelocityMixin from 'ember-velocity-mixin/main';

const { Component, on } = Ember;

export default Component.extend(VelocityMixin, {
  classNames: ['ko-modal'],
  onClose: null,

  _fadeIn: on('didInsertElement', function() {
    this._fade(1);
  }),

  _fade(opacity) {
    return this.animate({ opacity: opacity }, 100);
  },

  actions: {
    close() {
      this._fade(0).then(() => {
        if (this.onClose) {
          this.onClose();
        }
      });
    }
  }
});
