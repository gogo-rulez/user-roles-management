import Vue from 'vue';
import { auth } from '@/mixins/firebaseMixin';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    }
});
