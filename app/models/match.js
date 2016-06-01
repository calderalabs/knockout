import DS from 'ember-data';
import MF from 'model-fragments';
import SpoilerableMixin from 'knockout/mixins/spoilerable';

const { Model, belongsTo, attr } = DS;
const { fragment } = MF;

export default Model.extend(SpoilerableMixin, {
  number: attr('number'),
  likeCount: attr('number'),
  vod: fragment('vod'),
  isWatched: false,
  matchGroup: belongsTo('match-group'),
  winner: belongsTo('team')
});
