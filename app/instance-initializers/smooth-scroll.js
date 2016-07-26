import smoothScroll from 'npm:smooth-scroll';

export function initialize() {
  smoothScroll.init({
    speed: 1000,
    updateURL: false
  });
}

export default {
  name: 'smooth-scroll',
  initialize
};
