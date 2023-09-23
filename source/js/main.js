import {iosVhFix} from './utils/ios-vh-fix';
import {modals, initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {accordions, initAccordions} from './vendor/init-accordion';
import {initNewsBtns, setMap} from './vendor';
import {CustomSelect} from './modules/select/custom-select';

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
  modalNameInput.focus();
});
