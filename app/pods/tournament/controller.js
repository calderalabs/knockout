import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: {
    filter: 'filter',
    sortBy: 'sort-by'
  },

  filter: null,
  sortBy: 'recent'
});
