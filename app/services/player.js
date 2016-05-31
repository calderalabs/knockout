import Ember from 'ember';

const { Service, computed } = Ember;

export default Service.extend({
  playlist: null,
  match: null,
  isPlaying: computed.notEmpty('match'),

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
