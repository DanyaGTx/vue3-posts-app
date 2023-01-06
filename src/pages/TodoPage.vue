<template>
    <div class="post__information">
        <button class="post__information-back" @click="goBack">Back</button>
    </div>
    <div class="todo__user-data">
        <h2 class="todo__user-data-title">User data:</h2>
        <div class="todo__user-data-table" v-for="user in userData" :key="user.id">
            <h3 class="todo__user-data-info">Username: {{user.username}}</h3>
            <h3 class="todo__user-data-info">Name: {{user.name}}</h3>
            <h3 class="todo__user-data-info">Email: {{user.email}}</h3>
            <h3 class="todo__user-data-info">City: {{user.address.city}}</h3>
            <h3 class="todo__user-data-info">Street: {{user.address.street}}</h3>
        </div>
    </div>
    <div class="todo__section" v-if="todos.length">
        <h2 class="todo__title">Todos: {{todos.length}}</h2>
        <div class="todo__item" v-for="todo in todos" :key="todo.id">
            <div class="todo__wrapper">
                <div class="todo__info">   
                    <p>{{todo.title}} - {{todo.completed}}</p> 
                </div>
                <div class="todo__buttons">
                    <button @click="deleteTodo(todo.id)" class="todo__delete-btn todo__btn">Delete</button>
                    <button @click="toggleTodo(todo)" class="todo__btn">{{todo.completed ? 'UnComplete' : 'Complete'}}</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="todo__noTodos">
        <h2>No todos</h2>    
        <button class="todo__btn" @click="getTodosForUser( route.params.id )">Reload todos</button>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { api } from '../api/api'
const router = useRouter()

const route = useRoute()
const todos = ref( [] )
const userData = ref( [] )

const goBack = () => {
    router.push( {
        name: 'todos',
    } )
}

const getTodosForUser = async ( user ) => {
    const { data } = await api.todos.getTodosForUser( { 'userId': user } )
    todos.value = data
}

const getUserData = async ( userId ) => {
    const { data } = await api.users.getUsers( { 'id' : userId } )

    userData.value = data

    console.log( userData.value )
}

const toggleTodo = ( todo ) => {
    todo.completed = !todo.completed
}

const deleteTodo = ( id ) => {
    todos.value = todos.value.filter( todo => todo.id !== id )
}

onMounted( () => {
    getUserData( route.params.id )
    getTodosForUser( route.params.id )
} )

</script>
