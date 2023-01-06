import posts from './services/posts.js'
import comments from './services/comments.js'
import photos from './services/photos.js'
import albums from './services/albums.js'
import { apiRoot } from './instance.js'
import todos from './services/todos.js'
import users from './services/users.js'
const api = {
    posts: posts( apiRoot ),
    comments: comments( apiRoot ),
    photos: photos( apiRoot ),
    albums: albums( apiRoot ),
    todos: todos( apiRoot ),
    users: users( apiRoot ),
}
export { api }
