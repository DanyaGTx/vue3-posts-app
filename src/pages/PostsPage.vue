<template>
    <div class="total__wrapper">
        <input v-model.lazy="perPageFromUser" class="total__input" type="number" placeholder="Posts per page">
        <button @click="setPerPageFromUser" class="total__button">Accept</button>
    </div>
    <div class="accordion__wrapper" v-for="post in allPosts" :key="post.id">
        <div @click="toggleAccordion(post.id)" class="accordion-title">
            <h2 class="accordion-question">{{post.title}}?</h2>
            <div class="accordion-possesions">  
                <span @click="deletePost(post.id)" class="accordion-delete">X</span>
                <span class="accordion-id">User ID: {{post.id}}</span>
                <span class="accordion-arrows--border" v-if="!post.open">
                    <img alt="▼" class="accordion-arrows" src="../assets/accordion/select-icon-open.svg" /></span>
                <span class="accordion-arrows--border" v-else>
                    <img alt="▼" class="accordion-arrows accordion-arrow-close"  src="../assets/accordion/select-icon-open.svg" /></span>
            </div>
        </div>
        <CustomAccordion ref="accordion" :isOpened="post.open">
            <template #title>
                {{post.body}}
            </template>
            <template #comments>
                <CommentItems @getComments="getComments" :loadedComments="loadedComments" :limitComments="limitComments" :id="post.id" />
                <button class="accordion__comments-button accordion__comments-button--openPost" @click="openPost(post.id)">Open Post</button>
            </template>
        </CustomAccordion>  
    </div>
    <CustomPagination :customization="paginationCustomization" @update-pagination="loadPosts" :totalCount="getTotalCount" :perPage="perPage" :currentPage="currentPage"/>
</template>

<script setup>
import CustomPagination from '../components/elements/CustomPagination.vue'
import { onMounted, ref } from 'vue'
import { api } from '../api/api.js'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import CommentItems from '../components/elements/CommentItems.vue'
import CustomAccordion from '../components/elements/CustomAccordion.vue'

const router = useRouter()

const toast = useToast()

const allPosts = ref( [] )
const currentPage = ref( 1 )
const perPage = ref( 6 )

const getTotalCount = ref()


const perPageFromUser = ref( null )

const loadedComments = ref( [] )

const paginationCustomization = {
    pagesOnSides: 3,
    showArrows: true
}

const toastOptions = {
    position: 'top-center',
    timeout: 3000,
    pauseOnHover: false,
    closeOnClick: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false
}

const toggleAccordion = ( id ) => {
    for( let post of allPosts.value ) {
        if( post.id === id ) {
            post.open = !post.open     
        } else {
            post.open = false
        }
    }
}

const openPost = ( id ) => {
    router.push( {
        path: `/posts/${id}`,
    } )
}

const deletePost = async ( id ) => {
    allPosts.value = allPosts.value.filter( post => post.id !== id ) 
    await api.posts.deletePost( id )
}

const getPosts = async () => {
    const { data } =  await api.posts.getPosts( { '_page':  currentPage.value , '_limit': perPage.value } )
    allPosts.value = data
}

const getAllPosts = async () => {
    const { data } =  await api.posts.getAllPosts()
    getTotalCount.value = data.length
}


const getComments = ( comments ) => {
    loadedComments.value.push( comments )
}

const loadPosts = ( page ) => {
    currentPage.value = page
    getPosts()
}

const setPerPageFromUser = () => {
    if( perPageFromUser.value >= 1 && perPageFromUser.value <= getTotalCount.value ) {
        perPage.value = parseInt( perPageFromUser.value )
        currentPage.value = 1
        getPosts()
    } else {
        toast.warning( `Min - 1 post / Max - ${getTotalCount.value} posts`, toastOptions )
    }
}

onMounted( () => {
    getPosts()
    getAllPosts()
} )

</script>
