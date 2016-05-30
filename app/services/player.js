import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const { Service, computed, inject } = Ember;

export default Service.extend({
  store: inject.service(),
  match: null,
  playlist: null,
  _storage: storageFor('application'),
  isPlaying: computed.notEmpty('match'),
  _wasPlaying: computed.notEmpty('_storage.matchId'),

  nextMatch: computed('match', 'playlist', function() {
    this._peek(this.get('match'), this.get('playlist'), 1);
  }).readOnly(),

  previousMatch: computed('match', 'playlist', function() {
    this._peek(this.get('match'), this.get('playlist'), -1);
  }).readOnly(),

  startPlaying(match, { playlist = [] }) {
    this.set('match', match);
    this.set('playlist', playlist);
    this.set('_storage.matchId', match.get('id'));
    this.set('_storage.playlistIds', playlist.mapBy('id'));
  },

  stopPlaying() {
    this.set('match', null);
    this.set('playlist', null);
    this.set('_storage.matchId', null);
    this.set('_storage.playlistIds', null);
  },

  playNext() {
    this.set('match', this.get('nextMatch'));
  },

  playPrevious() {
    this.set('match', this.get('previousMatch'));
  },

  restore() {
    if (!this.get('_wasPlaying')) {
      return;
    }

    const store = this.get('store');
    const storage = this.get('_storage');
    const match = store.peekRecord('match', storage.get('matchId'));

    if (!match) {
      return;
    }

    this.startPlaying(match, {
      playlist: storage.get('playlistIds').map(function(id) {
        return store.peekRecord('match', id);
      })
    });
  },

  _peek(match, playlist, offset) {
    const index = playlist.mapBy('id').indexOf(match.get('id'));
    return playlist[index + offset];
  }
});
