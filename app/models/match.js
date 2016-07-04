import DS from 'ember-data';
import MF from 'model-fragments';
import Ember from 'ember';
import SpoilerableMixin from 'knockout/mixins/spoilerable';

const { computed } = Ember;
const { Model, belongsTo, hasMany, attr } = DS;
const { fragment } = MF;

export default Model.extend(SpoilerableMixin, {
  number: attr('number'),
  likeCount: attr('number'),
  vod: fragment('vod'),
  matchGroup: belongsTo('match-group'),
  winner: belongsTo('team'),
  watchings: hasMany('watching'),
  likes: hasMany('like'),
  isWatched: computed.notEmpty('watchings.firstObject'),
  isLiked: computed.notEmpty('likes.firstObject'),

  isNew: computed(
    'matchGroup.tournament.followings.firstObject.seenAt',
    'matchGroup.startedAt',
    'watchings.firstObject', function() {
    const tournamentSeenAt = this.get('matchGroup.tournament.followings.firstObject.seenAt');

    if (tournamentSeenAt) {
      return tournamentSeenAt < this.get('matchGroup.startedAt') && !this.get('watchings.firstObject');
    }

    return false;
  })
});
