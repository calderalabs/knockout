/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'knockout',
    podModulePrefix: 'knockout/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'auth0-ember-simple-auth': {
      clientID: 'he3Ottq1UOvvw2NkkSNTtJTRwzmA3Fxx',
      domain: 'calderalabs.eu.auth0.com'
    }
  };

  if (environment === 'test') {
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {}

  return ENV;
};
