import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNameBindings: 'selectedClasses',
  selected: false,

  click() {
    this.toggleProperty('selected');
  },

  selectedClasses: Ember.computed('selected', function() {
    if (this.get('selected')) {
      return 'selected animated pulse'
    }
  })
});
