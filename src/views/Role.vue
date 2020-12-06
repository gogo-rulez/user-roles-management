<template>
    <div
        class="role_page">

        <h1 class="role_page__title">{{ entryTitle }}</h1>

        <div class="role_page__form_wrap">

            <role-form />

        </div>

    </div>
</template>

<script>
import RoleForm from '@/components/RoleForm';
import { mapGetters } from 'vuex';

export default {
    name: 'Role',

    data () {
        return {
            pageReady: false
        };
    },

    components: {
        RoleForm
    },

    computed: {
        ...mapGetters(['getRoles', 'getRolesLoaded']),

        entryTitle () {

            // make title string depending on new/existing role

            const roleId = Number(this.$route.params.id);
            const existingRole = this.getRoles.find(x => x.id === roleId);

            if (existingRole) {
                return `${existingRole.name}`;
            }

            return 'Add new role';
        }
    },
};
</script>
