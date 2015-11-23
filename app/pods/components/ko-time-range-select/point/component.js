import Ember from 'ember';

const { computed, on, Handlebars, $ } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNameBindings: ['isDragging:ko-time-range-select-point_dragging'],
  model: null,
  select: null,
  startDate: computed.reads('select.startDate'),
  endDate: computed.reads('select.endDate'),
  isDragging: false,
  
  dateRange: computed('startDate', 'endDate', function() {
    return moment(this.get('endDate')).diff(this.get('startDate'));
  }),
  
  style: computed('model', 'startDate', 'dateRange', function() {
    const diff = moment(this.get('model')).diff(this.get('startDate'));
    return new Handlebars.SafeString(`left: ${diff / this.get('dateRange') * 100}%`);
  }),
  
  startDrag: on('mouseDown', function(event) {
    const startX = event.pageX;
    const startModel = this.get('model');
    
    const mouseMoveHandler = (event) => {
      const diff = event.pageX - startX;
      const lineWidth = this.get('select').$('.ko-time-range-select__line').width();
      const newMoment = moment(startModel).add(diff / lineWidth * this.get('dateRange'));
      
      if (this.onChange != null) {
        this.onChange(newMoment.toDate());
      }
    };
    
    const mouseUpHandler = () => {
      this.set('isDragging', false);
      $('body').removeClass('dragging');
      $(document).off('mousemove', mouseMoveHandler);
      $(document).off('mouseup', mouseUpHandler);
    };
    
    this.set('isDragging', true);
    $('body').addClass('dragging');
    $(document).on('mousemove', mouseMoveHandler);
    $(document).on('mouseup', mouseUpHandler);
  })
});
