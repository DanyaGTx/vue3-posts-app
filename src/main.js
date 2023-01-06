import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import router from './router'
import toast from './toast'

createApp( App ).use( router ).use( toast ).mount( '#app' )
