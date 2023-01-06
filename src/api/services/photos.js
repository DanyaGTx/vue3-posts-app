export default api => ( {
    getPhotosByAlbumId: ( params ) => api.get( '/photos', { params } )
} )
