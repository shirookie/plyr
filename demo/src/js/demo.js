// ==========================================================================
// Plyr.io demo
// This code is purely for the https://plyr.io website
// Please see readme.md in the root or github.com/sampotts/plyr
// ==========================================================================

// import Raven from 'raven-js';
// import Plyr from '../../../src/js/plyr';

import Vue from 'vue';
import VueAPlyr from '../../../dist/vue-aplyr';
import {
    VueAPlyrButton,
    VueAPlyrProgress,
    VueAPlyrTime,
    VueAPlyrMenu,
} from '../../../dist/vue-aplyr';

Vue.use(VueAPlyr);

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        window.vm = new Vue({
            el: '#app',
            data: {
                title: 'VueAPlyr',
                sources: [
                    {
                        src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
                        type: 'audio/mp3',
                    },
                    {
                        src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg',
                        type: 'audio/ogg',
                    },
                ],
                speeds: [0.5, 1.0, 2.0],
            },
            mounted () {
                // github count
                if (window.Shr) {
                    window.Shr.setup('.js-shr-button', {
                        count: {
                            classname: 'button__count',
                        },
                    });
                }
            },
            methods: {
                eventHandler(type, e) {
                    console.log('on ' + type + '...', e);
                },
                speedup(val) {
                    console.log('speedup to ' + val);
                    this.$refs.player.speed = val;
                },
            },
            components: {
                'v-aplyr-button': VueAPlyrButton,
                'v-aplyr-progress': VueAPlyrProgress,
                'v-aplyr-time': VueAPlyrTime,
                'v-aplyr-menu': VueAPlyrMenu,
            },
        });
        return;
        Raven.context(() => {
            const player = new Plyr(selector, {
                debug: true,
                title: 'View From A Blue Moon',
                iconUrl: 'dist/demo.svg',
                keyboard: {
                    global: true,
                },
                tooltips: {
                    controls: true,
                },
            });

            // Expose for tinkering in the console
            window.player = player;

            // Setup type toggle
            const buttons = document.querySelectorAll('[data-source]');
            const types = {
                audio: 'audio',
            };
            let currentType = window.location.hash.replace('#', '');
            const historySupport = window.history && window.history.pushState;

            // Toggle class on an element
            function toggleClass(element, className, state) {
                if (element) {
                    element.classList[state ? 'add' : 'remove'](className);
                }
            }

            // Set a new source
            function newSource(type, init) {
                // Bail if new type isn't known, it's the current type, or current type is empty (video is default) and new type is video
                if (
                    !(type in types) ||
                    (!init && type === currentType) ||
                    (!currentType.length && type === types.video)
                ) {
                    return;
                }

                switch (type) {
                    case types.audio:
                        player.source = {
                            type: 'audio',
                            title: 'Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;',
                            sources: [
                                {
                                    src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
                                    type: 'audio/mp3',
                                },
                                {
                                    src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg',
                                    type: 'audio/ogg',
                                },
                            ],
                        };

                        break;
                    default:
                        break;
                }
            }

        });
    });
})();
