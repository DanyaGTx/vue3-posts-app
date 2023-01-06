export default api => ( {
    getAllAlbums: () => api.get( '/albums' ),
    getAlbums: ( params ) => api.get( '/albums', { params }  )
} )
