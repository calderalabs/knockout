import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNameBindings: 'selected',
  selected: false,

  click() {
    this.toggleProperty('selected');
  }
});
