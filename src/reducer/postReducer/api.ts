import axios from 'axios';

export const fetchTodos = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
}
// export const 