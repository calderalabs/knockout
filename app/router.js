import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.modal('ko-player', { withParams: 'match' });
  this.route('tournament', { path: 'tournaments/:id' });
  this.route('tournaments');
  this.route('following');
});

export default Router;
