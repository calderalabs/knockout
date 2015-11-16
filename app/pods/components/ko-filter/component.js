import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['selected'],
  selected: false,

  click() {
    this.toggleProperty('selected');
  }
});
