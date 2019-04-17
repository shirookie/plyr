// ==========================================================================
// Plyr
// plyr.js v3.5.2
// https://github.com/sampotts/plyr
// License: The MIT License (MIT)
// ==========================================================================

import defaults from './config';
import Console from './console';
import controls from './controls';
import Listeners from './listeners';
import media from './media';
import source from './source';
import Storage from './storage';
import support from './support';
import ui from './ui';
import { closest } from './utils/arrays';
import { createElement, hasClass, removeElement, replaceElement, toggleClass, wrap } from './utils/elements';
import { off, on, once, triggerEvent, unbindListeners } from './utils/events';
import is from './utils/is';
import loadSprite from './utils/loadSprite';
import { cloneDeep, extend } from './utils/objects';
import { parseUrl } from './utils/urls';

// Private properties
// TODO: Use a WeakMap for private globals
// const globals = new WeakMap();

// Plyr instance
class APlyr {
    constructor(target, options) {
        this.timers = {};

        // State
        this.ready = false;
        this.loading = false;
        this.failed = false;

        // Touch device
        this.touch = support.touch;

        // Set the media element
        this.media = target;

        // String selector passed
        if (is.string(this.media)) {
            this.media = document.querySelectorAll(this.media);
        }

        // jQuery, NodeList or Array passed, use first element
        if ((window.jQuery && this.media instanceof jQuery) || is.nodeList(this.media) || is.array(this.media)) {
            // eslint-disable-next-line
            this.media = this.media[0];
        }

        // Set config
        this.config = extend(
            {},
            defaults,
            APlyr.defaults,
            options || {},
            (() => {
                try {
                    return JSON.parse(this.media.getAttribute('data-plyr-config'));
                } catch (e) {
                    return {};
                }
            })(),
        );

        // Elements cache
        this.elements = {
            container: null,
            buttons: {},
            display: {},
            progress: {},
            inputs: {},
            settings: {
                popup: null,
                menu: null,
                panels: {},
                buttons: {},
            },
        };

        // Options
        this.options = {
            speed: [],
        };

        // Debugging
        // TODO: move to globals
        this.debug = new Console(this.config.debug);

        // Log config options and support
        this.debug.log('Config', this.config);
        this.debug.log('Support', support);

        // We need an element to setup
        if (is.nullOrUndefined(this.media) || !is.element(this.media)) {
            this.debug.error('Setup failed: no suitable element passed');
            return;
        }

        // Bail if the element is initialized
        if (this.media.aplyr) {
            this.debug.warn('Target already setup');
            return;
        }

        // Bail if not enabled
        if (!this.config.enabled) {
            this.debug.error('Setup failed: disabled by config');
            return;
        }

        // Cache original element state for .destroy()
        const clone = this.media.cloneNode(true);
        clone.autoplay = false;
        this.elements.original = clone;

        this.supported = support.check();
        // If no support for even API, bail
        if (!this.supported.api) {
            this.debug.error('Setup failed: no support');
            return;
        }

        this.eventListeners = [];

        // Create listeners
        this.listeners = new Listeners(this);

        // Setup local storage for user settings
        // TODO: re
        this.storage = new Storage(this);

        // Store reference
        this.media.aplyr = this;

        // Wrap media
        // if (!is.element(this.elements.container)) {
        //     this.elements.container = createElement('div', { tabindex: 0 });
        //     wrap(this.media, this.elements.container);
        // }

        // Add style hook
        // ui.addStyleHook.call(this);

        // Setup media
        // media.setup.call(this);

        // Listen for events if debugging
        if (this.config.debug) {
            on.call(this, this.elements.container, this.config.events.join(' '), event => {
                this.debug.log(`event: ${event.type}`);
            });
        }

        // Setup interface
        ui.build.call(this);

        // Container listeners
        this.listeners.container();

        // Global listeners
        this.listeners.global();

        // Autoplay if required
        if (this.config.autoplay) {
            this.play();
        }

        // Seek time will be recorded (in listeners.js) so we can prevent hiding controls for a few seconds after seek
        this.lastSeekTime = 0;
    }

    // ---------------------------------------
    // API
    // ---------------------------------------

