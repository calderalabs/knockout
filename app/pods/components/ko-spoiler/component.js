import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  store: inject.service(),
  session: inject.service(),
  classNameBindings: [':ko-spoiler', 'isRevealed:ko-spoiler--revealed'],
  title: 'Show Spoiler',
  path: null,

  isRevealed: computed('_spoilers.@each.path', 'path', function() {
    return !!this.get('_spoilers').findBy('path', this.get('path'));
  }),

  _spoilers: computed(function() {
    return this.get('store').peekAll('spoiler');
  }),

  actions: {
    reveal(event) {
      event.stopPropagation();
      event.preventDefault();

      if (!this.get('session.hasCurrentUser')) {
        this.set('isRevealed', true);
        return;
      }

      this.get('store').createRecord('spoiler', {
        path: this.get('path')
      }).save();
    }
  }
});
