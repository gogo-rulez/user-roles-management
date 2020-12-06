<template>
    <div class="role_card">

        <div
            v-if="!role.active"
            class="role_card__inactive_flag">
            Inactive
        </div>

        <div class="role_card__content">

            <h3 class="role_card__title">{{ role.name }}</h3>
            <p class="role_card__role_type">{{ role.type }}</p>

            <p class="role_card__description">{{ role.description }}</p>

            <figure class="role_card__figure">
                <template v-for="(user, index) in role.users">
                    <img
                        v-if="index < 6"
                        :key="user.id"
                        :src="user.photo_url"
                        :alt="`${user.first_name} ${user.last_name}`">

                </template>
                <span v-if="role.users && role.users.length > 6">+{{ role.users.length - 6 }}</span>
            </figure>

        </div>

        <footer class="role_card__footer">

            <p class="role_card__date">
                <template v-if="isDesk">Date created:</template>
                <time>{{ createdDate(role.created_on)}}</time>
            </p>

            <span
                v-if="!role.editable"
                class="icon icon-locked"></span>

            <div
                v-else
                class="role_card__options">
                <router-link
                    :to="{name: 'RolePage', params: {id: role.id}}"
                    class="role_card__edit_btn">
                    Edit
                </router-link>
                <a
                    role="button"
                    class="role_card__delete_btn is-red"
                    @click="deleteRole(role.id)">Delete</a>
            </div>

        </footer>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'RoleCard',

    props: {
        role: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapGetters(['isDesk'])
    },

    methods: {
        ...mapActions(['deleteRole']),

        createdDate (date) {

            // construct created date - DD/MM/YYYY

            const newDate = new Date(date);
            const year = newDate.getFullYear();
            const month = newDate.getMonth() + 1;
            const day = newDate.getDate();

            return `${day}/${month}/${year}`;
        }
    }
};
</script>