    /**
     * Play the media, or play the advertisement (if they are not blocked)
     */
    play() {
        if (!is.function(this.media.play)) {
            return null;
        }

        return this.media.play();
    }

    /**
     * Pause the media
     */
    pause() {
        if (!this.playing || !is.function(this.media.pause)) {
            return;
        }

        this.media.pause();
    }

    /**
     * Get playing state
     */
    get playing() {
        return Boolean(this.ready && !this.paused && !this.ended);
    }

    /**
     * Get paused state
     */
    get paused() {
        return Boolean(this.media.paused);
    }

    /**
     * Get stopped state
     */
    get stopped() {
        return Boolean(this.paused && this.currentTime === 0);
    }

    /**
     * Get ended state
     */
    get ended() {
        return Boolean(this.media.ended);
    }

    /**
     * Toggle playback based on current status
     * @param {Boolean} input
     */
    togglePlay(input) {
        // Toggle based on current state if nothing passed
        const toggle = is.boolean(input) ? input : !this.playing;

        if (toggle) {
            this.play();
        } else {
            this.pause();
        }
    }

    /**
     * Stop playback
     */
    stop() {
        this.pause();
        this.restart();
    }

    /**
     * Restart playback
     */
    restart() {
        this.currentTime = 0;
    }

    /**
     * Rewind
     * @param {Number} seekTime - how far to rewind in seconds. Defaults to the config.seekTime
     */
    rewind(seekTime) {
        this.currentTime = this.currentTime - (is.number(seekTime) ? seekTime : this.config.seekTime);
    }

    /**
     * Fast forward
     * @param {Number} seekTime - how far to fast forward in seconds. Defaults to the config.seekTime
     */
    forward(seekTime) {
        this.currentTime = this.currentTime + (is.number(seekTime) ? seekTime : this.config.seekTime);
    }

    /**
     * Seek to a time
     * @param {Number} input - where to seek to in seconds. Defaults to 0 (the start)
     */
    set currentTime(input) {
        // Bail if media duration isn't available yet
        if (!this.duration) {
            return;
        }

        // Validate input
        const inputIsValid = is.number(input) && input > 0;

        // Set
        this.media.currentTime = inputIsValid ? Math.min(input, this.duration) : 0;

        // Logging
        this.debug.log(`Seeking to ${this.currentTime} seconds`);
    }

    /**
     * Get current time
     */
    get currentTime() {
        return Number(this.media.currentTime);
    }

    /**
     * Get buffered
     */
    get buffered() {
        const { buffered } = this.media;

        // YouTube / Vimeo return a float between 0-1
        if (is.number(buffered)) {
            return buffered;
        }

        // HTML5
        // TODO: Handle buffered chunks of the media
        // (i.e. seek to another section buffers only that section)
        if (buffered && buffered.length && this.duration > 0) {
            return buffered.end(0) / this.duration;
        }

        return 0;
    }

    /**
     * Get seeking status
     */
    get seeking() {
        return Boolean(this.media.seeking);
    }

    /**
     * Get the duration of the current media
     */
    get duration() {
        // Faux duration set via config
        const fauxDuration = parseFloat(this.config.duration);

        // Media duration can be NaN or Infinity before the media has loaded
        const realDuration = (this.media || {}).duration;
        const duration = !is.number(realDuration) || realDuration === Infinity ? 0 : realDuration;

        // If config duration is funky, use regular duration
        return fauxDuration || duration;
    }

    /**
     * Set the player volume
     * @param {Number} value - must be between 0 and 1. Defaults to the value from local storage and config.volume if not set in storage
     */
    set volume(value) {
        let volume = value;
        const max = 1;
        const min = 0;

        if (is.string(volume)) {
            volume = Number(volume);
        }

        // Load volume from storage if no value specified
        if (!is.number(volume)) {
            volume = this.storage.get('volume');
        }

        // Use config if all else fails
        if (!is.number(volume)) {
            ({ volume } = this.config);
        }

        // Maximum is volumeMax
        if (volume > max) {
            volume = max;
        }
        // Minimum is volumeMin
        if (volume < min) {
            volume = min;
        }

        // Update config
        this.config.volume = volume;

        // Set the player volume
        this.media.volume = volume;

        // If muted, and we're increasing volume manually, reset muted state
        if (!is.empty(value) && this.muted && volume > 0) {
            this.muted = false;
        }
    }

