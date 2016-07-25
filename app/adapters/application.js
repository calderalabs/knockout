import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'knockout/config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.APP.apiBaseUrl,
  authorizer: 'simple-auth-authorizer:jwt',

  shouldBackgroundReloadAll() {
    return false;
  },

  shouldReloadAll() {
    return true;
  },

  shouldBackgroundReloadRecord() {
    return false;
  }
});
