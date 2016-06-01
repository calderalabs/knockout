import Ember from 'ember';
import DS from 'ember-data';

const { hasMany } = DS;

export default Ember.Mixin.create({
  spoilers: hasMany('spoiler')
});
