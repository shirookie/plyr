// ==========================================================================
// Plyr support checks
// ==========================================================================

import { transitionEndEvent } from './utils/animation';
import browser from './utils/browser';
import { createElement } from './utils/elements';
import is from './utils/is';

// Default codecs for checking mimetype support
// TODO: what does this do?
// 支持的格式 mp3 m4a ogg 苹果开头的a
const defaultCodecs = {
    'audio/ogg': 'vorbis',
    'audio/wav': '1',
};

// Check for feature support
const support = {
    // Basic support
    audio: 'canPlayType' in document.createElement('audio'),

    // Check for support
    // Basic functionality vs full UI
    check(type = 'audio') {
        const api = support[type];
        const ui = api && support.rangeInput;

        return {
            api,
            ui,
        };
    },

    // Airplay support
    // Safari only currently
    airplay: is.function(window.WebKitPlaybackTargetAvailabilityEvent),

    // Check for mime type support against a player instance
    // Credits: http://diveintohtml5.info/everything.html
    // Related: http://www.leanbackplayer.com/test/h5mt.html
    mime(input) {
        if (is.empty(input)) {
            return false;
        }

        const [mediaType] = input.split('/');
        let type = input;

        // Verify we're using HTML5 and there's no media type mismatch
        if (mediaType !== 'audio') {
            return false;
        }

        // Add codec if required
        if (Object.keys(defaultCodecs).includes(type)) {
            type += `; codecs="${defaultCodecs[input]}"`;
        }

        try {
            return Boolean(type && this.media.canPlayType(type).replace(/no/, ''));
        } catch (e) {
            return false;
        }
    },

    // <input type="range"> Sliders
    rangeInput: (() => {
        const range = document.createElement('input');
        range.type = 'range';
        return range.type === 'range';
    })(),

    // Touch
    // NOTE: Remember a device can be mouse + touch enabled so we check on first touch event
    touch: 'ontouchstart' in document.documentElement,

    // Detect transitions support
    transitions: transitionEndEvent !== false,

    // Reduced motion iOS & MacOS setting
    // https://webkit.org/blog/7551/responsive-design-for-motion/
    reducedMotion: 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches,
};

export default support;
