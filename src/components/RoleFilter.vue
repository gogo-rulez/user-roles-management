<template>
    <div class="role_filter">

        <form
            action=""
            class="role_filter__form">

            <div class="role_filter__input_wrap">

                <input
                    v-model="roleSearchTitle"
                    type="text"
                    class="role_filter__input"
                    placeholder="search">

                <a
                    role="button"
                    class="role_filter__btn"
                    @click="filterSearch()">
                    <span class="role_filter__icon icon-search"></span>
                </a>

            </div>

            <div class="role_filter__select_wrap">

                <label
                    class="role_filter__select_label">Role Status</label>

                <div
                    class="role_filter__select"
                    :class="{'is-opened': selectOpened}">

                    <a
                        role="button"
                        class="role_filter__btn is-full-width"
                        @click="selectOpened = !selectOpened">
                        <span class="role_filter__icon icon-arrow_drop_down"></span>
                    </a>
                    <p>{{ selectValue }}</p>

                    <div class="role_filter__select_inner_wrap">
                        <p @click="selectValue='Active and Inactive'; selectOpened = false">Active and Inactive</p>
                        <p @click="selectValue='Active'; selectOpened = false">Active</p>
                        <p @click="selectValue='Inactive'; selectOpened = false">Inactive</p>
                    </div>

                </div>

            </div>

            <router-link
                :to="{name: 'RolePage', params: {id: getNumberOfRoles + 1} }"
                class="role_filter__new_role_btn">
                Create new role
            </router-link>

        </form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'RoleFilter',
    data () {
        return {
            selectOpened: false,
            selectValue: 'Active and Inactive',
            roleSearchTitle: ''
        };
    },

    computed: {
        ...mapGetters(['getNumberOfRoles'])
    },

    watch: {
        selectValue () {
            this.filterSearch();
        }
    },

    methods: {
        filterSearch () {
            const searchValue = this.roleSearchTitle.toLowerCase();
            const selectValue = this.selectValue.toLowerCase().replaceAll(' ', '-');
            const data = { searchValue, selectValue };
            this.$emit('filterBySearch', data);
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
