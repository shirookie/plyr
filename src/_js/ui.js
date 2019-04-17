// ==========================================================================
// Plyr UI
// ==========================================================================

import controls from './controls';
import support from './support';
import browser from './utils/browser';
import { getElement, toggleClass } from './utils/elements';
import { ready, triggerEvent } from './utils/events';
import i18n from './utils/i18n';
import is from './utils/is';
import loadImage from './utils/loadImage';

const ui = {
    addStyleHook() {
        toggleClass(this.elements.container, this.config.selectors.container.replace('.', ''), true);
        toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
    },

    // Toggle native HTML5 media controls
    toggleNativeControls(toggle = false) {
        if (toggle) {
            this.media.setAttribute('controls', '');
        } else {
            this.media.removeAttribute('controls');
        }
    },

    // Setup the UI
    build() {
        // Re-attach media element listeners
        // TODO: Use event bubbling?
        // TODO: 绑定了 audio 原生事件
        this.listeners.media();

        // Don't setup interface if no support
        if (!this.supported.ui) {
            this.debug.warn(`Basic support only for html5 audio`);

            // Restore native controls
            ui.toggleNativeControls.call(this, true);

            // Bail
            return;
        }

        // // Inject custom controls if not present
        // if (!is.element(this.elements.controls)) {
        //     // Inject custom controls
        //     controls.inject.call(this);
        //
        //     // Re-attach control listeners
        //     this.listeners.controls();
        // }

        // Remove native controls
        ui.toggleNativeControls.call(this);

        // Reset volume
        this.volume = null;

        // Reset mute state
        this.muted = null;

        // Reset speed
        this.speed = null;

        // Reset loop state
        this.loop = null;

        // Reset quality setting
        this.quality = null;

        // Reset volume display
        controls.updateVolume.call(this);

        // Reset time display
        controls.timeUpdate.call(this);

        // Update the UI
        ui.checkPlaying.call(this);

        // Check for airplay support
        // toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5);

        // Add iOS class
        // toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos);

        // Add touch class
        // toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch);

        // Ready for API calls
        this.ready = true;

        // Ready event at end of execution stack
        setTimeout(() => {
            triggerEvent.call(this, this.media, 'ready');
        }, 0);

        // Set the title
        // TODO: temp
        // ui.setTitle.call(this);

        // Manually set the duration if user has overridden it.
        // The event listeners for it doesn't get called if preload is disabled (#701)
        if (this.config.duration) {
            controls.durationUpdate.call(this);
        }
    },

    // Setup aria attribute for play and iframe title
    setTitle() {
        // Find the current text
        let label = i18n.get('play', this.config);

        // If there's a media title set, use that for the label
        if (is.string(this.config.title) && !is.empty(this.config.title)) {
            label += `, ${this.config.title}`;
        }

        // If there's a play button, set label
        Array.from(this.elements.buttons.play || []).forEach(button => {
            button.setAttribute('aria-label', label);
        });
    },

    // Check playing state
    checkPlaying(event) {
        // Class hooks
        toggleClass(this.elements.container, this.config.classNames.playing, this.playing);
        toggleClass(this.elements.container, this.config.classNames.paused, this.paused);
        toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped);

        // Set state
        Array.from(this.elements.buttons.play || []).forEach(target => {
            target.pressed = this.playing;
        });

        // Only update controls on non timeupdate events
        if (is.event(event) && event.type === 'timeupdate') {
            return;
        }
    },

    // Check if media is loading
    checkLoading(event) {
        this.loading = ['stalled', 'waiting'].includes(event.type);

        // Clear timer
        clearTimeout(this.timers.loading);

        // Timer to prevent flicker when seeking
        this.timers.loading = setTimeout(() => {
            // Update progress bar loading class state
            toggleClass(this.elements.container, this.config.classNames.loading, this.loading);
        }, this.loading ? 250 : 0);
    },
};

export default ui;
