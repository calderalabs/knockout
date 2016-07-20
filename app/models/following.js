import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  tournament: belongsTo('tournament'),
  newMatchesCount: attr('number'),
  seenAt: attr('date'),

  watchAllMatches() {
    this.set('seenAt', new Date());
    this.set('newMatchesCount', 0);
    this.save();
  }
});
