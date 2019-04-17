<template>
<div>
    <v-aplyr-button class="plyr__control" control="mute" @mute="toggleMute"></v-aplyr-button>
    <v-aplyr-range control="volume" @input="changeVolume"></v-aplyr-range>
</div>
</template>

<script>
import base from './base';

import APlyrButton from './button.vue';
import APlyrRange from './range.vue';

export default {
    name: 'aplyr-volume',
    extends: base,
    data() {
        return {
            volume: 0, // TODO: rewrite
        };
    },
    methods: {
        toggleMute(toggle) {
            this.$emit(toggle ? 'mute' : 'unmute');
            this.changeVolume(toggle ? 0 : 100);
        },
        changeVolume(val) {
            this.$emit('volumechange', val);
        },
    },
    components: {
        'v-aplyr-button': APlyrButton,
        'v-aplyr-range': APlyrRange,
    },
};
</script>
