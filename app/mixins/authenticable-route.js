import Ember from 'ember';

const { inject, Mixin } = Ember;

export default Mixin.create({
  session: inject.service(),

  beforeModel() {
    return this.get('session').fetchCurrentUser();
  }
});
