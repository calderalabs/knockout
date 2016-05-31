export default function() {
  this.transition(
    this.inHelper('liquid-modal'),
    
    this.use('explode', {
      pick: '.lf-overlay',
      use: 'cross-fade'
    }, {
      pick: '.lm-container',
      use: 'cross-fade'
    })
  );
}