    /**
     * Get the current player volume
     */
    get volume() {
        return Number(this.media.volume);
    }

    /**
     * Increase volume
     * @param {Boolean} step - How much to decrease by (between 0 and 1)
     */
    increaseVolume(step) {
        const volume = this.media.muted ? 0 : this.volume;
        this.volume = volume + (is.number(step) ? step : 0);
    }

    /**
     * Decrease volume
     * @param {Boolean} step - How much to decrease by (between 0 and 1)
     */
    decreaseVolume(step) {
        this.increaseVolume(-step);
    }

    /**
     * Set muted state
     * @param {Boolean} mute
     */
    set muted(mute) {
        let toggle = mute;

        // Load muted state from storage
        if (!is.boolean(toggle)) {
            toggle = this.storage.get('muted');
        }

        // Use config if all else fails
        if (!is.boolean(toggle)) {
            toggle = this.config.muted;
        }

        // Update config
        this.config.muted = toggle;

        // Set mute on the player
        this.media.muted = toggle;
    }

    /**
     * Get current muted state
     */
    get muted() {
        return Boolean(this.media.muted);
    }

    /**
     * Set playback speed
     * @param {Number} speed - the speed of playback (0.5-2.0)
     */
    set speed(input) {
        let speed = null;

        if (is.number(input)) {
            speed = input;
        }

        if (!is.number(speed)) {
            speed = this.storage.get('speed');
        }

        if (!is.number(speed)) {
            speed = this.config.speed.selected;
        }

        // Set min/max
        if (speed < 0.1) {
            speed = 0.1;
        }
        if (speed > 2.0) {
            speed = 2.0;
        }

        if (!this.config.speed.options.includes(speed)) {
            this.debug.warn(`Unsupported speed (${speed})`);
            return;
        }

        // Update config
        this.config.speed.selected = speed;

        // Set media speed
        this.media.playbackRate = speed;
    }

    /**
     * Get current playback speed
     */
    get speed() {
        return Number(this.media.playbackRate);
    }

    /**
     * Toggle loop
     * TODO: Finish fancy new logic. Set the indicator on load as user may pass loop as config
     * @param {Boolean} input - Whether to loop or not
     */
    set loop(input) {
        const toggle = is.boolean(input) ? input : this.config.loop.active;
        this.config.loop.active = toggle;
        this.media.loop = toggle;

        // Set default to be a true toggle
        /* const type = ['start', 'end', 'all', 'none', 'toggle'].includes(input) ? input : 'toggle';

        switch (type) {
            case 'start':
                if (this.config.loop.end && this.config.loop.end <= this.currentTime) {
                    this.config.loop.end = null;
                }
                this.config.loop.start = this.currentTime;
                // this.config.loop.indicator.start = this.elements.display.played.value;
                break;

            case 'end':
                if (this.config.loop.start >= this.currentTime) {
                    return this;
                }
                this.config.loop.end = this.currentTime;
                // this.config.loop.indicator.end = this.elements.display.played.value;
                break;

            case 'all':
                this.config.loop.start = 0;
                this.config.loop.end = this.duration - 2;
                this.config.loop.indicator.start = 0;
                this.config.loop.indicator.end = 100;
                break;

            case 'toggle':
                if (this.config.loop.active) {
                    this.config.loop.start = 0;
                    this.config.loop.end = null;
                } else {
                    this.config.loop.start = 0;
                    this.config.loop.end = this.duration - 2;
                }
                break;

            default:
                this.config.loop.start = 0;
                this.config.loop.end = null;
                break;
        } */
    }

    /**
     * Get current loop state
     */
    get loop() {
        return Boolean(this.media.loop);
    }

    /**
     * Set new media source
     * @param {Object} input - The new source object (see docs)
     */
    set source(input) {
        source.change.call(this, input);
    }

    /**
     * Get current source
     */
    get source() {
        return this.media.currentSrc;
    }

    /**
     * Get a download URL (either source or custom)
     */
    get download() {
        const { download } = this.config.urls;

        return is.url(download) ? download : this.source;
    }

