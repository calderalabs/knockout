import DS from 'ember-data';
import Ember from 'ember';

const { Model, belongsTo, attr } = DS;
const { inject } = Ember;

export default Model.extend({
  session: inject.service(),
  tournament: belongsTo('tournament'),
  newMatchesCount: attr('number'),
  seenAt: attr('date'),

  watchAllMatches() {
    const newMatchesCount = this.get('newMatchesCount');
    this.set('seenAt', new Date());
    this.set('newMatchesCount', 0);
    this.decrementProperty('session.currentUser.newMatchesCount', newMatchesCount);
    this.save();
  }
});
