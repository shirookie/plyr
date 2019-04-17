// ==========================================================================
// Plyr Media
// ==========================================================================

import html5 from './html5';
import { createElement, toggleClass, wrap } from './utils/elements';

const media = {
    // Setup media
    setup() {
        // If there's no media, bail
        if (!this.media) {
            this.debug.warn('No media element found!');
            return;
        }

        // Add type class
        toggleClass(this.elements.container, this.config.classNames.type, true);

        // Add provider class
        toggleClass(this.elements.container, this.config.classNames.provider, true);

        html5.extend.call(this);
    },
};

export default media;
