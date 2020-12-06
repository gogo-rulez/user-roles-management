<template>
    <div class="home">

        <h1 class="home__title">User Roles Management</h1>

        <div class="home__filter_wrap">
            <role-filter
                @filterBySearch="filterResults($event)"
            />
        </div>

        <div class="home__cards_wrap">
            <role-card
                v-for="role in roles"
                :role="role"
                :key="role.id" />
        </div>


    </div>
</template>

<script>
// @ is an alias to /src
import RoleFilter from '@/components/RoleFilter';
import RoleCard from '@/components/RoleCard';
import { mapGetters } from 'vuex';

export default {
    name: 'Home',

    data () {
        return {
            roles: []
        };
    },

    components: {
        RoleFilter,
        RoleCard
    },

    computed: {
        ...mapGetters(['getRoles'])
    },

    watch: {
        // need watcher because of delete functionality

        getRoles () {
            this.roles = [...this.getRoles];
        }
    },

    mounted () {
        this.roles = [...this.getRoles];
    },

    methods: {

        filterResults (filters) {

            // filter first by search term
            // the term and role.name are set to lowercase to rule out case
            // then filter by activity

            const currentRoles = [...this.getRoles];

            const { searchValue, selectValue } = filters;

            this.roles = currentRoles.filter(x => x.name.toLowerCase().indexOf(searchValue) !== -1);

            if (!['active', 'inactive'].includes(selectValue)) return;

            const activity = selectValue === 'active';

            this.roles = this.roles.filter(x => x.active === activity);

        }
    }
};
</script>
