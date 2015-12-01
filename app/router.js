import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('tournament', { path: 'tournaments/:id' }, function() {
    this.route('watch');
  });

  this.route('tournaments');
});

export default Router;
