/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = process.env.EMBER_ENV;
var config = require('./config/environment')(env);

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      includePolyfill: true,
    },

    sassOptions: {
      includePaths: [
        'bower_components/bourbon/app/assets/stylesheets',
        'bower_components/neat/app/assets/stylesheets',
        'bower_components/font-awesome/scss'
      ]
    },

    inlineContent: {
      'mixpanel' : {
        file: './mixpanel.js',
        postProcess: function(content) {
          return content.replace(/\{\{MIXPANEL_TOKEN\}\}/g, config.mixpanelToken);
        }
      },

      'intercom' : {
        file: './intercom.js',
        postProcess: function(content) {
          return content.replace(/\{\{INTERCOM_APP_ID\}\}/g, config.intercomAppId);
        }
      }
    }
  });

  ['eot', 'svg', 'ttf', 'woff', 'woff2'].forEach(function(ext) {
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.' + ext, {
      destDir: '/assets/fonts'
    });
  });

  app.import('bower_components/css-social-buttons/css/zocial.css');
  app.import('bower_components/css-social-buttons/css/zocial.otf', { destDir: '/assets/fonts' });
  app.import('bower_components/font-awesome/fonts/FontAwesome.otf', { destDir: '/assets/fonts' });

  return app.toTree();
};
