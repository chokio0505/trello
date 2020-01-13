import axios from 'axios';

const baseUrl = '/api/book';

const getByBookId = (bookId) => {
    const request = axios.get(`${baseUrl}/${bookId}`);
    return request.then(response => response.data);
}

export default { getByBookId };