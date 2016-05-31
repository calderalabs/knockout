import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const { Service, computed } = Ember;

export default Service.extend({
  matchId: null,
  playlist: null,
  isPlaying: computed.notEmpty('match'),

  match: computed('matchId', 'playlist.@each.id', function() {
    const playlist = this.get('playlist');

    if (playlist) {
      return playlist.findBy('id', this.get('matchId'));
    }

    return null;
  }).readOnly(),

  nextMatch: computed('match', 'playlist', function() {
    this._peek(this.get('match'), this.get('playlist'), 1);
  }).readOnly(),

  previousMatch: computed('match', 'playlist', function() {
    this._peek(this.get('match'), this.get('playlist'), -1);
  }).readOnly(),

  playNext() {
    this.set('match', this.get('nextMatch'));
  },

  playPrevious() {
    this.set('match', this.get('previousMatch'));
  },

  _peek(match, playlist, offset) {
    const index = playlist.mapBy('id').indexOf(match.get('id'));
    return playlist[index + offset];
  }
});
