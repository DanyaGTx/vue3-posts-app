import { createRouter, createWebHistory } from 'vue-router'
import PostsPage from '../pages/PostsPage.vue'
import AlbumsPage from '../pages/AlbumsPage.vue'
import TodosPage from '../pages/TodosPage.vue'
import PostPage from '../pages/PostPage.vue'
import TodoPage from '../pages/TodoPage.vue'
const router = createRouter( {
    history: createWebHistory(),
    mode: 'history',
    routes: [
        { path: '/posts', name: 'posts', alias: '/', component: PostsPage },
        { path: '/posts/:id', component: PostPage, props: true },
        { path: '/albums', name: 'albums', component: AlbumsPage },
        { path: '/todos', name: 'todos', component: TodosPage },
        { path: '/todos/:id', component: TodoPage, props: true },
    ],
} )
export default router