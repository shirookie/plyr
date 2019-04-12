import { inBrowser } from './js/utils/browser';
import VueAPlyr from './VueAPlyr.vue';

export let _Vue;

function install (Vue) {
    if (install.installed && _Vue === Vue) return;
    install.installed = true;

    _Vue = Vue;

    Vue.component('v-aplyr', VueAPlyr);
}

if (inBrowser && window.Vue) {
    window.Vue.use(install);
}

export { VueAPlyr };
export default install;
