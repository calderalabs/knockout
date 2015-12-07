import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  url: 'https://www.youtube.com/embed/lo35NgtgGGE',
  type: 'youtube'
});
