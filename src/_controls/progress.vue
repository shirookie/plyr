<template>
<div>
    <v-aplyr-range control="progress" @input="setCurrentTime"></v-aplyr-range>
    <progress
        v-if="loading"
        class="plyr__progress__buffer"
        min="20"
        max="100"
        value="0"
        role="progressbar"
        aria-hidden="true"
        >
    </progress>
    <!-- tooltip -->
    <v-aplyr-tooltip></v-aplyr-tooltip>
</div>
</template>

<script>
import base from './base';

import APlyrTooltip from './tooltip.vue';
import APlyrRange from './range.vue';

export default {
    name: 'aplyr-progress',
    extends: base,
    components: {
        'v-aplyr-tooltip': APlyrTooltip,
        'v-aplyr-range': APlyrRange,
    },
    data() {
        return {
            loading: false,
        };
    },
    mounted() {
        this.setup('seeking', this.onseeking);
        this.setup('seeked', this.onseeked);
    },
    beforeDestroy() {
        this.setup('seeking', this.onseeking, false);
        this.setup('seeked', this.onseeked, false);
    },
    methods: {
        onseeking() {
            this.loading = true;
            console.log('onseeking inner progress');
        },
        onseeked() {
            this.loading = false;
            console.log('onseeked inner progress');
        },
        setCurrentTime(val) {
            let player = this.$parent.player;
            let duration = player.duration;
            let currentTime = (duration * val / 100).toFixed(6);
            this.$parent.currentTime = currentTime;
        },
    },
};
</script>
