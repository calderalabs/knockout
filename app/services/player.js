import Ember from 'ember';

const { Service, computed } = Ember;

export default Service.extend({
  match: null,
  _playlist: null,
  isPlaying: computed.notEmpty('match'),

  nextMatch: computed('match', '_playlist', function() {
    this._peek(this.get('match'), this.get('_playlist'), 1);
  }).readOnly(),

  previousMatch: computed('match', '_playlist', function() {
    this._peek(this.get('match'), this.get('_playlist'), -1);
  }).readOnly(),

  startPlaying(match, { playlist }) {
    this.set('match', match);
    this.set('_playlist', playlist);
  },

  stopPlaying() {
    this.set('match', null);
    this.set('_playlist', null);
  },

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
