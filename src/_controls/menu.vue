<template>
<div v-click-outside="closeMenu">
    <button class="plyr__control" type="button" @click="opened = !opened">
        <slot v-bind="controls.length == 1 ? { 'selected': config[controls[0]].selected } : {}">{{ label }}</slot>
    </button>
    <div class="plyr__menu__container" v-show="opened">
        <div v-if="controls.length > 1">
            <button
                v-for="item in controls"
                :key="item"
                class="plyr__control plyr__control--forward"
                role="menuitem"
                type="button"
                >
                {{ item }}
            </button>
        </div>
        <div
            v-for="item in controls"
            :key="item"
            v-show="active == item"
            >
            <slot :name="item">
                <button
                    type="button"
                    class="plyr__control plyr__control--back"
                    v-if="controls.length > 1"
                    >
                    <span>{{ item }}</span>
                    <span class="plyr__sr-only">返回上级</span>
                </button>
                <div role="menu">
                    <button
                        type="button"
                        class="plyr__control"
                        :aria-checked="i == config[item].selected"
                        role="menuitemradio"
                        v-for="i in config[item].options"
                        :key="i"
                        @click="set(item, i)"
                        >
                        {{ i }}
                    </button>
                </div>
            </slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'aplyr-menu',
    props: {
        controls: {
            default: () => ['speed'],
            validator(val) {
                return Array.isArray(val) && val.length > 0;
            },
        },
    },
    data() {
        let config = {};
        this.controls.forEach(ctrl => {
            config[ctrl] = this.$parent.options[ctrl];
        });
        return {
            opened: false,
            active: this.controls[0],
            config,
        };
    },
    computed: {
        label() {
            return this.controls.length > 1 ? 'settings' : this.config[this.controls[0]].selected;
        },
    },
    methods: {
        closeMenu() {
            this.opened = false;
        },
        set(ctrl, val) {
            this.config[ctrl].selected = val;
            this.$parent[ctrl] = val;

            if (this.controls.length == 1) this.closeMenu();
        },
    },
};
</script>
