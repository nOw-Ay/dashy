/* eslint-disable no-multi-spaces */
// Import core framework and essential utils
import Vue from 'vue';
import VueI18n from 'vue-i18n'; // i18n for localization

// Import component Vue plugins, used throughout the app
import VTooltip from 'v-tooltip';       // A Vue directive for Popper.js, tooltip component
import VModal from 'vue-js-modal';      // Modal component
import VSelect from 'vue-select';       // Select dropdown component
import VTabs from 'vue-material-tabs';  // Tab view component, used on the config page
import Toasted from 'vue-toasted';      // Toast component, used to show confirmation notifications

// Import base Dashy components and utils
import Dashy from '@/App.vue';          // Main Dashy Vue app
import router from '@/router';          // Router, for navigation
import serviceWorker from '@/utils/InitServiceWorker'; // Service worker initialization
import clickOutside from '@/utils/ClickOutside';      // Directive for closing popups, modals, etc
import { messages } from '@/utils/languages';         // Language texts
import ErrorReporting from '@/utils/ErrorReporting';  // Error reporting initializer (off)
import { toastedOptions, language as defaultLanguage } from '@/utils/defaults'; // Defaults

// Initialize global Vue components
Vue.use(VueI18n);
Vue.use(VTooltip);
Vue.use(VModal);
Vue.use(VTabs);
Vue.use(Toasted, toastedOptions);
Vue.component('v-select', VSelect);
Vue.directive('clickOutside', clickOutside);

Vue.config.productionTip = false; // Disable annoying console message

// Setup i18n translations
const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage,
  messages,
});

// Checks if service worker not disable, and if so will registers it
serviceWorker();

// Checks if user enabled error reporting, and if so will initialize it
ErrorReporting(Vue, router);

// Render function
const render = (awesome) => awesome(Dashy);

// All done, now just initialize main Vue app!
new Vue({ router, render, i18n }).$mount('#app');
