<template>
    <div class="accordion__comments">
        <div class="accordion__comments-wrapper" :class="{ 'accordion-comment--hidden': isCommentsHidden }">
            <div  v-for="comment in loadedCommentsForPost" :key="comment.id" class="accordion-comment" :class="{ 'accordion-comment--hidden': isCommentsHidden }" >
                <div class="accordion-comment__content">
                    <div class="accordion-comment-user"><img class="accordion-comment-user-ico" src="../../assets/accordion/comment-user-ico.svg" alt="user-ico"><span>{{comment.email}}</span></div>
                    <h3 class="accordion-comment-title">{{comment.name}}</h3>
                    <p class="accordion-comment-content">{{comment.body}}</p>
                </div>
            </div>
            <h3 v-show="userCommentsForPost.length" class="accordion-comment__yourPosts">Your comments:</h3>
            <div v-for="comment in userCommentsForPost" :key="comment.id" class="accordion-comment" :class="{ 'accordion-comment--hidden': isCommentsHidden }" >
                <div class="accordion-comment__content">
                    <span @click="deleteYourComment(comment.id)" class="accordion-comment__delete">X</span>
                    <div class="accordion-comment-user"><img class="accordion-comment-user-ico" src="../../assets/accordion/comment-user-ico.svg" alt="user-ico"><span>{{comment.email}}</span></div>
                    <h3 class="accordion-comment-title">{{comment.name}}</h3>
                    <p class="accordion-comment-content">{{comment.body}}</p>
                </div>
            </div>
            <h3 v-if="isCommentsExist" class="accordion-comment-loaded">Загружено: {{loadedCommentsForPost.length}}</h3>
        </div>
        <div v-show="isAddComment" class="accordion-comment__add">
          <h4 class="accordion-comment__add-title">Add comment</h4>
          <div class="accordion-comment__add-input-el"><input v-model="comment.email" placeholder="Email" class="accordion-comment__add-input" type="text" /></div> 
          <div class="accordion-comment__add-input-el"><input v-model="comment.name" placeholder="Name" class="accordion-comment__add-input" type="text" /></div> 
          <div class="accordion-comment__add-input-el"><textarea v-model="comment.body" style="resize: none" placeholder="Body" class="accordion-comment__add-input" /></div> 
        </div>
        <div class="accordion-comment-loadMore-btn">
            <button v-show="loadedCommentsForPost.length && !isCommentsHidden" :disabled="loadedCommentsForPost.length >= props.totalComments" class="accordion__comments-button" @click="loadMore">Load More</button>
            <button @click="!loadedCommentsForPost.length ? loadComments() : hideComments()" class="accordion__comments-button">{{hideOrShowButtonText}}</button>
            <button class="accordion__comments-button" @click="isAddComment ? sendComment() : addComment()">{{isAddComment ? 'Send' : 'Add Comment'}}</button>
            <button v-show="isAddComment" class="accordion__comments-button" @click="isAddComment = false">Dont add</button>
        </div>
    </div>
</template>

<script setup>
import { ref,computed } from 'vue'
import { api } from '../../api/api.js'

import { useToast } from 'vue-toastification'
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

const props = defineProps( {
    id: {
        type: Number,
        default: 1,
    },
    loadedComments: {
        type: [Array, Object],
        required: true
    },
    limitComments: {
        type: Number,
        default: 3
    },
} )

const limitComments = ref( 3 )

const isCommentsHidden = ref( false )

const isCommentsExist = ref( false )

const loadedCommentsForPost = ref( [] )

const userCommentsForPost = ref( [] )

const isAddComment = ref( false )

const comment = ref( { 
    email: '',
    name: '',
    body: ''
} )






const emit = defineEmits( { 'getData': null } )

const loadComments = async () => {

    const { data } =  await api.comments.getCommentsForPost( { '_page':  props.id , '_limit': limitComments.value } )

    if( data.length ) {
        loadedCommentsForPost.value = data
        emit( 'getComments', data )
        isCommentsExist.value = true
    } else {
        toast( 'oops, no comments yet',toastOptions )
        isCommentsExist.value = false
    } 
    
}

const addComment = () => {
    isAddComment.value = true
}

const sendComment = async () => {
    if( comment.value.email && comment.value.name && comment.value.body ) {
        comment.value.id = userCommentsForPost.value.length + 1
        userCommentsForPost.value.push( { ...comment.value } )
        isAddComment.value = false
        await api.comments.postComment( comment.value )
        comment.value.email = ''
        comment.value.name = ''
        comment.value.body = ''
    } else {
        toast.warning( 'Please, fill all fields',toastOptions )
    }
}

const deleteYourComment = async ( id ) => {
    userCommentsForPost.value = userCommentsForPost.value.filter( comment => comment.id !== id )
    await api.comments.deleteComment( id )
}

const hideComments = () => {
    isCommentsHidden.value = !isCommentsHidden.value
}

const hideOrShowButtonText = computed( () => {
    if( loadedCommentsForPost.value.length ) {
        if( isCommentsHidden.value ) {
            return 'Show Comments' 
        }
        return 'Hide Comments' 
    } else {
        return 'Load comments'
    }
} ) 

const loadMore = () => {
    limitComments.value += 3
    loadComments() 

}

</script>
