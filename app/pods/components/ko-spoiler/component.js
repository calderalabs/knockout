import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNameBindings: [':ko-spoiler', 'isRevealed:ko-spoiler--revealed'],
  title: 'Show Spoiler',
  isRevealed: false,

  actions: {
    reveal(event) {
      event.stopPropagation();
      event.preventDefault();
      this.set('isRevealed', true);
    }
  }
});
