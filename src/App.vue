<template>
    <div id="app">
        <div class="site_wrap">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'App',

    mounted () {
        this.setPlatform();
        this.getData();
    },

    methods: {
        ...mapActions(['set_mq', 'getData']),

        setPlatform () {

            const mq = window.matchMedia('(min-width: 1024px)').matches ? 'desktop' : 'mobile';

            this.set_mq(mq);

        }
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/style";
</style>
