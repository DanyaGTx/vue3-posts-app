export default api => ( {
    getUsers: ( params ) => api.get( '/users', { params } ),
    getAllUsers: () => api.get( '/users' )
} )