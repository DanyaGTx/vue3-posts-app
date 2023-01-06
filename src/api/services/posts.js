export default api => ( {
    getPosts: ( params ) => api.get( '/posts' , { params } ),
    getAllPosts: () => api.get( '/posts' ),
    deletePost: ( id ) => api.delete( `/posts/${id}` ),
} )

