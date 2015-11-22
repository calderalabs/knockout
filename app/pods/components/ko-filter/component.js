import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isSelected:selected'],
  isSelected: false,

  click() {
    this.toggleProperty('isSelected');
  }
});