    /**
     * Set the autoplay state
     * @param {Boolean} input - Whether to autoplay or not
     */
    set autoplay(input) {
        const toggle = is.boolean(input) ? input : this.config.autoplay;
        this.config.autoplay = toggle;
    }

    /**
     * Get the current autoplay state
     */
    get autoplay() {
        return Boolean(this.config.autoplay);
    }

    /**
     * Trigger the airplay dialog
     * TODO: update player with state, support, enabled
     */
    airplay() {
        // Show dialog if supported
        if (support.airplay) {
            this.media.webkitShowPlaybackTargetPicker();
        }
    }

    /**
     * Add event listeners
     * @param {String} event - Event type
     * @param {Function} callback - Callback for when event occurs
     */
    on(event, callback) {
        on.call(this, this.elements.container, event, callback);
    }

    /**
     * Add event listeners once
     * @param {String} event - Event type
     * @param {Function} callback - Callback for when event occurs
     */
    once(event, callback) {
        once.call(this, this.elements.container, event, callback);
    }

    /**
     * Remove event listeners
     * @param {String} event - Event type
     * @param {Function} callback - Callback for when event occurs
     */
    off(event, callback) {
        off(this.elements.container, event, callback);
    }

    /**
     * Destroy an instance
     * Event listeners are removed when elements are removed
     * http://stackoverflow.com/questions/12528049/if-a-dom-element-is-removed-are-its-listeners-also-removed-from-memory
     * @param {Function} callback - Callback for when destroy is complete
     * @param {Boolean} soft - Whether it's a soft destroy (for source changes etc)
     */
    destroy(callback, soft = false) {
        if (!this.ready) {
            return;
        }

        const done = () => {
            // Reset overflow (incase destroyed while in fullscreen)
            document.body.style.overflow = '';

            // GC for embed
            this.embed = null;

            // If it's a soft destroy, make minimal changes
            if (soft) {
                if (Object.keys(this.elements).length) {
                    // Remove elements
                    removeElement(this.elements.buttons.play);
                    removeElement(this.elements.controls);
                    removeElement(this.elements.wrapper);

                    // Clear for GC
                    this.elements.buttons.play = null;
                    this.elements.controls = null;
                    this.elements.wrapper = null;
                }

                // Callback
                if (is.function(callback)) {
                    callback();
                }
            } else {
                // Unbind listeners
                unbindListeners.call(this);

                // Replace the container with the original element provided
                replaceElement(this.elements.original, this.elements.container);

                // Event
                triggerEvent.call(this, this.elements.original, 'destroyed', true);

                // Callback
                if (is.function(callback)) {
                    callback.call(this.elements.original);
                }

                // Reset state
                this.ready = false;

                // Clear for garbage collection
                setTimeout(() => {
                    this.elements = null;
                    this.media = null;
                }, 200);
            }
        };

        // Stop playback
        this.stop();

        // Clear timeout
        clearTimeout(this.timers.loading);

        // Restore native video controls
        ui.toggleNativeControls.call(this, true);

        // Clean up
        done();
    }

    /**
     * Check for support for a mime type (HTML5 only)
     * @param {String} type - Mime type
     */
    supports(type) {
        return support.mime.call(this, type);
    }

    /**
     * Check for support
     * @param {String} type - Player type (audio/video)
     * @param {String} provider - Provider (html5/youtube/vimeo)
     */
    static supported(type, provider) {
        return support.check(type, provider);
    }

    /**
     * Load an SVG sprite into the page
     * @param {String} url - URL for the SVG sprite
     * @param {String} [id] - Unique ID
     */
    static loadSprite(url, id) {
        return loadSprite(url, id);
    }

    /**
     * Setup multiple instances
     * @param {*} selector
     * @param {Object} options
     */
    static setup(selector, options = {}) {
        let targets = null;

        if (is.string(selector)) {
            targets = Array.from(document.querySelectorAll(selector));
        } else if (is.nodeList(selector)) {
            targets = Array.from(selector);
        } else if (is.array(selector)) {
            targets = selector.filter(is.element);
        }

        if (is.empty(targets)) {
            return null;
        }

        return targets.map(t => new APlyr(t, options));
    }
}

APlyr.defaults = cloneDeep(defaults);

export default APlyr;
