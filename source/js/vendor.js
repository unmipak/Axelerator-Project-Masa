// Swiper 7.4.1
import Swiper, {Navigation, Pagination} from './vendor/swiper';
import './vendor/focus-visible-polyfill';
import * as L from './vendor/leaflet/leaflet';

Swiper.use([Navigation, Pagination]);

const sliderHero = new Swiper('.hero', {
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: '.hero__pagination',
    clickable: true,
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
      spaceBetween: 32,
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
      slidesPerView: 1.3,
      spaceBetween: 32,
      centerInsufficientSlides: true,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
});

// фильтры в разделе "Новости и материалы"

let newsFilters = document.querySelector('.news__filters');
let newsBtns = newsFilters.querySelectorAll('.news__btn');
let newsSlides = document.querySelectorAll('.news__item');

const onBtnContainerClick = (evt) => {
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
    newsFilters.addEventListener('click', onBtnContainerClick);
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
    }));
  };

  changeMarker();
  window.addEventListener('resize', changeMarker);
};

export {sliderHero, sliderPrograms, sliderNews, sliderReviews, initNewsBtns, setMap};
