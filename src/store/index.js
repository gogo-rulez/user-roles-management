import Vue from 'vue';
import Vuex from 'vuex';
import { database } from '@/mixins/firebaseMixin';

const roles = database.ref('/roles');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        roles: [],
        mq: '',
        numberOfRoles: 0,
        rolesLoaded: false
    },
    getters: {
        getRoles: state => state.roles,
        isMob: state => state.mq === 'mobile',
        isDesk: state => state.mq === 'desktop',
        getNumberOfRoles: state => state.numberOfRoles,
        getRolesLoaded: state => state.rolesLoaded
    },
    mutations: {
        SET_DATA (state, data) {

            // when an entry is deleted
            // roles.on('value'...) wll return undefined for that position (don't know why)
            // so every time the data changes, we empty the roles array and fill it with good data

            state.roles = [];
            data.forEach(entry => {
                if (entry) {
                    state.roles.push(entry);
                }
            });
        },

        SET_NUMBER_OF_ROLES (state, data) { state.numberOfRoles = data; },

        SET_MQ (state, mq) { state.mq = mq; },

        SET_ROLES_LOADED (state, data) { state.rolesLoaded = data; }
    },
    actions: {
        getData ({ commit }) {
            roles.on('value', snapshot => {
                commit('SET_DATA', snapshot.val());
                commit('SET_NUMBER_OF_ROLES', snapshot.val().length);
                commit('SET_ROLES_LOADED', true);
            });
        },

        set_mq ({ commit }, mq) {
            commit ('SET_MQ', mq);
        },

        saveNewRoleData ({ state }, data) {
            const entryIndex = state.numberOfRoles;
            roles.child(entryIndex).update({ ...data });
            return true;
        },

        updateRoleData ({ state }, data) {
            const entryIndex = state.roles.findIndex(x => x.id === data.id);
            roles.child(entryIndex).update({ ...data });
            return true;
        },

        deleteRole ({ dispatch }, id) {
            let entryIndex;

            roles.on('value', snapshot => {
                entryIndex = snapshot.val().findIndex(x => x && x.id === id);
            });

            const entry = roles.child(entryIndex);
            entry.remove()
                .then(() => {
                    dispatch('getData');
                })
                .catch(error => {
                    console.log(`Remove failed: ${error.message}`);
                });

        }
    },
    modules: {
    },
});
