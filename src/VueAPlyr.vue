<template>
<div><slot/></div>
</template>

<script>
import APlyr from './js/aplyr';

export default {
    name: 'vue-aplyr',
    props: {
        options: {
            type: Object,
            required: false,
            default: () => ({}),
        },
    },
    data() {
        // TODO: can i get $el here? possibly not
        return {
            player: null,
        };
    },
    mounted() {
        this.player = new Plyr(this.$el.firstChild, this.options);
        // emits
    },
    beforeDestroy() {
        this.player.destroy();
    },
};
</script>

<style></style>
