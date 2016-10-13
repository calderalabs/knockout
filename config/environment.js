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
      apiBaseUrl: 'http://localhost:4200'
    },

    'ember-cli-mirage': {
      enabled: true
    },

    'ember-simple-auth': {
      authenticationRoute: 'index'
    },

    'auth0-ember-simple-auth': {
      clientID: 'he3Ottq1UOvvw2NkkSNTtJTRwzmA3Fxx',
      domain: 'calderalabs.eu.auth0.com'
    },

    intercomAppId: 'vhuzi198',
    mixpanelToken: 'c6216cdee7e0449d26b1d2d3acd1a420'
  };

  if (environment === 'test') {
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.apiBaseUrl = 'https://knockout-api.herokuapp.com';
    ENV['auth0-ember-simple-auth'].clientID = 'CWs4Z5GyCoTUKtdaVqvYju1Q0S2pHq7B';
    ENV['mixpanelToken'] = '04aacf93214fd55166bd7041a78863b9';
    ENV['intercomAppId'] = 'nkoaoqik';
  }

  return ENV;
};
