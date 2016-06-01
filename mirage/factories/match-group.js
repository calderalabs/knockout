import { Factory, faker } from 'ember-cli-mirage';

const { list, date } = faker;

export default Factory.extend({
  bestOf: list.cycle(1, 3, 5),
  startAt: date.recent,
  stage: list.cycle('Group Stages', 'Qualifiers', 'Main Event', 'Finals'),
});
