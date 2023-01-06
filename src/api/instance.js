import axios from 'axios'

const apiRoot = axios.create( {
    baseURL: 'https://jsonplaceholder.typicode.com'
} )

export { apiRoot }
