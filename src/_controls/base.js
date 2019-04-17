export default {
    methods: {
        setup(type, handler, install = true) {
            this.$parent.player[install ? 'addEventListener' : 'removeEventListener'](type, handler);
        },
    },
}
