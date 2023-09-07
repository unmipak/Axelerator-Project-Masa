import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './vendor/init-accordion';
import {initTabs} from './vendor/init-tabs';

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// аккордеон

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initAccordions();
  });
});

// табы

//window.addEventListener('DOMContentLoaded', () => {
  //window.addEventListener('load', () => {
  //  initTabs();
 // });
//});

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
