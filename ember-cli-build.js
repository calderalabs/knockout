/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'bower_components/neat/app/assets/stylesheets',
        'bower_components/bourbon/app/assets/stylesheets',
        'bower_components/font-awesome/scss'
      ]
    }
  });

  ['eot', 'svg', 'ttf', 'woff', 'woff2'].forEach(function(ext) {
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.' + ext, {
      destDir: '/fonts'
    });
  });

  app.import('bower_components/font-awesome/fonts/FontAwesome.otf', { destDir: '/fonts' });

  return app.toTree();
};
