import Mirage, { faker } from 'ember-cli-mirage';

const { Factory } = Mirage;
const { list, date } = faker;

export default Factory.extend({
  'best-of': list.cycle(1, 3, 5),
  'start-at': date.recent,
  'stage': list.cycle('Group Stages', 'Qualifiers', 'Main Event', 'Finals'),

  'vods': [{
    label: 'Cerco Risorse di Rete',
    url: 'https://www.youtube.com/watch?v=Tu6gSIbzu6I',
    type: 'youtube'
  }]
});
