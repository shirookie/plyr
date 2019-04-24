<template>
<button
    class="plyr__control"
    :type="type"
    @click="toggle(false)"
    >
    <slot v-if="!toggleState">{{ label }}</slot>
    <slot name="toggled" v-else>{{ labelPressed }}</slot>
    <!-- <v-aplyr-tooltip>
        <slot name="tooltip">{{ label }}</slot>
    </v-aplyr-tooltip> -->
</button>
</template>

<script>
import base from './base';

import APlyrTooltip from './tooltip.vue';

const attrs = {
    'play': {
        toggleState: false, // init pause
        label: 'play',
        labelPressed: 'pause',
        icon: 'play',
        iconPressed: 'pause',
    },
    'mute': {
        toggleState: true, // init unmute
        label: 'mute',
        labelPressed: 'unmute',
        icon: 'volume',
        iconPressed: 'muted',
    },
};

export default {
    name: 'aplyr-button',
    extends: base,
    props: {
        control: {
            required: true,
            validator(val) {
                return ['play', 'pause'].indexOf(val) !== -1;
            },
        },
        type: {
            type: String,
            default: 'button',
        },
        config: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return Object.assign(
            {
                toggleState: this.config.toggle === true ? true : false,
            },
            // TODO: modify
            attrs[this.control] || {
                label: this.config.label || this.control,
                labelPressed: this.config.labelPressed || this.config.label || this.control,
                icon: this.config.icon || this.type,
                iconPressed: this.config.iconPressed || this.config.icon || this.type,
            },
        );
    },
    methods: {
        toggle(value, passive = false) {
            if (!passive) {
                this.$nextTick(() => {
                    this.$parent[
                        (this.control === 'play' && this.toggleState === true) ? 'pause' : this.control
                    ]();
                });
            } else if (value === undefined) {
                this.toggleState = !this.toggleState;
            } else {
                this.toggleState = value;
            }
        },
        setToggleTrue() {
            this.toggle(true, true);
        },
        setToggleFalse() {
            this.toggle(false, true);
        },
    },
    mounted() {
        if (this.control === 'play' || this.control === 'pause') {
            this.setup('play', this.setToggleTrue);
            this.setup('pause', this.setToggleFalse);
        }
    },
    beforeDestroy() {
        if (this.control === 'play' || this.control === 'pause') {
            this.setup('play', this.setToggleTrue, false);
            this.setup('pause', this.setToggleFalse, false);
        }
    },
    components: {
        'v-aplyr-tooltip': APlyrTooltip,
    },
};
</script>
