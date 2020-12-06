<template>
    <form
        class="role_form">

        <div class="role_form__input_wrap">

            <label
                for="role_name"
                class="role_form__label">
                Name
            </label>

            <input
                v-model="roleData.name"
                type="text"
                name="role_name"
                id="role_name"
                class="role_form__input"
                :class="{'has-error': showRoleNameError}">

            <span
                v-if="showRoleNameError"
                class="role_form__error">A role with this name already exists!</span>

        </div>

        <div class="role_form__input_wrap">

            <label
                for="role_type"
                class="role_form__label">
                Type
            </label>

            <input
                v-model="roleData.type"
                type="text"
                name="role_type"
                id="role_type"
                class="role_form__input">

        </div>

        <div class="role_form__input_wrap">

            <label
                for="role_description"
                class="role_form__label">
                Description
            </label>

            <input
                v-model="roleData.description"
                type="text"
                name="role_description"
                id="role_description"
                class="role_form__input">

        </div>

        <div class="role_form__input_group">

            <div class="role_form__input_wrap">

                <label
                    for="role_active"
                    class="role_form__label">
                    Role active
                </label>

                <label
                    for="role_active_yes"
                    class="role_form__radio_label">
                    <input
                        v-model="roleData.active"
                        type="radio"
                        name="role_active"
                        id="role_active_yes"
                        :value="true"
                        :checked="roleData.active"
                        class="role_form__radio"> Yes
                </label>

                <label
                    for="role_active_no"
                    class="role_form__radio_label">
                    <input
                        v-model="roleData.active"
                        type="radio"
                        name="role_active"
                        id="role_active_no"
                        :value="false"
                        :checked="!roleData.active"
                        class="role_form__radio"> No
                </label>

            </div>

            <div class="role_form__input_wrap">

                <label
                    class="role_form__label">
                    Role editable
                </label>

                <label
                    for="role_description_yes"
                    class="role_form__radio_label">
                    <input
                        v-model="roleData.editable"
                        type="radio"
                        name="role_editable"
                        id="role_description_yes"
                        :value="true"
                        :checked="roleData.editable"
                        class="role_form__radio"> Yes
                </label>

                <label
                    for="role_description_no"
                    class="role_form__radio_label">
                    <input
                        v-model="roleData.editable"
                        type="radio"
                        name="role_editable"
                        id="role_description_no"
                        :value="false"
                        :checked="!roleData.editable"
                        class="role_form__radio"> No
                </label>

            </div>

        </div>

        <div class="role_form__buttons_wrap">
            <a
                role="button"
                class="btn has-background-turquoise role_form__save_changes_btn"
                @click="saveData()">Save</a>
            <a
                v-if="roleData.id"
                role="button"
                class="btn has-background-red role_form__save_changes_btn"
                @click="deleteRoleHandler(roleData.id)">Delete</a>

            <router-link
                :to="{name: 'Home'}"
                class="btn has-background-grey role_form__cancel_btn">
                Cancel
            </router-link>
        </div>

        <p
            v-if="showSuccessMessage"
            class="role_form__success_message">
            The form was succesfully modified!
        </p>

    </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'RoleForm',

    data () {
        return {
            roleData: {},
            roleDataReady: false,
            showSuccessMessage: false,
            showRoleNameError: false,
            goran: ''
        };
    },

    computed: {
        ...mapGetters(['getRoles'])
    },

    mounted () {
        this.getRoleData();
    },

    methods: {
        ...mapActions(['saveNewRoleData', 'updateRoleData', 'deleteRole']),

        deleteRoleHandler (id) {
            this.deleteRole(id);
            this.roleData = {};
        },

        getRoleData () {

            // if the roles exists, grab it's data

            const roleId = Number(this.$route.params.id);
            const existingRole = this.getRoles.find(x => x.id === roleId);

            if (existingRole) {
                this.roleData = { ...existingRole };
            }

            this.roleDataReady = true;

        },

        async saveData () {

            const roleId = Number(this.$route.params.id);
            const roleName = this.roleData.name;
            const existingItem = this.getRoles.find(x => x.id === roleId);
            const roleNameExists = this.getRoles.find(x => x.name === roleName);
            const date = new Date().toISOString();
            let dataSaved = false;

            if (existingItem) {

                // update role
                this.roleData.modified_on = date;
                dataSaved = await this.updateRoleData(this.roleData);

            } else if (roleNameExists) {

                // new role but existing name
                this.showRoleNameError = true;

            } else {

                // new role, new name
                this.roleData.id = roleId;
                this.roleData.created_on = date;
                this.roleData.modified_on = date;
                dataSaved = await this.saveNewRoleData(this.roleData);

            }

            if (dataSaved) {

                this.showSuccessMessage = true;

                setTimeout(() => {
                    this.showSuccessMessage = false;
                }, 4000);

            }

        }
    }
};
</script>

<style lang="scss" scoped>

</style>
