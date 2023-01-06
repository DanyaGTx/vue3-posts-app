<template>
    <div>
        <h1 class="users__title">Users:</h1>
        <div class="users__data">
            <div class="user__info" v-for="user in allUsers" :key="user.id">
                <h2 class="user__name">{{user.username}}</h2> 
                <button class="user__openProile-btn" @click="openProfile(user.id)">Open Profile</button>
            </div>
        </div>
    </div>
    <CustomPagination :customization="paginationCustomization" @update-pagination="changePage" :totalCount="getTotalCount" :perPage="perPage" :currentPage="currentPage"/>
</template>

<script setup>
import { onMounted } from 'vue'
import { api } from '../api/api.js'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CustomPagination from '../components/elements/CustomPagination.vue'
const router = useRouter()



const allUsers = ref( [] )

const getTotalCount = ref()

const perPage = ref( 5 )
const currentPage = ref( 1 )

const paginationCustomization = {
    pagesOnSides: 3,
    showArrows: true
}

const getUsers = async () => {
    const { data } = await api.users.getUsers( { '_page':  currentPage.value , '_limit': perPage.value } )

    allUsers.value = data
}

const openProfile = ( id ) => {
    router.push( {
        path: `/todos/${id}`,
    } )
}


const getUsersLength = async () => {
    const { data } = await api.users.getAllUsers()
    getTotalCount.value = data.length
}

const changePage = ( page ) => {
    currentPage.value = page
}

watch( () => currentPage.value, () => getUsers() )

onMounted( () => {
    getUsers()
    getUsersLength()
} )
</script>
