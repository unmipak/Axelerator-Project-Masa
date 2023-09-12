import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './vendor/init-accordion';
import {initNewsBtns} from './vendor';

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
  initNewsBtns();
});

// аккордеон

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initAccordions();
  });
});

// валидация формы

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// открытие и закрытие меню

let navMenu = document.querySelector('.header__nav');
let navList = document.querySelector('.header__nav-list');
let navLinks = navList.getElementsByTagName('a');
let header = document.querySelector('.header');
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
  }
});


navList.addEventListener('click', function () {
  if (navMenu.classList.contains('header__nav--opened')) {
    navMenu.classList.remove('header__nav--opened');
    navMenu.classList.add('header__nav--closed');
    overlay.classList.remove('wrapper-overlay--menu-opened');
  }
});


//navLinks.forEach((link) => {
//  link.addEventListener('click', function () {
//    if (navMenu.classList.contains('header__nav--opened')) {
//      navMenu.classList.remove('header__nav--opened');
//      navMenu.classList.add('header__nav--closed');
//      overlay.classList.remove('wrapper-overlay--menu-opened');
//    }
//  });
//});

overlay.addEventListener('click', function () {
  if (navMenu.classList.contains('header__nav--opened')) {
    navMenu.classList.add('header__nav--closed');
    navMenu.classList.remove('header__nav--opened');
    overlay.classList.remove('wrapper-overlay--menu-opened');
  }
});

