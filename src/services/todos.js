import axios from 'axios';

const baseUrl = '/api/books';

const getByBookId = (bookId) => {
    const request = axios.get(`${baseUrl}/${bookId}`);
    return request.then(response => response.data);
}

const updateIsArchived = (id, isArchived) => {
    const config = {
        isArchived: !isArchived
    }
    const request = axios.put(`/api/todos/${id}`, config);
    return request.then(response => response.data);
}

const create = (newTodo) => {
    debugger
    const request = axios.post('/api/todos', newTodo)
    return request.then(response => response.data);

}

export default { getByBookId, updateIsArchived, create };