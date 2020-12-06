import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Role from '../views/Role.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },

    {
        path: '/role/:id',
        name: 'RolePage',
        component: Role
    }

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
