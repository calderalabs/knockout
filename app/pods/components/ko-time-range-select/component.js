import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;
const { min, max } = Math;

export default Ember.Component.extend({
  startDate: moment().startOf('day').toDate(),
  endDate: moment().endOf('day').toDate(),  
  selectionStart: computed.reads('startDate'),
  selectionEnd: computed.reads('endDate'),
  
  actions: {
    changeStart(value) {
      const normalizedValue = min(this._normalize(value), this.get('selectionEnd'));
      this.set('selectionStart', moment(normalizedValue).toDate());
    },
    
    changeEnd(value) {
      const normalizedValue = max(this._normalize(value), this.get('selectionStart'));
      this.set('selectionEnd', moment(normalizedValue).toDate());
    }
  },
  
  _normalize(value) {
    return moment(min(max(this.get('startDate'), value), this.get('endDate'))).toDate();
  }
});
