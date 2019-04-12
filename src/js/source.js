// ==========================================================================
// Plyr source update
// ==========================================================================

import html5 from './html5';
import media from './media';
import support from './support';
import ui from './ui';
import { createElement, insertElement, removeElement } from './utils/elements';
import is from './utils/is';
import { getDeep } from './utils/objects';

const source = {
    // Add elements to HTML5 media (source, tracks, etc)
    insertElements(type, attributes) {
        if (is.string(attributes)) {
            insertElement(type, this.media, {
                src: attributes,
            });
        } else if (is.array(attributes)) {
            attributes.forEach(attribute => {
                insertElement(type, this.media, attribute);
            });
        }
    },

    // Update source
    // Sources are not checked for support so be careful
    change(input) {
        if (!getDeep(input, 'sources.length')) {
            this.debug.warn('Invalid source format');
            return;
        }

        // Cancel current network requests
        html5.cancelRequests.call(this);

        // Destroy instance and re-setup
        this.destroy.call(
            this,
            () => {
                // Reset quality options
                this.options.quality = [];

                // Remove elements
                removeElement(this.media);
                this.media = null;

                // Reset class name
                if (is.element(this.elements.container)) {
                    this.elements.container.removeAttribute('class');
                }

                // Set the type and provider
                const { sources, type } = input;
                // TODO: provider is useless
                const [{ provider = 'html5', src }] = sources;
                const tagName = provider === 'html5' ? type : 'div';
                const attributes = provider === 'html5' ? {} : { src };

                Object.assign(this, {
                    provider,
                    type,
                    // Check for support
                    supported: support.check(type, provider),
                    // Create new element
                    media: createElement(tagName, attributes),
                });

                // Inject the new element
                this.elements.container.appendChild(this.media);

                // Autoplay the new source?
                if (is.boolean(input.autoplay)) {
                    this.config.autoplay = input.autoplay;
                }

                // Set attributes
                if (this.config.crossorigin) {
                    this.media.setAttribute('crossorigin', '');
                }
                if (this.config.autoplay) {
                    this.media.setAttribute('autoplay', '');
                }
                if (!is.empty(input.poster)) {
                    this.poster = input.poster;
                }
                if (this.config.loop.active) {
                    this.media.setAttribute('loop', '');
                }
                if (this.config.muted) {
                    this.media.setAttribute('muted', '');
                }

                // Restore class hook
                ui.addStyleHook.call(this);

                // Set new sources for html5
                source.insertElements.call(this, 'source', sources);

                // Set video title
                this.config.title = input.title;

                // Set up from scratch
                media.setup.call(this);

                // Setup interface
                ui.build.call(this);

                // Load HTML5 sources
                this.media.load();
            },
            true,
        );
    },
};

export default source;
