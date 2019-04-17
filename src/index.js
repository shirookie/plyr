import { inBrowser } from './util/browser';
import VueAPlyr from './VueAPlyr.vue';
// controls
import VueAPlyrButton from './_controls/button.vue';
import VueAPlyrProgress from './_controls/progress.vue';
import VueAPlyrRange from './_controls/range.vue';
import VueAPlyrTooltip from './_controls/tooltip.vue';
import VueAPlyrVolume from './_controls/volume.vue';
import VuePlyrTime from './_controls/time.vue';

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

export {
    VueAPlyr,
    // controls
    VueAPlyrButton,
    VueAPlyrProgress,
    VueAPlyrRange,
    VueAPlyrTooltip,
    VueAPlyrVolume,
    VuePlyrTime,
};
export default install;
