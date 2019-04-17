<template>
    <input
        ref="input"
        type="range"
        min="0"
        max="100"
        step="0.01"
        autocomplete="off"
        role="slider"
        v-model="model"
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
        value: null,
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
        }
    },
    watch: {
        value(newVal, oldVal) {
            if (newVal == oldVal) return;
            this.model = newVal;
        },
    },
    mounted() {
        RangeTouch.setup(this.$refs.input);
    },
};
</script>
