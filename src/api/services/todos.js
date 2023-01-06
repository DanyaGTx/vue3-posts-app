export default api => ( {
    getAllTodos: () =>  api.get( '/todos' ),
    getTodosForUser: ( params ) => api.get( '/todos', { params } ),
} )