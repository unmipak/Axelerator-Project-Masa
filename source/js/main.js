import {iosVhFix} from './utils/ios-vh-fix';
import {modals, initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {accordions, initAccordions} from './vendor/init-accordion';
import {CustomSelect} from './modules/select/custom-select';
import * as L from './vendor/leaflet/leaflet';
import Swiper, {Navigation, Pagination} from './vendor/swiper';
import './vendor/focus-visible-polyfill';

Swiper.use([Navigation, Pagination]);

const sliderHero = new Swiper('.hero', {
  loop: true,
  slidesPerView: 1,
  preventInteractionOnTransition: true,
  simulateTouch: true,
  hashNavigation: {
    watchState: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.hero__pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      allowTouchMove: true,
    },
    768: {
      allowTouchMove: true,
    },
    1200: {
      allowTouchMove: false,
    },
  },
});

const sliderPrograms = new Swiper('.programs__slider', {
  loop: false,
  navigation: {
    prevEl: '.programs__btn--prev',
    nextEl: '.programs__btn--next',
  },
  pagination: {
    el: '.programs__pagination',
    type: 'progressbar',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2.12,
      spaceBetween: 30,
      centerInsufficientSlides: true,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
});

const sliderNews = new Swiper('.news__slider', {
  loop: false,
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
  breakpoints: {
    320: {
      spaceBetween: 20,
      slidesPerView: 1,
      grid: {
        rows: 2,
        fill: 'dense',
      },
    },
    768: {
      spaceBetween: 30,
      slidesPerView: 2,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 32,
    },
  },
});

const sliderReviews = new Swiper('.reviews__slider', {
  loop: false,
  navigation: {
    prevEl: '.reviews__btn--prev',
    nextEl: '.reviews__btn--next',
  },
  pagination: {
    el: '.reviews__pagination',
    type: 'progressbar',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1.28,
      spaceBetween: 32,
      centerInsufficientSlides: true,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
  },
});

// фильтры в разделе "Новости и материалы"

let newsFilters = document.querySelector('.news__filters');
let newsBtns = newsFilters.querySelectorAll('.news__btn');
let newsSlides = document.querySelectorAll('.news__item');

const onFiltersClick = (evt) => {
  const currentBtn = evt.target.closest('.news__btn');
  if (!currentBtn.classList.contains('news__btn--active')) {
    newsBtns.forEach((btn) => btn.classList.remove('news__btn--active'));
    currentBtn.classList.add('news__btn--active');
  }
  if (currentBtn.dataset.filter === 'all') {
    newsSlides.forEach((slide) => {
      slide.style.opacity = '0';
      slide.style.display = 'grid';
      setTimeout(() => {
        slide.style.opacity = '1';
      }, 300);
      return;
    });
  } else {
    newsSlides.forEach((slide) => {
      slide.style.opacity = '0';
      slide.style.display = 'grid';
      if (slide.dataset.filter !== currentBtn.dataset.filter) {
        slide.style.display = 'none';
      }
      setTimeout(() => {
        slide.style.opacity = '1';
      }, 300);
    });
  }
  sliderNews.update();
};

const initNewsBtns = () => {
  if (newsFilters && newsBtns) {
    newsFilters.addEventListener('click', onFiltersClick);
  }
};

// карта

const COORDINATES = [55.0285253, 82.9269913];
const ZOOM_SIZE = 16;
const ICON_URL = 'img/svg/pin.svg';
const mobileBreakpoint = window.matchMedia('(max-width:768px)');
const tabletBreakpoint = window.matchMedia('(max-width:1200px)');
const getPinSize = () => {
  let pinSize;
  if (mobileBreakpoint.matches) {
    pinSize = [24, 24];
  } else if (tabletBreakpoint.matches) {
    pinSize = [40, 40];
  } else {
    pinSize = [70, 70];
  }
  return pinSize;
};

const setMap = () => {
  const map = L.map('map', {
    center: COORDINATES,
    zoom: ZOOM_SIZE,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const marker = L.marker(COORDINATES).addTo(map);

  const changeMarker = () => {
    marker.setIcon(L.icon({
      iconUrl: ICON_URL,
      iconSize: getPinSize(),
      shadowUrl: 'img/marker-shadow.png',
    }));
  };

  changeMarker();
  window.addEventListener('resize', changeMarker);
};

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

  window.addEventListener('load', () => {
    initModals(); // модальное окно

    const form = new Form();
    window.form = form;
    form.init(); // форма

    initNewsBtns(); // фильтры

    initAccordions(); // аккордеон

    setMap(); // карта

    const select = new CustomSelect();
    select.init(); // кастомный селект
  });
});


// открытие и закрытие меню

let navMenu = document.querySelector('.header__nav');
let navList = document.querySelector('.header__nav-list');
let navBtn = document.querySelector('.header__nav-btn');
let overlay = document.querySelector('.wrapper-overlay');

navMenu.classList.remove('header__nav--nojs');
navMenu.classList.add('header__nav--closed');

navBtn.addEventListener('click', function () {
  if (navMenu.classList.contains('header__nav--closed')) {
    navMenu.classList.remove('header__nav--closed');
    navMenu.classList.add('header__nav--opened');
    overlay.classList.add('wrapper-overlay--menu-opened');
  } else {
    navMenu.classList.add('header__nav--closed');
    navMenu.classList.remove('header__nav--opened');
    overlay.classList.remove('wrapper-overlay--menu-opened');
    accordions.closeAllAccordion(navList);
  }
});


navList.addEventListener('click', (evt) => {
  const link = evt.target.closest('a');
  if (link.classList.contains('header__nav-link') || link.classList.contains('header__nav-sub-link')) {
    navMenu.classList.add('header__nav--closed');
    navMenu.classList.remove('header__nav--opened');
    overlay.classList.remove('wrapper-overlay--menu-opened');
    accordions.closeAllAccordion(navList);
  } else {
    return;
  }
});

overlay.addEventListener('click', function () {
  if (navMenu.classList.contains('header__nav--opened')) {
    navMenu.classList.add('header__nav--closed');
    navMenu.classList.remove('header__nav--opened');
    overlay.classList.remove('wrapper-overlay--menu-opened');
    accordions.closeAllAccordion(navList);
  }
});

let modal = document.querySelector('.modal');

modal.addEventListener('click', (evt) => {
  const target = evt.target;
  if (!target.closest('.modal__wrapper') && !target.closest('.modal__btn-close')) {
    modals.close('Форма обратной связи');
  }
});

let modalBtnOpen = document.querySelector('[data-open-modal]');
let modalNameInput = document.getElementById('name-modal');

modalBtnOpen.addEventListener('click', function () {
  setTimeout(function () {
    modalNameInput.focus();
  }, 100);
});

export {sliderHero, sliderPrograms, sliderNews, sliderReviews};
