<template>
<span>{{ displayTime }}</span>
</template>

<script>
import base from './base';
import { formatTime } from '../util/time';

export default {
    name: 'aplyr-time',
    extends: base,
    props: {
        control: {
            required: true,
            validator(val) {
                return ['currentTime', 'duration'].indexOf(val) !== -1;
            },
        }
    },
    data() {
        return {
            value: 0,
        };
    },
    computed: {
        displayTime() {
            return formatTime(this.value);
        },
    },
    mounted() {
        this.setup(this.control === 'currentTime' ? 'timeupdate' : 'durationchange', this.updateTime);
    },
    beforeDestroy() {
        this.setup(this.control === 'currentTime' ? 'timeupdate' : 'durationchange', this.updateTime, false);
    },
    methods: {
        updateTime(e) {
            this.value = this.$parent.player[this.control];
        },
    },
};
</script>
