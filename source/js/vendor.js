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

const sliderPrograms = new Swiper('.programs__slider', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 32,
  navigation: {
    prevEl: '.programs__btn--prev',
    nextEl: '.programs__btn--next',
  },
  pagination: {
    el: '.programs__pagination',
    type: 'progressbar',
  },
});

const sliderNews = new Swiper('.news__slider', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 32,
  navigation: {
    prevEl: '.news__btn--prev',
    nextEl: '.news__btn--next',
  },
  pagination: {
    el: '.news__pagination',
    clickable: true,
    renderBullet(index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
});

const sliderReviews = new Swiper('.reviews__slider', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 32,
  navigation: {
    prevEl: '.reviews__btn--prev',
    nextEl: '.reviews__btn--next',
  },
  pagination: {
    el: '.reviews__pagination',
    type: 'progressbar',
  },
});

export {sliderHero, sliderPrograms, sliderNews, sliderReviews};
