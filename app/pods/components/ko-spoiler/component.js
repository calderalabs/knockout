import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  store: inject.service(),
  session: inject.service(),
  classNameBindings: [':ko-spoiler', 'isRevealed:ko-spoiler--revealed'],
  title: 'Show Spoiler',
  name: null,
  spoilerable: null,

  isRevealed: computed('spoilerable.spoilers.@each.name', 'name', function() {
    const spoilers = this.get('spoilerable.spoilers');

    if (spoilers) {
      return !!spoilers.findBy('name', this.get('name'));
    }

    return false;
  }),

  actions: {
    reveal(event) {
      event.stopPropagation();
      event.preventDefault();

      const spoiler = this.get('store').createRecord('spoiler', {
        name: this.get('name'),
        spoilerable: this.get('spoilerable')
      });

      if (this.get('session.hasCurrentUser')) {
        spoiler.save();
      }
    }
  }
});
