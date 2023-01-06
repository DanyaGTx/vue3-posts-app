export default api => ( {
    getCommentsForPost: ( params ) => api.get( '/comments', { params } ),
    postComment: ( comment ) => api.post( '/comments', { comment } ),
    deleteComment: ( id ) => api.delete( `/comments/${id}` )
} )
