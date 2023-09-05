// Swiper 7.4.1
import Swiper, {Navigation, Pagination} from './vendor/swiper';
import './vendor/focus-visible-polyfill';

Swiper.use([Navigation, Pagination]);

const sliderHero = new Swiper('.hero', {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '.hero__pagination',
    clickable: true,
  },
});

export {sliderHero};
