// Swiper 7.4.1
import Swiper, {Navigation, Pagination} from './vendor/swiper';
import './vendor/focus-visible-polyfill';

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
  if (!currentBtn.classList.contains('news__button--active')) {
    newsBtns.forEach((btn) => btn.classList.remove('news__button--active'));
    currentBtn.classList.add('news__button--active');
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

export {sliderHero, sliderPrograms, sliderNews, sliderReviews, initNewsBtns};
