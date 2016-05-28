import DS from 'ember-data';
import moment from 'moment';
import Ember from 'ember';
import MF from 'model-fragments';

const { Model, belongsTo, attr } = DS;
const { fragment } = MF;
const { computed } = Ember;

export default Model.extend({
  number: attr('number'),
  likeCount: attr('number'),
  vod: fragment('vod'),
  isWatched: false,
  matchGroup: belongsTo('match-group'),
  winner: belongsTo('team')
});
