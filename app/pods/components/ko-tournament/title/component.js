const { Component, inject, computed } = Ember;

export default Component.extend({
  store: inject.service(),
  tagName: '',
  title: null,
  tournament: null,
  isFollowed: computed.readOnly('tournament.isFollowed'),

  actions: {
    toggleFollow(shouldActivate) {
      if (shouldActivate) {
        return this.get('store').createRecord('following', {
          tournament: this.get('tournament')
        }).save();
      }

      return this.get('tournament.followings.firstObject').destroyRecord();
    }
  }
});
