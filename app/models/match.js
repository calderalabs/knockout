import DS from 'ember-data';
import MF from 'model-fragments';

const { Model, belongsTo, attr } = DS;
const { fragment } = MF;

export default Model.extend({
  number: attr('number'),
  likeCount: attr('number'),
  vod: fragment('vod'),
  isWatched: false,
  matchGroup: belongsTo('match-group'),
  winner: belongsTo('team')
});
