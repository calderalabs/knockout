import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'simple-auth-authorizer:jwt',

  shouldBackgroundReloadAll() {
    return false;
  },

  shouldReloadAll() {
    return true;
  }
});
