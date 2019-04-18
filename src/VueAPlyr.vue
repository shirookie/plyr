<template>
<div class="plyr plyr--full-ui plyr--audio plyr--html5">
    <slot name="controls">
        <div class="plyr__controls">
            <component
                v-for="control in renderControls"
                :key="control.key"
                :is="control.component"
                :class="control.className"
                :control="control.key"
                >
            </component>
        </div>
    </slot>
    <audio
        style="display: none;"
        ref="audio"
        v-bind="$attrs"
        v-on="$listeners"
        >
        <slot></slot>
    </audio>
</div>
</template>

<script>
import config from './config';

import APlyrButton from './_controls/button.vue';
import APlyrProgress from './_controls/progress.vue';
import APlyrVolume from './_controls/volume.vue';

const controls = {
    // 'restart': 'v-aplyr-button',
    // 'rewind': 'v-aplyr-button',
    'play': {
        component: 'v-aplyr-button',
        className: 'plyr__control',
    },
    // 'fast-forward': 'v-aplyr-button',
    'progress': {
        component: 'v-aplyr-progress',
        className: 'plyr__progress',
    },
    // 'volume': {
    //     component: 'v-aplyr-volume',
    //     className: 'plyr__volume',
    // },
    // 'speed': {
    //     component: 'v-aplyr-speed',
    //     className: 'plyr_control',
    // },
};

export default {
    name: 'vue-aplyr',
    props: {
        options: {
            type: Object,
            default: () => {
                return Object.assign({}, config);
            },
        },
    },
    data() {
        return {
            controls: {},
            ready: false,
            computedVal: {},
        };
    },
    computed: {
        renderControls() {
            return this.options.controls
                .filter(i => {
                    return controls[i] !== undefined;
                })
                .map(i => {
                    return {
                        key: i,
                        component: controls[i].component,
                        className: controls[i].className,
                    }
                });
        },
        player() {
            return this.$refs.audio;
        },
        currentTime: {
            set(val) {
                if (this.ready) {
                    this.player.currentTime = val;
                }
                this.computedVal.currentTime = val;
            },
            get() {
                return this.computedVal.currentTime || this.player.currentTime;
            },
        },
        speed: {
            set(val) {
                this.player.playbackRate = parseFloat(val);
            },
            get() {
                return this.player.playbackRate;
            },
        },
    },
    methods: {
        setControl(name, ctrl) {
            this.$set(this.controls, name, ctrl);
        },
        unsetControl(name) {
            this.$delete(this.controls, name);
        },
        play() {
            this.player.play();
        },
        pause() {
            this.player.pause();
        },
        togglePlay() {
            // TODO:

        },
        // restart() {
        //     this.player.currentTime = 0;
        // },
        // stop() {
        //     this.pause();
        //     this.restart();
        // },
    },
    components: {
        'v-aplyr-button': APlyrButton,
        'v-aplyr-progress': APlyrProgress,
        'v-aplyr-volume': APlyrVolume,
    },
};
</script>
