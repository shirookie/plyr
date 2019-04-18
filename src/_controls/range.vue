<template>
    <input
        ref="input"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        autocomplete="off"
        role="slider"
        v-model="model"
        :style="{ '--value': displayVal }"
        >
</template>

<script>
import RangeTouch from 'rangetouch';

export default {
    name: 'aplyr-range',
    props: {
        control: {
            type: String,
            required: true,
        },
        value: {
            default: 0,
        },
        max: {
            default: 100,
        },
        min: {
            default: 0,
        },
        step: {
            default: 0.01,
        },
    },
    data() {
        return {
            currentVal: this.value,
        };
    },
    computed: {
        model: {
            get() {
                return this.currentVal;
            },
            set(val) {
                if (val == this.currentVal) return;
                this.currentVal = val;
                this.$emit('input', val);
            },
        },
        displayVal() {
            return (this.model / this.max * 100) + '%';
        },
    },
    watch: {
        value(newVal) {
            this.model = newVal;
        },
    },
    mounted() {
        RangeTouch.setup(this.$refs.input);
    },
};
</script>
