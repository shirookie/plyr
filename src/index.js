import VClickOutside from 'v-click-outside';

import { inBrowser } from './util/browser';
import VueAPlyr from './VueAPlyr.vue';
// controls
import VueAPlyrButton from './_controls/button.vue';
import VueAPlyrProgress from './_controls/progress.vue';
import VueAPlyrRange from './_controls/range.vue';
import VueAPlyrTooltip from './_controls/tooltip.vue';
import VueAPlyrVolume from './_controls/volume.vue';
import VueAPlyrTime from './_controls/time.vue';
import VueAPlyrMenu from './_controls/menu.vue';

export let _Vue;

const controls = {
    'button': VueAPlyrButton,
    'progress': VueAPlyrProgress,
    'range': VueAPlyrRange,
    'tooltip': VueAPlyrTooltip,
    'volume': VueAPlyrVolume,
    'time': VueAPlyrTime,
    'menu': VueAPlyrMenu,
};

function install (Vue, options) {
    if (install.installed && _Vue === Vue) return;
    install.installed = true;

    _Vue = Vue;

    // directive deps
    Vue.use(VClickOutside);
    // main
    Vue.component('v-aplyr', VueAPlyr);
    // controls
    options.controls.forEach(ctrl => {
        Vue.component('v-aplyr-' + ctrl, controls[ctrl]);
    });
}

if (inBrowser && window.Vue) {
    window.Vue.use(install);
}

export {
    VueAPlyr,
    // controls
    VueAPlyrButton,
    VueAPlyrProgress,
    VueAPlyrRange,
    VueAPlyrTooltip,
    VueAPlyrVolume,
    VueAPlyrTime,
    VueAPlyrMenu,
};
export default install;
