const { Component, inject, computed } = Ember;

export default Component.extend({
  tagName: '',
  title: null,
  tournament: null,
  isFollowed: computed.readOnly('tournament.isFollowed'),

  actions: {
    toggleFollow(shouldActivate) {
      const tournament = this.get('tournament');

      if (shouldActivate) {
        return tournament.follow();
      }

      return tournament.unfollow();
    }
  }
});
