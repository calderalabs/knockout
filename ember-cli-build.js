/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

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

    favicons: {
      config: {
        path: '/assets/favicons'
      }
    }
  });

  ['eot', 'svg', 'ttf', 'woff', 'woff2'].forEach(function(ext) {
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.' + ext, {
      destDir: '/assets/fonts'
    });
  });

  app.import('bower_components/font-awesome/fonts/FontAwesome.otf', { destDir: '/assets/fonts' });
  app.import('bower_components/css-social-buttons/css/zocial.otf', { destDir: '/assets/fonts' });
  app.import('bower_components/css-social-buttons/css/zocial.css');

  return app.toTree();
};
