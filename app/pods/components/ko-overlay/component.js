import Ember from 'ember';

const { on, run } = Ember;

export default Ember.Component.extend({
  close: on('click', function() {
    if (this.onClose != null) {
      this.onClose();
    }
  }),
  
  actions: {
    preventBubbling(event) {
      event.stopPropagation();
    }
  }
});
