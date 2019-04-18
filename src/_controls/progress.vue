<template>
<div
    :class="{ 'plyr--loading': loading }"
    >
    <v-aplyr-range
        control="progress"
        v-model="model"
        :max="duration"
        >
    </v-aplyr-range>
    <progress
        class="plyr__progress__buffer"
        :max="duration"
        v-model="buffered"
        role="progressbar"
        aria-hidden="true"
        >
    </progress>
    <!-- tooltip -->
    <!-- <v-aplyr-tooltip></v-aplyr-tooltip> -->
</div>
</template>

<script>
import base from './base';

import APlyrTooltip from './tooltip.vue';
import APlyrRange from './range.vue';

const events = [
    'canplay',
    'seeking',
    'seeked',
    'timeupdate',
    'durationchange',
    'progress',
    'playing',
    'waiting',
];

export default {
    name: 'aplyr-progress',
    extends: base,
    components: {
        'v-aplyr-tooltip': APlyrTooltip,
        'v-aplyr-range': APlyrRange,
    },
    props: {
        timeout: {
            type: Number,
            default: 300,
        },
    },
    data() {
        return {
            loading: true,
            loadingTimeoutId: null,
            currentTime: 0,
            duration: 100,
            buffered: 0,
        };
    },
    computed: {
        model: {
            get() {
                return this.currentTime;
            },
            set(val) {
                if (val == this.currentTime) return;
                this.currentTime = val;
                this.$parent.player.currentTime = val;
            },
        }
    },
    mounted() {
        events.forEach(e => {
            this.setup(e, this['on' + e]);
        })
    },
    beforeDestroy() {
        events.forEach(e => {
            this.setup(e, this['on' + e], false);
        })
    },
    methods: {
        updateCurrentTime() {
            this.model = this.$parent.player.currentTime;
        },
        updateDuration() {
            this.duration = this.$parent.player.duration;
        },
        updateBuffered() {
            let buffered = this.$parent.player.buffered;
            this.buffered = (buffered && buffered.length) ? buffered.end(0) : 0;
        },
        updateLoading(val) {
            clearTimeout(this.loadingTimeoutId);
            this.loadingTimeoutId = setTimeout(() => {
                this.loading = val;
            }, this.timeout);
        },
        oncanplay() {
            this.updateLoading(false);
        },
        onseeking() {
        },
        onseeked() {
            this.updateLoading(false);
        },
        ontimeupdate() {
            this.updateCurrentTime();
        },
        ondurationchange() {
            this.updateDuration();
        },
        onprogress() {
            this.updateBuffered();
        },
        onplaying() {
            this.updateLoading(false);
            this.updateBuffered();
        },
        onwaiting() {
            this.updateLoading(true);
        },
    },
};
</script>
