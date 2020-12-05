import Vue from 'vue';
import Vuex from 'vuex';
import { database } from '@/mixins/firebaseMixin';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        roles: [],
        mq: '',
    },
    getters: {
        getRoles: state => state.roles,
        isMob: state => state.mq === 'mobile',
        isDesk: state => state.mq === 'desktop'
    },
    mutations: {
        GET_DATA (state, data) { state.roles = data; },
        SET_MQ (state, mq) { state.mq = mq; }
    },
    actions: {
        getData ({ commit }) {
            const roles = database.ref('/roles');
            roles.on('value', snapshot => {
                commit('GET_DATA', snapshot.val());
            });
        },
        set_mq ({ commit }, mq) {
            commit ('SET_MQ', mq);
        }
    },
    modules: {
    },
});
