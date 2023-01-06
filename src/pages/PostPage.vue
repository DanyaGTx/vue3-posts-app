<template>
    <div class="post__information">
        <button class="post__information-back" @click="goBack">Back</button>
        <h1 class="post__information-email">ID: {{$route.params.id}}</h1>
    </div>
    <div>
        <h2>Comments:</h2> 
        <div v-for="comment in comments" :key="comment.id" class="accordion-comment" :class="{ 'accordion-comment--hidden': isCommentsHidden }" >
            <div class="accordion-comment__content">
                <div class="accordion-comment-user"><img class="accordion-comment-user-ico" src="../assets/accordion/comment-user-ico.svg" alt="user-ico"><span>{{comment.email}}</span></div>
                <h3 class="accordion-comment-title">{{comment.name}}</h3>
                <p class="accordion-comment-content">{{comment.body}}</p>
            </div>
        </div>
        <button class="accordion__comments-button" @click="loadMore">Load More</button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { api } from '../api/api'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
const router = useRouter()

const goBack = () => {
    router.push( {
        name: 'posts',
    } )
}

const route = useRoute()

const comments = ref( [] )

const limitComments = ref( 10 )

const isCommentsExist = ref( false )

const toast = useToast()

const toastOptions = {
    position: 'top-center',
    timeout: 2000,
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


const loadComments = async () => {

    const { data } =  await api.comments.getCommentsForPost( { '_page':  route.query.id , '_limit': limitComments.value } )

    if( data.length ) {
        comments.value = data
        isCommentsExist.value = true
    } else {
        toast( 'oops, no comments yet',toastOptions )
        isCommentsExist.value = false
    } 
}
const loadMore = () => {
    limitComments.value += 10
    loadComments() 
}


onMounted( async () => {
    const { data } =  await api.comments.getCommentsForPost( { '_page':  route.query.id , '_limit': limitComments.value } )

    comments.value = data
} )
</script>
