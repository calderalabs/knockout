import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['matches', 'teamOne', 'teamTwo']
});
