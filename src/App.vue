<template>
    <div id="app">
        <div class="site_wrap">
            <router-view v-if="getRolesLoaded"/>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'App',

    data () {
        return {
            dataReady: false
        };
    },

    computed: {
        ...mapGetters(['getRolesLoaded'])
    },

    watch: {
        getRolesLoaded (val) {
            if (!val) return;
            this.dataReady = true;
        }
    },

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
